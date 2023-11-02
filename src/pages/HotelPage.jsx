import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { usePocketData } from '@/api/usePocketData';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Category from '@/components/Category';
import Spinner from '@/components/Spinner';
import Hotel from '@/components/Hotel';
import HotelList from '@/components/HotelList';
import MetaTag from '@/components/MetaTag';

function HotelPage() {
  const { getListData } = usePocketData('hotel');
  const filter =
    'category = "휴가에딱" || category = "도심힐링" || category = "바다낭만" || category = "리조트"|| category = "도쿄" || category = "오사카" || category = "후쿠오카" || category = "교토"';

  const { data: hotelData, isLoading } = useQuery(['hotelPage', { filter }], () =>
    getListData({ filter }),
  );

  const [selectCategory, setSelectCategory] = useState({
    korea: '휴가에딱',
    japan: '도쿄',
  });

  const categoryKorea = ['휴가에딱', '도심힐링', '바다낭만', '리조트'];
  const categoryJapan = ['도쿄', '오사카', '후쿠오카', '교토'];

  const categoryChange = (category, value) => {
    setSelectCategory((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <MetaTag title='야무지개놀자 호텔/리조트' description='호캉스를 위한 호텔리스트' />
      <Header
        search='search'
        back='back'
        cart='cart'
        className='ml-10 text-xl font-semibold'
        title='호텔 / 리조트'
      />
      <section className='px-4 pb-20'>
        <h2 className='sr-only'>호텔페이지</h2>
        <div className='mx-auto flex flex-col items-center rounded border border-gray p-6'>
          <p className='pb-3 font-semibold'>어디로 갈까요?</p>
          <div className='flex gap-2'>
            <Link
              to='/location'
              className='flex h-[3.1rem] w-40 items-center gap-1 rounded border border-gray p-4 font-medium hover:text-primary'
            >
              <img src='/locationActive.svg' alt='위치' className='w-5' width='20' height='20'/>
              지역선택
            </Link>
            <Link
              to='/around'
              className='flex flex-col items-center rounded border border-gray p-1 font-medium hover:text-primary'
            >
              <img src='/aroundActive.svg' alt='내주변' className='w-4' width='16' height='16' />
              내주변
            </Link>
          </div>
        </div>

        <HotelList title='우리도 호캉스 갈까?' subtitle='좋은 호텔/리조트 추천해요!'>
          <Category
            className='justify-center gap-2 py-3 max-[340px]:text-sm max-[340px]:leading-6'
            category={categoryKorea}
            selectCategory={selectCategory.korea}
            setSelectCategory={(category) => categoryChange('korea', category)}
          />
          <Hotel data={hotelData} selectCategory={selectCategory.korea} />
        </HotelList>
        <HotelList title='요즘 Hot한 일본 여행지' subtitle='야무지개 해외에서도 놀자!'>
          <Category
            className='justify-center gap-2 py-3 max-[340px]:text-sm max-[340px]:leading-6 '
            category={categoryJapan}
            selectCategory={selectCategory.japan}
            setSelectCategory={(category) => categoryChange('japan', category)}
          />
          <Hotel data={hotelData} selectCategory={selectCategory.japan} />
        </HotelList>
      </section>
    </>
  );
}

export default HotelPage;
