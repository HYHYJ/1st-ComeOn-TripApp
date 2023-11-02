import { usePocketData } from '@/api/usePocketData';
import { getPbImageURL } from '@/utils/getPbImageURL';
import { numberWithComma } from '@/utils/numberWithComma';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import MetaTag from '@/components/MetaTag';

function LeisureBrandPage() {
  const { getListData: getLeisureData } = usePocketData('leisure');
  const { data: leisureData } = useQuery(['leisure'], () => getLeisureData());

  let { id } = useParams();
  let filterData;
  filterData = leisureData?.filter((leisure) => leisure.brand === `${id}`);

  let bg;
  let description;
  let logo;
  let check;

  switch (id) {
    case '에버랜드':
      bg = '/leisure-everlandBg.png';
      description = `"소중한 가치"를 담아 모두와 함께 나눌 행복이 머무는 곳. 에버랜드의 행복한
      공간으로 여러분들을 초대합니다.`;
      logo = '/leisure-everland.png';
      check = [
        '기다림 없이 야무지개놀자 모바일 입장권 제시 후 바로 입장할 수 있습니다.',
        'MY 야무지개놀자 국내여행 예약내역에서 모바일 입장권을 확인하세요.',
      ];
      break;
    case '롯데월드':
      bg = '/leisure-lotteworldBg.png';
      description = `365일 즐거움이 가득한 모험과 신비의 나라 롯데월드에서 시즌 별 퍼레이드와 다이나믹한 어트랙션을 만나보세요.`;
      logo = '/leisure-lotteworld.png';
      check = [
        '롯데월드 어드벤처는 코로나19의 확산방지와 손님과 직원의 안전을 위해 예방 및 방역을 실시하고 있습니다.',
      ];
      break;
    case '캐리비안베이':
      bg = '/leisure-carribeanbayBg.png';
      description = `이국적인 분위기를 물씬 풍기는 캐리비안베이는 거대한 파도풀을 비롯하여 다양한 어트랙션과 시설들로 가득한 즐거운 물의 나라입니다.`;
      logo = '/leisure-carribeanbay.png';
      check = [
        '케리비안베이에서는 손님들이 이용하시는 모든 시설과 놀이기구의 소독과 방역을 실시하고 있으며 정문과 주요 매장에 손소독제를 비치해 언제는 사용하실 수 있도록 제공하고 있습니다.',
      ];
      break;
    default:
      break;
  }

  return (
    <>
      <MetaTag title='브랜드관' description='브랜드관' />
      <Header
        className='ml-10 text-xl font-semibold '
        back='back'
        search='search'
        cart='cart'
        title={id}
      />
      <section className='pb-20'>
        <div className='relative'>
          <img src={bg} alt={id} className='z-0 w-full' />
          <div className='absolute bottom-[-40px] right-[50%] z-10 mx-auto h-[80px] w-[80px] translate-x-2/4 rounded-[4px] bg-white shadow-xl'>
            <img src={logo} alt='에버랜드 로고' className='mx-auto pt-3' />
          </div>
        </div>
        <div className='mx-5 mt-[60px]'>
          <h2 className='mt-3 text-center text-xl font-bold'>{id}</h2>
          <p className='text-center text-xs'>{description}</p>
          <div className='mt-4 rounded-[4px] border border-[#f1b77f] bg-[#fef8f2] px-5 py-4 text-xs'>
            <span className='font-bold'>꼭! 확인해 주세요</span>
            <ul className='mt-2'>
              {check?.map((item) => (
                <li key={item} className='mb-1'>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {filterData?.map((item) => (
            <Link to={`/leisureDetail/${item.id}`} key={item.id}>
              <div className='flex gap-3 border-b-[1px] border-[#f2f2f2] py-4'>
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

export default LeisureBrandPage;
