import { useState } from 'react'
import { Link } from 'react-router-dom';
import { getPbImageURL } from '@/utils/getPbImageURL';
import { numberWithComma } from '@/utils/numberWithComma';
import Kakao from './Kakao'



function AroundMap({data, selectCategory, latitude, longitude}) {
  const [selectMarker, setselectMarker]=useState('')
  
  return (
    <section className='relative  '>
    <h2 className='sr-only'>내 주변 숙소 지도</h2>
    <Kakao data={data} selectCategory={selectCategory} selectMarker={selectMarker} setselectMarker={setselectMarker} latitude={latitude} longitude={longitude} />
    {selectMarker==='' ? '' :
      <article className='fixed bottom-[4.6rem] mx-auto w-[95%] md:w-[40rem] md:h-[11rem] inset-x-0 z-10  h-[8.3rem] py-3 px-3 flex shadow-md  bg-white rounded-3xl'>
        <figure className='w-[35%]  overflow-hidden mr-4 rounded-2xl'>
          <img src={selectCategory==='숙소'  ? getPbImageURL(selectMarker, 'img'): getPbImageURL(selectMarker, 'main') } alt='' className=' h-[110%] w-[100%]  cover object-cover' /> 
          <figcaption className='sr-only'>{selectMarker.title} </figcaption>
        </figure>
        <div role="group">
          <Link to={selectCategory==='숙소'  ? `hotel/${selectMarker.id}`: `LeisureDetail/${selectMarker.id}` }>
          <h4 className='font-bold'>{selectMarker.title}</h4>
          </Link>
          {selectCategory === '숙소' ? (
            <>
              <img src='/star.svg' alt='별점' className='inline-block mb-[0.3rem] mr-[0.3rem] '/>
              <span className='font-extrabold text-[0.9rem]'>{selectMarker.star} </span>
              <span className='text-[0.9rem] mx-2  text-gray2'>{selectCategory === '숙소' ? ('숙박: 15:00~') : ('')}</span> 
            </>
          ) : (
            selectMarker?.label.map((label) => (
              <span
                key={label}
                className='mr-1 mt-1 rounded-[2px] border-[1px] border-[#e6e6e6] bg-[#f2f2f2] px-1 py-[2px] text-[11px]'
              >
                {label}
              </span>
            ))
          )}
          <div className='block absolute right-5 bottom-5 '>
            <span className=' text-[1.2rem] font-bold '>{numberWithComma(selectMarker.price)}원</span>
          </div>
        </div>
      </article>
    }
  </section>
  )
}

export default AroundMap