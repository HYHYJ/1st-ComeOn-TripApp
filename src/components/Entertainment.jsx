import { Link, useParams } from 'react-router-dom';
import { getPbImageURL } from '@/utils/getPbImageURL';
import { numberWithComma } from '@/utils/numberWithComma';

function Entertainment({ data, selectCategory }) {
  let { id } = useParams();
  let filterData = data;

  if (selectCategory === '인기') {
    filterData = data?.filter((leisure) => leisure.category === '인기');
  } else if (id === '테마파크') {
    if (selectCategory === '전체') {
      filterData = data?.filter((leisure) => leisure.largeCategory === '테마파크');
    } else if (selectCategory === '놀이동산') {
      filterData = data?.filter((leisure) => leisure.category === '놀이동산');
    } else if (selectCategory === '아쿠아리움') {
      filterData = data?.filter((leisure) => leisure.category === '아쿠아리움');
    } else if (selectCategory === '수목원') {
      filterData = data?.filter((leisure) => leisure.category === '수목원');
    } else if (selectCategory === '동물원') {
      filterData = data?.filter((leisure) => leisure.category === '동물원');
    } else if (selectCategory === '기타(테마파크)') {
      filterData = data?.filter((leisure) => leisure.category === '기타(테마파크)');
    }
  } else if (id === '워터파크') {
    if (selectCategory === '워터파크') {
      filterData = data?.filter((leisure) => leisure.category === '워터파크');
    } else if (selectCategory === '스파') {
      filterData = data?.filter((leisure) => leisure.category === '스파');
    }
  } else if (id === '전시·예매') {
    if (selectCategory === '전시') {
      filterData = data?.filter((leisure) => leisure.category === '전시');
    } else if (selectCategory === '공연') {
      filterData = data?.filter((leisure) => leisure.category === '공연');
    }
  } else if (id === '투어·관광') {
    if (selectCategory === '투어패스') {
      filterData = data?.filter((leisure) => leisure.category === '투어패스');
    } else if (selectCategory === '케이블카') {
      filterData = data?.filter((leisure) => leisure.category === '케이블카');
    } else if (selectCategory === '유람선/요트') {
      filterData = data?.filter((leisure) => leisure.category === '유람선/요트');
    } else if (selectCategory === '축제') {
      filterData = data?.filter((leisure) => leisure.category === '축제');
    }
  }

  return (
    <div>
      {filterData?.map((item) => (
        <Link to={`/leisureDetail/${item.id}`} key={item.id}>
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
  );
}

export default Entertainment;
