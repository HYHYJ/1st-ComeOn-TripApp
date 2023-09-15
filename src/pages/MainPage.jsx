import { usePocketData } from '@/api/usePocketData';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import Category from '@/components/Category';
import Header from '@/components/Header';
import Hotel from '@/components/Hotel';
import HotelList from '@/components/HotelList';
import Spinner from '@/components/Spinner';
import 'swiper/css';
import 'swiper/css/navigation';

function MainPage() {
  const { getListData } = usePocketData('hotel');
  const filter = 'category = "강원" || category = "제주" || category = "부산" || category = "광주"';
  const {
    data: hotelData,
    isLoading: isHotelLoading,
    isError,
  } = useQuery(['hotel', { filter }], () => getListData({ filter }));

  const [selectCategory, setSelectCategory] = useState('강원');
  const category = ['강원', '제주', '부산', '광주'];

  if (isHotelLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>서버 에러 발생</div>;
  }

  return (
    <>
      <Helmet>
        <title>야무지개놀자</title>
      </Helmet>
      <Header logo='logo' search='search' cart='cart' />
      <section className=''>
        <h2 className='sr-only'>메인페이지</h2>
        <div className='mb-4'>
          <Swiper
            modules={[Navigation, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            loop={true}
            a11y={true}
            scrollbar={{ draggable: true }}
          >
            <SwiperSlide>
              <img src='/ad.png' alt='광고' className='mx-auto h-auto max-h-[29rem]' />
            </SwiperSlide>
            <SwiperSlide>
              <img src='/ad2.png' alt='광고' className='mx-auto h-auto max-h-[29rem]' />
            </SwiperSlide>
            <SwiperSlide>
              <img src='/ad3.png' alt='광고' className='mx-auto h-auto max-h-[29rem]' />
            </SwiperSlide>
          </Swiper>
        </div>
        <ul className='flex items-center justify-center gap-10 py-5 text-center max-[362px]:gap-6'>
          <li>
            <Link to='/hotel' className='flex flex-col items-center gap-2'>
              <img src='/hotel.svg' alt='호텔 리조트' />
              호텔/리조트
            </Link>
          </li>
          <li>
            <Link to='/airline' className='flex flex-col items-center gap-2'>
              <img src='/plane.svg' alt='항공' />
              항공
            </Link>
          </li>
          <li>
            <Link to='/traffic' className='flex flex-col items-center gap-2'>
              <img src='/bus.svg' alt='교통' />
              교통
            </Link>
          </li>
          <li>
            <Link to='/leisure' className='flex flex-col items-center gap-2'>
              <img src='/ticket.svg' alt='레저 티켓' />
              레저/티켓
            </Link>
          </li>
        </ul>

        <section className='mx-auto max-w-2xl px-4'>
          <HotelList title='야!무지개놀자~!' subtitle='재밌게 놀자!'>
            <Category
              className='justify-center gap-2 py-3 max-[340px]:text-sm max-[340px]:leading-6 '
              category={category}
              selectCategory={selectCategory}
              setSelectCategory={setSelectCategory}
            />
            <Hotel data={hotelData} selectCategory={selectCategory} />
          </HotelList>
        </section>
      </section>
      <footer className='textb mx-auto max-w-2xl bg-slate-50 p-4 pb-20 text-gray3'>
        <div className='flex items-center gap-1'>
          <img src='/logo.svg' alt='로고' />
          <p>(주)야무지개놀자</p>
        </div>
        <div className='flex flex-col'>
          <p>대표 : 강경민, 김종윤, 신명화, 장효윤</p>
          <p>메일 : help@yamoossam.com</p>
          <p>주소 : 서울특별시 강남구 테헤란로108길 42 </p>
          <p>고객센터 : 1234-1234 (9시 - 3시)</p>
          <p>&copy; 2023 (주) 야무지개놀자 모든 권리 보유</p>
        </div>
      </footer>
    </>
  );
}
export default MainPage;
