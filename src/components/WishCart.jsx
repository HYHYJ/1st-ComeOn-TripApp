import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

function WishCart({ link, heart, hotel, leisure, cart }) {
  return (
    <AnimatePresence>
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.5 }}
        className='mt-14 flex flex-col items-center gap-1 font-semibold'
      >
        <figure>
          {heart && <img src='/heartActive.svg' alt='하트' className='w-14' />}
          {cart && <img src='/cart.svg' alt='장바구니' className='w-14' />}
        </figure>
        {hotel && <p> 찜한 숙소가 없습니다.</p>}
        {leisure && <p> 찜한 레저가 없습니다.</p>}
        {cart && (
          <>
            <p>장바구니에 담긴 상품이 없습니다</p>
            <p>원하는 상품을 담아보세요</p>
          </>
        )}
        <Link
          to={`/${link}`}
          className='my-2 rounded border px-20 py-2 text-center text-gray2 hover:text-primary'
        >
          {hotel && <p>숙소 보러가기</p>}
          {leisure && <p>레저 보러가기</p>}
          {cart && <p>홈으로 가기</p>}
        </Link>
      </motion.section>
    </AnimatePresence>
  );
}
export default WishCart;

WishCart.propTypes = {
  link: PropTypes.string,
  heart: PropTypes.bool,
  hotel: PropTypes.bool,
  leisure: PropTypes.bool,
  cart: PropTypes.bool,
};
