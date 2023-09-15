import { getPbImageURL } from '@/utils/getPbImageURL';
import { numberWithComma } from '@/utils/numberWithComma';
import { Link } from 'react-router-dom';

function Hotel({ data, selectCategory }) {
  let filterData;

  switch (selectCategory) {
    case '휴가에딱':
      filterData = data.filter((hotel) => hotel.category === '휴가에딱');
      break;
    case '도쿄':
      filterData = data.filter((hotel) => hotel.category === '도쿄');
      break;
    case '강원':
      filterData = data.filter((hotel) => hotel.category === '강원');
      break;
    default:
      filterData = data.filter((hotel) => hotel.category === selectCategory);
      break;
  }

  return (
    <div role='ListWrapper' className='flex justify-center'>
      <ul className='grid grid-cols-4 gap-4 max-[610px]:grid-cols-2'>
        {filterData?.map((item) => (
          <li key={item.id} className='py-1 hover:scale-105 max-[610px]:px-2 max-[360px]:px-0'>
            <Link to={`/hotel/${item.id}`}>
              <img
                src={getPbImageURL(item, 'img')}
                alt={item.title}
                className='h-32 w-36 rounded-lg'
              />
              <p className=' pt-1 font-semibold'>{item.title}</p>
              <div className='flex items-center gap-1 text-sm text-gray2'>
                <img src='/star.svg' alt='평점' className='h-4 w-4' />
                <span>{item.star}</span>
                <span>({item.count})</span>
              </div>
              <p className='pt-1 text-right font-semibold text-primary'>
                {numberWithComma(item.price)}원
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Hotel;