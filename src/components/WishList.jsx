import { motion, AnimatePresence } from 'framer-motion';
import { getPbImageURL } from '@/utils/getPbImageURL';
import { numberWithComma } from '@/utils/numberWithComma';
import { Link } from 'react-router-dom';
import { usePocketData } from '@/api/usePocketData';
import { useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import Button from './Button';
import Input from './Input';

function WishList({
  wish,
  cart,
  data,
  link,
  handleDelete,
  hotel,
  leisure,
  cartHotel,
  img,
  cartImg,
  handleCheckbox,
  buttonClass,
  totalCartPrice,
  handleBooked,
}) {
  const { getListData } = usePocketData('room');
  const { data: roomData } = useQuery(['cartHotel'], () =>
    getListData({ fields: 'img,id,collectionId,title' }),
  );

  return (
    <>
      <div className='px-4'>
        <AnimatePresence>
          {data?.map((item) => {
            const matchingRoom = roomData?.find((roomItem) => roomItem.id === item.roomId);
            return (
              <motion.article
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.5 }}
                key={item.id}
                className='relative mx-auto mt-3 flex w-full max-w-[39rem] flex-col rounded-lg bg-lightPurple p-5 max-[375px]:p-3'
              >
                {cart && (
                  <div className='flex items-center gap-2 pb-3'>
                    <Input
                      type='checkbox'
                      id={item.id}
                      label='선택'
                      className='checkbox h-5 w-5'
                      labelClass='sr-only'
                      onClick={() => handleCheckbox(item.id)}
                    />
                    {cartHotel && (
                      <Link to={`/hotel/${item.hotelId}`} className='text-lg font-semibold'>
                        {item.hotelTitle}
                      </Link>
                    )}
                    {leisure && <div className='font-semibold'>{item.title}</div>}
                  </div>
                )}
                <div className='flex gap-3'>
                  {cartImg && matchingRoom && (
                    <figure className='h-[130px] w-[130px] max-[375px]:h-[100px] max-[375px]:w-[100px]'>
                      <img
                        src={getPbImageURL(matchingRoom, cartImg)}
                        alt={item.title}
                        className='h-full w-full rounded-md object-cover'
                      />
                      <figcaption className='sr-only'>{item.title}</figcaption>
                    </figure>
                  )}
                  {img && (
                    <figure className='h-[130px] w-[130px] max-[375px]:h-[100px] max-[375px]:w-[100px]'>
                      <img
                        src={getPbImageURL(item, img)}
                        alt={item.title}
                        className='h-full w-full rounded-md object-cover'
                      />
                      <figcaption className='sr-only'>{item.title}</figcaption>
                    </figure>
                  )}
                  {cartHotel && matchingRoom && (
                    <div className='flex flex-col font-semibold min-[375px]:gap-0.5'>
                      <div className=''>{matchingRoom.title}</div>
                      <div className='text-sm text-gray3'>체크인: {item.checkin.slice(0, 10)}</div>
                      <div className='text-sm text-gray3'>
                        체크아웃: {item.checkout.slice(0, 10)}
                      </div>
                    </div>
                  )}
                  <div className='flex flex-col gap-1 font-semibold min-[375px]:pb-2'>
                    {!cart && (
                      <Link to={`/${link}/${item.id}`} className='font-bold min-[375px]:text-lg'>
                        {item.title}
                      </Link>
                    )}
                    {hotel && (
                      <div className='flex items-center gap-1 text-sm text-gray2'>
                        <img src='/star.svg' alt='평점' className='h-4 w-4' />
                        <span>{item.star}</span>
                      </div>
                    )}
                    <div className='pt-8 text-primary min-[375px]:text-[1.2rem]'>
                      <p className='absolute bottom-4 right-5 max-[375px]:bottom-2 max-[375px]:right-3'>
                        {numberWithComma(item.price)}원
                      </p>
                    </div>
                  </div>
                </div>
                <Button
                  type='button'
                  className={`absolute right-5 h-6 w-6 cursor-pointer max-[375px]:right-2 ${buttonClass}`}
                  onClick={() => handleDelete(item.id)}
                >
                  {wish && <img src='/heartActive.svg' alt='찜' className='mt-1 max-[375px]:h-5' />}
                  {cart && <img src='/close.svg' alt='닫기' className='h-5 w-5' />}
                </Button>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>

      {cart && (
        <div className='fixed bottom-0 z-[100] flex w-full max-w-3xl flex-col gap-1 border-t-2 border-[#919191] bg-white px-5 py-4 font-bold'>
          <span className='text-end text-[12px] text-[#919191]'>결제 예상금액</span>
          <div className='flex items-center justify-between pb-2'>
            <span className='pl-1'>총</span>
            <span className='text-lg text-primary'>{numberWithComma(totalCartPrice)}원</span>
          </div>
          <Button
            type='submit'
            className='w-full rounded-[4px] border bg-primary px-4 py-2 text-white'
            onClick={handleBooked}
          >
            바로 결제하기
          </Button>
        </div>
      )}
    </>
  );
}
export default WishList;

WishList.propTypes = {
  wish: PropTypes.bool,
  cart: PropTypes.bool,
  data: PropTypes.array,
  link: PropTypes.string,
  handleDelete: PropTypes.func,
  hotel: PropTypes.bool,
  leisure: PropTypes.bool,
  img: PropTypes.string,
  cartHotel: PropTypes.bool,
  handleCheckbox: PropTypes.func,
  buttonClass: PropTypes.string,
};
