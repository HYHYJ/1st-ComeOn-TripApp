import { useState } from 'react';
import LocationSideButton from './LocationSideButton';
import LocationSideButtonList from './LocationSideButtonList';

function LocationChoice(data) {
  const [selectLocationSide, setSelectLocationSide] = useState('국내');
  const locationSideButton = ['국내', '일본', '동남아','유럽'];
  const buttonListFirst=['서울', '강원', '광주', '부산', '제주']
  const buttonListSecond=['도쿄', '후쿠오카', '오사카', '교토']
  const buttonListThird=['싱가포르','베트남', '태국']
  const buttonListFourth=['스페인','프랑스','스위스','이탈리아']
  
  return (  
    <section className='max-w-3xl pt-[2rem] flex justify-between gap-4'>
      <h3 className='sr-only'>지역별</h3>
      <nav>
        <LocationSideButton className={'w-[9.5rem] lg:w-[15rem] '} locationSideButton={locationSideButton} selectLocationSide={selectLocationSide} setSelectLocationSide={setSelectLocationSide}></LocationSideButton>
      
      </nav>
      {selectLocationSide === '국내' && 
        <LocationSideButtonList category={buttonListFirst} data={data} />
      }
      {selectLocationSide === '일본' && 
        <LocationSideButtonList category={buttonListSecond} data={data} />
      }
      {selectLocationSide === '동남아' && 
      <LocationSideButtonList category={buttonListThird} data={data} />
      }
      {selectLocationSide === '유럽' && 
      <LocationSideButtonList category={buttonListFourth} data={data} />
      }
    </section>
  )
}

export default LocationChoice

