import { useRef } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { usePocketData } from '@/api/usePocketData';
import AroundList, { AroundLeisureList } from '@/components/AroundList';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Spinner from '@/components/Spinner';
import MetaTag from '@/components/MetaTag';
import Category from '@/components/Category';
import AroundMap from '@/components/AroundMap';

function AroundPage() {
  const [selectCategory, setSelectCategory] = useState('숙소');
  const [isCheck, setCheck] = useState(false);
  const [selectList, setselectList] = useState('추천순')
  const [selectOrder, setSelectOrder] = useState(false);
  const aroundSearch = useRef();
  const category = ['숙소', '레저/티켓'];

  const { getListData: getLeisureData } = usePocketData('leisure');
  const { data: leisureData } = useQuery(['leisure'], () => getLeisureData());

  const { getListData } = usePocketData('hotel');
  const filter = 'category = "도심힐링" || category = "강원" || category = "제주" || category = "부산" || category = "광주"'
  const {
    data: hotelData,
    isLoading: isHotelLoading,
    isError,
  } = useQuery(['hotelAround'], () => getListData({filter}));
  const {latitude, longitude } = useParams();
  
  if (isHotelLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div className='text-accent'>서버 에러 발생</div>;
  }

  return (
    <>
      <MetaTag title='내주변' description='내 주변의 호텔,레저 리스트' />
      <h1 className='sr-only'>내주변 페이지</h1>
      <header className='fixed top-0 left-0 right-0 z-20 mx-auto bg-white flex text text-center max-w-3xl justify-between px-5 m:px-[5rem] pt-4 gap-5'>
        <form action="" method="get" className='w-[100%]'>
          <Link to={'/search'} className='w-[100%]'>
            <Input id='aroundSearch' label='장소 검색' type='search' labelClass='sr-only' inputRef={aroundSearch} placeholder='장소, 지명 검색' className='bg-lightPurple w-[100%]  h-9 rounded-full px-5 focus:outline-none focus:ring-none focus:ring-secondary search-cancel:rotate-45'  />
          </Link>
        </form>
      <Link to={'/cart'} aria-label='장바구니로 바로가기'>
          {<img src='/cart.svg' alt='' className='h-7 py-0.4' />}
      </Link>
      </header>
      <nav className='fixed z-[15]  mx-auto max-w-3xl bg-white pt-14 top-0 left-0 right-0'>
        <Category
            className='px-5 gap-2 pb-2 pt-2 border-b-[0.13rem] border-[#E1E1E1]'
            category={category}
            selectCategory={selectCategory}
            setSelectCategory={setSelectCategory}
          />
      </nav>
      {
      isCheck && selectCategory==='숙소' 
      ? <AroundList data={hotelData}  selectCategory={selectCategory} selectList={selectList} setselectList={setselectList} selectOrder={selectOrder} setSelectOrder={setSelectOrder} /> 
      : (!isCheck && selectCategory==='숙소' ? <AroundMap data={hotelData} latitude={latitude} longitude={longitude} selectCategory={selectCategory}/> : '')}

      {
      isCheck && selectCategory==='레저/티켓' 
      ? <AroundLeisureList data={leisureData}  selectCategory={selectCategory} selectList={selectList} setselectList={setselectList} selectOrder={selectOrder} setSelectOrder={setSelectOrder}   /> 
      : (!isCheck && selectCategory==='레저/티켓' ? <AroundMap data={leisureData} latitude={latitude} longitude={longitude} selectCategory={selectCategory}/> : '')}

      <Button aria-label='지도와 정보리스트 토글 버튼' type='button' className={`fixed bottom-[5.2rem] inset-x-0 z-10 mx-auto flex rounded-full w-[5.5rem] h-[2.5rem] bg-primary  font-semibold  text-[1rem] shadow-md  px-4 gap-2 ${isCheck ?'bg-white text-primary border-primary pb-2 pt-1.5 border-[0.12rem] bottom-[4.9rem]':'text-white py-2 bottom-[4.9rem]'}`} 
        onClick={() => {setCheck((e) => !e) 
            }}
        >
        {isCheck ?<img src='/around-map.svg' alt='지도로 보기' className='py-[0.55rem] translate-y-[-0.25rem]' />:<img src='/around-list.svg' alt='정보 리스트로 보기' className='py-2 translate-y-[-0.15rem]' />}  {isCheck ? "지도" : "목록"}
      </Button>
    </>
  );
}
export default AroundPage;
