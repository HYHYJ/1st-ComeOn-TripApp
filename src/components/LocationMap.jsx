import { Kakao1 } from './Kakao'
import { Link } from 'react-router-dom';


function LocationMap({selectAddress, setselectAddress }) {
 
  return (
    <section className='relative '>
      <h3 className='sr-only'>지도검색</h3>
      <div aria-label='지정한 주소' className='fixed pt-[6.3rem] text-[1rem] font-semibold bg-opacity-4 max-w-3xl mx-auto top-0 left-0 right-0 z-10 flex bg-[#E0E4FF] py-2  pl-[8%]'><img  className='w-[1.3rem] h-[100%] pt-[0.1rem] mr-2' src='/aroundActive.svg' alt='' />
        {selectAddress.address}
      </div>
      <Kakao1 setselectAddress={setselectAddress}/>
      <Link to={`/around/${selectAddress.latitude}/${selectAddress.longitude} `}  className=' fixed bottom-[5.2rem] inset-x-0  z-10 px-[1rem] py-[0.66rem] flex mx-auto bg-primary hover:bg-[#1E51EE] font-bold text-white w-[7.2rem] h-[2.6rem] text-[0.9rem] rounded-full shadow-lg'>
      위치 지정 완료
      </Link>
    </section>
  )
}

export default LocationMap