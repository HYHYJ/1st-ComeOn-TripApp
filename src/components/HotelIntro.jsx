import PropTypes from 'prop-types';

function HotelIntro({ intro }) {
  return (
    <section className='mx-auto px-4 max-w-xl pt-5 pb-40'>
      <h3 className='font-semibold text-xl'>호텔 소개</h3>
      <p className="pt-2">{intro}</p>
    </section>
  );
}
export default HotelIntro;

HotelIntro.propTypes = {
  intro: PropTypes.string,
};