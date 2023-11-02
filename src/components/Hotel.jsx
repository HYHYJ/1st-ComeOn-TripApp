import { getPbImageURL } from '@/utils/getPbImageURL';
import { numberWithComma } from '@/utils/numberWithComma';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Hotel({ data, selectCategory }) {
  const filterData = data.filter((hotel) => {
    return selectCategory === '' ? true : hotel.category === selectCategory;
  });

  return (
    <div className='flex justify-center'>
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

Hotel.propTypes = {
  data: PropTypes.array,
  selectCategory: PropTypes.string,
};
