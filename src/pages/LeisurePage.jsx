import { usePocketData } from '@/api/usePocketData';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Category from '@/components/Category';
import Entertainment from '@/components/Entertainment';
import Exhibition from '@/components/Exhibition';
import Header from '@/components/Header';
import LeisureBrand from '@/components/LeisureBrand';
import LeisureLink from '@/components/LeisureLink';
import MetaTag from '@/components/MetaTag';

function LeisurePage() {
  const { getListData: getLeisureData } = usePocketData('leisure');
  const { getListData: getExhibitionData } = usePocketData('exhibition');
  const { data: leisureData } = useQuery(['leisure'], () => getLeisureData());
  const { data: exhibitionData } = useQuery(['exhibition'], () =>
    getExhibitionData({ sort: 'ranking' }),
  );

  const [selectCategory, setSelectCategory] = useState('서울');
  const category = ['서울', '경기', '제주', '강원'];

  return (
    <>
      <MetaTag title='레저' description='레저' />
      <Header
        className='ml-10 text-xl font-semibold'
        back='back'
        search='search'
        cart='cart'
        title='레저/티켓'
      />
      <section className='pb-20'>
        <h2 className='sr-only'>레저 페이지</h2>
        <div className='flex justify-between px-4 text-[10px]'>
          <Link to='/leisure/테마파크'>
            <LeisureLink src='/leisure-themePark.png' alt='테마파크' caption='테마파크' />
          </Link>
          <Link to={'/leisure/워터파크'}>
            <LeisureLink src='/leisure-waterPark.png' alt='워터파크' caption='워터파크' />
          </Link>
          <Link to={'/leisure/전시·예매'}>
            <LeisureLink src='/leisure-reservation.png' alt='전시/예매' caption='전시/예매' />
          </Link>
          <Link to={'/leisure/투어·관광'}>
            <LeisureLink src='/leisure-tour.png' alt='투어/관광' caption='투어/관광' />
          </Link>
        </div>
        <div className='mx-5 flex justify-between py-[14px] font-bold'>
          <h3 className='text-[18px]'>인기 브랜드관</h3>
        </div>
        <div className='flex gap-4 px-5 pb-5'>
          <Link to={'/leisurebrand/에버랜드'}>
            <LeisureBrand src='/leisure-everland.png' alt='에버랜드' caption='에버랜드' />
          </Link>
          <Link to={'/leisurebrand/롯데월드'}>
            <LeisureBrand src='/leisure-lotteworld.png' alt='롯데월드' caption='롯데월드' />
          </Link>
          <Link to={'/leisurebrand/캐리비안베이'}>
            <LeisureBrand
              src='/leisure-carribeanbay.png'
              alt='캐리비안베이'
              caption='캐리비안베이'
            />
          </Link>
        </div>
        <div className='flex h-[118px] justify-between bg-secondary px-5 pt-3 font-bold'>
          <h3 className='text-[18px] text-white'>놀거리 기획전</h3>
          <a href='/LeisureListPage' className='text-[14px] leading-[27px] text-white'>
            전체보기
          </a>
        </div>
        <div className='mx-5 mt-[-70px] rounded-[4px] border border-[#e6e6e6] bg-white px-4 pt-6'>
          <h3 className='text-[18px] font-bold'>인기놀거리 10% 쿠폰할인</h3>
          <span className='text-[14px] font-medium text-primary'>
            여름 놀거리 야무지개놀자에서 쿠폰받고 즐기자!
          </span>
          <Entertainment data={leisureData} selectCategory={'인기'} />
          <a
            className='mx-[-16px] flex items-center justify-center border-[1px] border-[#f2f2f2] bg-[#fbfbfb] py-[14px]'
            href=''
          >
            기획전 자세히보기
            <img className='h-[14px]' src='/leisure-next.png' alt='더보기' />
          </a>
        </div>
        <div className='p-5'>
          <div className='flex items-center justify-between pb-3'>
            <div>
              <h3 className='text-[18px] font-bold leading-[18px]'>지역별 전시 TOP 랭킹</h3>
              <span className='text-[12px] leading-[12px]'>최근 1주간 판매량이 가장 많았어요</span>
            </div>
          </div>
          <Category
            className='mb-4 justify-center gap-5'
            category={category}
            selectCategory={selectCategory}
            setSelectCategory={setSelectCategory}
          />
          <Exhibition data={exhibitionData} selectLocation={selectCategory} />
        </div>
      </section>
    </>
  );
}
export default LeisurePage;
