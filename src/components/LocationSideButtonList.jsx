import { Link } from 'react-router-dom';

function LocationSideButtonList({category, data}) {
  let hotelCategory;

  return (
    <>
    <ul className='flex  flex-col  flex-grow '>
      {category.map((item)=>{
        
        switch (item) {
          case '서울':
            hotelCategory = data.data.filter((hotel) => hotel.category === '도심힐링');
            break;
          default:
            hotelCategory = data.data.filter((hotel) => hotel.category === item);
            break;
          
        }
        
        return(
          <li key={item} aria-label={item} className='hover:text-black w-[100%] text-gray2 font-[0.7rem] px-4  text-[0.9rem] border-b-[0.1rem] border-[#E1E1E1] text-center'>
            <Link to={`${hotelCategory[0].category}`} key={item} className='block py-6 md:py-7'>
              {item}
            </Link>
          </li>
        )
      })}
    </ul>
    </>
  )
}

export default LocationSideButtonList

