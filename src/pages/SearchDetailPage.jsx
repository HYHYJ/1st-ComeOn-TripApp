import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { usePocketData } from '@/api/usePocketData';
import { getPbImageURL } from '@/utils/getPbImageURL';
import { numberWithComma } from '@/utils/numberWithComma';
import { Link } from 'react-router-dom';
import Header from '@/components/Header'
import Spinner from '@/components/Spinner';
import MetaTag from '@/components/MetaTag';

function LocationDetailPage() {
  const { category } = useParams();
  const [selectCategory, setSelectCategory]= useState(category);

  const { getListData:getLeisureData } = usePocketData('leisure');
  const { data: leisureData,
    isLoading,
  } = useQuery(['leisure'], () => getLeisureData());

  if (isLoading) {
    return <Spinner />;
  }
  let leisureCategoryData = leisureData.filter((leisure) => leisure.category === selectCategory);
    
  return (
    <>
    <MetaTag title='레저/티켓 리스트' description='지역별 레저/티켓 리스트' />
    <Header back='back' search='search' title=''/>
    <section>
      <h1 className='fixed bg-white rounded-b-3xl w-full font-bold text-[1.4rem] max-w-3xl z-10 md:text-[1.7rem] px-[2.5rem] pb-2 '>
        <img src='/locationActive.svg' alt='선택 위치' className='inline-block h-6 md:h-7 mb-0.5 mr-[0.1rem]'/>
        { category === '도심힐링' ? '서울' : category }
      </h1>
      <div role="group" className='pt-[3.1rem] pb-[5rem]'>
      {leisureCategoryData?.map((item) => (
        <article key={item.id} className='relative h-[30rem] lg:h-[33rem] py-1.2   shadow-md  bg-white'>
          <figure className='w-[100%] h-[57%] lg:h-[65%]  overflow-hidden mr-4 '>
            <img
              src={getPbImageURL(item, 'main')}
              alt=''
              className=' h-[120%] w-[110%]  cover object-cover' />
            <figcaption className='sr-only'>{item.title}</figcaption>
          </figure>
          <div role='group' className='px-6 pt-3'>
            <h2 className='font-bold text-lg'>{item.title}</h2>
            <div className=' flex justify-between py-2'>
              <span className='block'>
              {item.label.map((label) => (
                    <span
                      key={label}
                      className='mr-1 mt-1 rounded-[2px] border-[1px] border-[#e6e6e6] bg-[#f2f2f2] px-1 py-[2px] text-[11px]'
                    >
                      {label}
                    </span>
                  ))}
              </span>
                <span className='block text-[1.2rem] font-extrabold '>{numberWithComma(item.price)}원</span>
            </div>
            <Link to={`/LeisureDetail/${item.id}`} className='absolute right-4 text-right rounded-full  bg-primary hover:bg-[#1E51EE] text-white font-medium  text-[1rem] shadow-md py-2 px-6 gap-2 '>
               {'상품 선택하기'}
            </Link>
          </div>
        </article>
        ))}
      </div>
    </section>
    </>
  )
}

export default LocationDetailPage