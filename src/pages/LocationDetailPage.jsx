import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { usePocketData } from '@/api/usePocketData';
import { getPbImageURL } from '@/utils/getPbImageURL';
import { numberWithComma } from '@/utils/numberWithComma';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Spinner from '@/components/Spinner';
import MetaTag from '@/components/MetaTag';

function LocationDetailPage() {
  const { category } = useParams();

  const [selectCategory, setSelectCategory] = useState(category);

  const { getListData } = usePocketData('hotel');
  const { data: hotelData, isLoading: isHotelLoading } = useQuery(['hotel'], () => getListData());

  if (isHotelLoading) {
    return <Spinner />;
  }

  const hotelCategoryData = hotelData.filter((hotel) => {
    return selectCategory === '' ? true : hotel.category === selectCategory;
  });

  return (
    <>
      <MetaTag title='지역 리스트' description='지역별 호텔리스트' />
      <Header back='back' search='search' title='' />
      <section className=''>
        <h1 className='fixed z-10 w-full max-w-3xl rounded-b-3xl bg-white px-[2.5rem] pb-2 text-[1.4rem] font-bold md:text-[1.7rem] '>
          <img
            src='/locationActive.svg'
            alt='선택 위치'
            className='mb-0.5 mr-[0.1rem] inline-block h-6 md:h-7 '
          />
          {category === '도심힐링' ? '서울' : category}
        </h1>
        <div role='group' className='pb-[5rem] pt-[3.1rem]  '>
          {hotelCategoryData?.map((item) => (
            <article key={item.id} className='py-1.2  bg-white   pb-10  shadow-md '>
              <figure className='mr-4 h-[57%] w-[100%]  overflow-hidden lg:h-[65%] '>
                <img
                  src={getPbImageURL(item, 'img')}
                  alt=''
                  className=' cover h-[130%]  w-[120%] object-cover'
                />
                <figcaption className='sr-only'>{item.title} </figcaption>
              </figure>

              <div role='group' className='px-6 pt-3  '>
                <h2 className='text-lg font-bold'>{item.title}</h2>
                <img src='/star.svg' alt='별점' className='mb-[0.3rem] mr-[0.3rem] inline-block ' />
                <span className='text-[0.9rem] font-extrabold'>{item.star} </span>
                <span className='text-[0.9rem] font-bold text-gray2'>&#183; {item.grade} </span>
                <div className=' ml-1 inline-block rounded-full bg-lightPurple pb-1 pl-2 pr-3'>
                  <img
                    src='/locationActive.svg'
                    alt='주소'
                    className='mr-[0.2rem] inline-block  h-4 '
                  />
                  <span className='mb-[1rem] text-[0.8rem] font-medium text-primary'>
                    {item.location}{' '}
                  </span>
                </div>
                <div className=' flex justify-between pb-3 pt-3  '>
                  <span className='mr-3 block text-[0.9rem] text-gray2'>숙박: 15:00~</span>
                  <span className='mr-2 block text-[1.2rem] font-extrabold '>
                    {numberWithComma(item.price)}원
                  </span>
                </div>

                <div className='flex  justify-end'>
                  <Link
                    to={`hotel/${item.id}`}
                    className='flex gap-2  rounded-full bg-primary px-6 py-2  text-[1rem] font-medium text-white shadow-md hover:bg-[#1E51EE] '
                  >
                    {'숙소 예약하기'}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default LocationDetailPage;
