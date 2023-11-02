import PropTypes from 'prop-types';

function HotelList({ title, subtitle, children }) {
  return (
    <article className='mx-auto py-5'>
      <h3 className='text-lg font-semibold'>{title}</h3>
      <p className='text-sm font-medium text-gray3'>{subtitle}</p>
      {children}
    </article>
  );
}
export default HotelList;

HotelList.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node,
};
