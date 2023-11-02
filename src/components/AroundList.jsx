import { Link } from 'react-router-dom';
import { getPbImageURL } from '@/utils/getPbImageURL';
import { numberWithComma } from '@/utils/numberWithComma';
import Button from './Button'

function AroundList({data, selectCategory, selectList, setselectList, selectOrder, setSelectOrder}) {
  let filterData;
  
  switch (selectList) {
    case '추천순':
      filterData = data.filter((hotel) => hotel.category === '부산');
      break;
    case '인기순':
      filterData = data.filter((hotel) => hotel.category === '도심힐링');
      break;
    case '최신순':
      filterData = data.filter((hotel) => hotel.category === '제주');
      break;
    default:
      filterData = data.filter((hotel) => hotel.category === selectCategory);
      break;
  }


  return (
    <section className='relative'>
    <h3 className='sr-only'>내 주변 숙소 목록</h3>
    <nav className='fixed z-10 bg-white pt-[6rem] top-0 left-0 right-0 max-w-3xl mx-auto'>
      <Button type='button' className='ml-auto mr-3 mt-auto flex rounded-full text-[0.9rem] pt-2 pb-1 px-4 font-bold'
        onClick={() => {setSelectOrder((e) => !e);}} aria-pressed="false"
      > {selectList}   <img src='/back.svg' alt='순서리스트 보기' className='rotate-[270deg] w-5 pt-0.5' />
          </Button>
      <ul className={`absolute  right-9 top-[8rem] w-[4rem] text-center z-100 bg-white rounded-md shadow-md ${!selectOrder ? 'hidden' : ''}`}>
        <li className='hover:bg-lightPurple text-[0.9rem] py-[0.5rem]' onClick={() => {
      setselectList('추천순')}}>추천순</li>
        <li className='hover:bg-lightPurple text-[0.9rem] py-[0.5rem]' onClick={() => {
      setselectList('인기순')}}>인기순</li>
        <li className='hover:bg-lightPurple text-[0.9rem] py-[0.5rem]' onClick={() => {
      setselectList('최신순')}}>최신순</li>
      </ul>
    </nav>

    <section className='my-[8rem]'>
      {filterData?.map((item) => (
        <article key={item.id} className='h-[30rem] lg:h-[36rem] py-1.2   shadow-md  bg-white '>
          <figure className='w-[100%] h-[57%] lg:h-[65%]  overflow-hidden mr-4 '>
            <img
              src={getPbImageURL(item, 'img')}
              alt=''
              className=' h-[120%] w-[110%]  cover object-cover' />
            <figcaption className='sr-only'>{item.title} </figcaption>
          </figure>
          <div role="group" className='px-6 pt-3 pb-5'>
            <h4 className='font-bold text-lg'>{item.title}</h4>
            <img src='/star.svg' alt='별점' className='inline-block mb-[0.3rem] mr-[0.3rem] '/>
            <span className='font-extrabold text-[0.9rem]'>{item.star} </span>
            <span className='font-bold text-gray2 text-[0.9rem]'>&#183; {item.grade} </span>
            <div className=' bg-lightPurple inline-block ml-1 pr-3 pl-2 pb-1 rounded-full'>
              <img src='/locationActive.svg' alt='위치' className='inline-block h-4  mr-[0.2rem] '/>
              <span className='font-medium text-primary text-[0.8rem] mb-[1rem]'>{item.location} </span>
            </div>
            <div className=' flex justify-between py-4  '>
              <span className='block text-[0.9rem] mr-3 text-gray2'>숙박: 15:00~</span>
              <span className='block text-[1.2rem] font-extrabold mr-2'>{numberWithComma(item.price)}원</span>
            </div>
            <Link to={`hotel/${item.id}`} className='absolute z-0 right-4 text-right rounded-full  bg-primary hover:bg-[#1E51EE] text-white font-medium  text-[1rem] shadow-md py-2 px-6 gap-2 '>
               {'숙소 예약하기'}
            </Link>
          </div>
        </article>
        ))}
    </section>
    
    </section>
  )
}

export default AroundList





export function AroundLeisureList({data, selectCategory, selectList, setselectList, selectOrder, setSelectOrder}) {
  let filterData;

  switch (selectList) {
    case '추천순':
      filterData = data.filter((leisure) => leisure.largeCategory === '테마파크');
      break;
    case '인기순':
      filterData = data.filter((leisure) => leisure.largeCategory === '투어·관광');
      break;
    case '최신순':
      filterData = data.filter((leisure) => leisure.largeCategory === '전시·예매');
      break;
    default:
      filterData = data.filter((leisure) => leisure.largeCategory === selectCategory);
      break;
  }

  return (
    <section className='relative'>
    <h2 className='sr-only'>내 주변 레저/티켓 목록</h2>
    <nav className='fixed z-10 bg-white pt-[6rem] top-0 left-0 right-0 max-w-3xl mx-auto'>
      <Button
        type='button'
        className='ml-auto mr-3 mt-auto flex rounded-full  text-[0.9rem] pt-2 pb-1 px-4 font-bold '
        onClick={() => {setSelectOrder((e) => !e);}} aria-pressed="false"
       >
        {selectList}   <img src='/back.svg' alt='뒤로가기' className='rotate-[270deg] w-5 pt-0.5'/>
       </Button>
      <ul className={`absolute right-9 top-[8rem] w-[4rem] text-center  bg-white rounded-md shadow-md ${!selectOrder ? 'hidden' : ''}`}>
        <li className='hover:bg-lightPurple text-[0.9rem] py-[0.5rem] ' onClick={() => {
      setselectList('추천순')}}>추천순</li>
        <li className='hover:bg-lightPurple text-[0.9rem] py-[0.5rem]' onClick={() => {
      setselectList('인기순')}}>인기순</li>
        <li className='hover:bg-lightPurple text-[0.9rem] py-[0.5rem]' onClick={() => {
      setselectList('최신순')}}>최신순</li>
      </ul>
      
    </nav>
    <section className='my-[8rem] '>
      {filterData?.map((item) => (
        <article key={item.id} className='h-[26rem] lg:h-[32rem] py-1.2   shadow-md  bg-white '>
          <figure className='w-[100%] h-[57%] lg:h-[65%]  overflow-hidden mr-4 '>
            <img
              src={getPbImageURL(item, 'main')}
              alt=''
              className=' h-[120%] w-[110%]  cover object-cover' />
            <figcaption className='sr-only'>{item.title} </figcaption>
          </figure>
          <div role='group' className='px-6 pt-3  '>
            <h2 className='font-bold text-lg'>{item.title}</h2>
            <div className=' flex justify-between pt-2 pb-4 '>
              <span className='block '>
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
            <Link to={`LeisureDetail/${item.id}`} className='absolute z-0 right-4 text-right rounded-full bg-primary hover:bg-[#1E51EE] text-white font-medium  text-[1rem] shadow-md py-2 px-6 gap-2 '>
               {'상품 선택하기'}
            </Link>
          </div>
        </article>
        ))}
    </section>
    
    </section>
  )
}

 

