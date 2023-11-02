import { usePocketData } from '@/api/usePocketData';
import { getPbImageURL } from '@/utils/getPbImageURL';
import { numberWithComma } from '@/utils/numberWithComma';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import LeisureCategory from '@/components/LeisureCategory';

function TrafficCarPage() {
  const [selectCategory, setSelectCategory] = useState('전체');
  const category = ['전체', '제주이용권', '내륙이용권'];

  const { getListData: getTrafficData } = usePocketData('traffic');
  const { data: trafficData } = useQuery(['leisure'], () => getTrafficData());

  let filterData;
  if (selectCategory === '전체') {
    filterData = trafficData;
  } else if (selectCategory === '제주이용권') {
    filterData = trafficData?.filter((traffic) => traffic.category === '제주');
  } else if (selectCategory === '내륙이용권') {
    filterData = trafficData?.filter((traffic) => traffic.category === '내륙');
  }

  return (
    <>
      <Header
        search='search'
        back='back'
        cart='cart'
        className='ml-10 text-xl font-semibold'
        title='렌터카'
      />
      <section className='pb-20'>
        <h2 className='sr-only'>렌터카 페이지</h2>
        <img src='/traffic-car.png' alt='렌터카' />
        <LeisureCategory
          category={category}
          selectCategory={selectCategory}
          setSelectCategory={setSelectCategory}
        />
        <div className='px-5'>
          {filterData?.map((item) => (
            <Link to={`/carDetail/${item.id}`} key={item.id}>
              <div key={item.id} className='flex gap-3 border-b-[1px] border-[#f2f2f2] py-4'>
                <div className='flex-shrink-0'>
                  <img
                    src={getPbImageURL(item, 'thumbnail')}
                    alt={item.brand}
                    className={`h-[120px] w-[120px] rounded-[4px] border-none`}
                  />
                </div>
                <div className='flex grow flex-col justify-between'>
                  <div>
                    <span className='line-clamp-2 text-[14px] leading-[14px]'>{item.title}</span>
                    <div className='flex flex-wrap'>
                      {item.label.map((label) => (
                        <span
                          key={label}
                          className='mr-1 mt-1 rounded-[2px] border-[1px] border-[#e6e6e6] bg-[#f2f2f2] px-1 py-[2px] text-[10px]'
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className='text-end'>
                    {item.discount && (
                      <span className='text-end text-[12px] leading-3 text-gray line-through'>
                        {numberWithComma(item.price)}원
                      </span>
                    )}
                    <div className='text-end font-bold leading-4'>
                      {item.discount && (
                        <span className='text-accent'>
                          {item.discount}
                          <span className='mr-1 text-[12px] text-accent'>%</span>
                        </span>
                      )}
                      <span>{numberWithComma(item.price * (100 - item.discount) * 0.01)}</span>
                      <span className='font-normal'>원</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export default TrafficCarPage;
