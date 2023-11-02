import { Link } from 'react-router-dom';
import TrafficReserveButton from './TrafficReserveButton'

function SearchTraffic() {
  return (
    <section>
    <h2 className='sr-only' id='trafficButtonList'>교통/항공 바로가기</h2>
      <ul role='group' aria-labelledby='trafficButtonList' className='mx-auto w-[87%] md:w-[77%]'>
        <li>
          <Link to={'/install'} aria-label='고속버스 정보로 바로가기'>
            <TrafficReserveButton src={'/leisure-bus.png'} alt={'고속버스'} />
          </Link>
        </li>
        <li>
          <Link to={'/train'} aria-label='기차 정보로 바로가기'>
            <TrafficReserveButton src={'/leisure-train.png'} alt={'기차'} />
          </Link> 
        </li>
        <li>
          <Link to={'/airline'} aria-label='항공권 정보로 바로가기'> 
           <TrafficReserveButton src={'/leisure-airplane.png'} alt={'항공권'} />
         </Link> 
        </li>
      </ul>
    </section>
  )
}

export default SearchTraffic