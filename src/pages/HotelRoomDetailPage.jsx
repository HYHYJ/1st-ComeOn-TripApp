import { useState, useRef } from 'react';
import { usePocketData } from '@/api/usePocketData';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getPbImageURL } from '@/utils/getPbImageURL';
import { numberWithComma } from '@/utils/numberWithComma';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import useAuthStore from '@/store/useAuthStore';
import NumberOfPeople from '@/components/NumberOfPeople';
import Header from '@/components/Header';
import Spinner from '@/components/Spinner';
import Input from '@/components/Input';
import Button from '@/components/Button';
import MetaTag from '@/components/MetaTag';
import 'swiper/css';
import 'swiper/css/navigation';

function HotelRoomDetailPage() {
  const { id, hotel, title } = useParams();
  const { getIdData: getRoom } = usePocketData('room');
  const { createData: createCart } = usePocketData('order');
  const { updateData: updateUser } = usePocketData('users');
  const { data: roomData, isLoading: roomLoading } = useQuery(['room', id], () => getRoom(id));

  const isAuth = useAuthStore((state) => state.isAuth);
  const user = useAuthStore((state) => state.user);
  const userId = user.id;

  const queryClient = useQueryClient();

  const navigation = useNavigate();

  const [isShowPayment, setIsShowPayment] = useState(false);
  const [selectNumber, setSelectNumber] = useState(1);
  const [selectList, setSelectList] = useState(false);

  const number = [1, 2, 3, 4];

  const checkInRef = useRef(null);
  const checkOutRef = useRef(null);

  const handleBookingRoom = () => {
    if (!isAuth) {
      toast(
        (t) => (
          <div className='flex-col items-center gap-5 font-semibold'>
            <div className='text-center text-sm text-accent'>로그인이 필요합니다.</div>
            <div className='text-lg text-primary'>로그인 하시겠습니까?</div>
            <div className='flex justify-between py-2'>
              <Button
                className='rounded-lg bg-primary px-5 py-2 text-white'
                onClick={() => {
                  toast.dismiss(t.id);
                  setTimeout(() => {
                    navigation('/signIn');
                  }, 1000);
                }}
              >
                예
              </Button>
              <Button
                className='rounded-lg bg-accent px-2 py-2 text-white'
                onClick={() => {
                  toast.dismiss();
                }}
              >
                아니오
              </Button>
            </div>
          </div>
        ),
        {
          duration: 2300,
        },
      );
      return;
    }

   

    const checkIn = checkInRef.current.value;
    const checkOut = checkOutRef.current.value;

    if (checkIn == '' || checkOut == '') {
      return toast.error('체크인 / 아웃 날짜를 선택해주세요');
    }

    if (isAuth) {
      setIsShowPayment(true);
    }
  };

  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0]; 

  const handlePayment = () => {
    const checkIn = checkInRef.current.value;
    const checkOut = checkOutRef.current.value;

    navigation(`/booking/${roomData.id}/${hotel}/${title}/${checkIn}/${checkOut}`);
  };

  const handleCart = async () => {
    const checkin = checkInRef.current.value;
    const checkout = checkOutRef.current.value;

    const cartData = {
      username: user.username,
      hotelTitle: title,
      hotelId: hotel,
      roomId: id,
      checkin,
      checkout,
      price: roomData.price,
    };

    const cart = await createCart(cartData);

    await updateUser(userId, {
      'cartHotel+': cart.id,
    });

    toast.success('장바구니에 담겼습니다.');
    queryClient.invalidateQueries(['users']);
  };

  const handleClosePayment = () => {
    setIsShowPayment(false);
  };

  if (roomLoading) {
    return <Spinner />;
  }

  return (
    <>
      <MetaTag title={title} description='숙소 상세정보' />
      <Header back='back' cart='cart' title={title} className='text-xl font-bold' />
      <section className=' mx-auto max-w-2xl px-4 pb-32'>
        <h3 className='sr-only'>{title}</h3>
        <Swiper
          modules={[Navigation, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          loop={true}
          a11y={true}
          scrollbar={{ draggable: true }}
        >
          <SwiperSlide>
            <img
              src={getPbImageURL(roomData, 'img')}
              alt={roomData.title}
              className='mx-auto'
              width='640'
              height='400'
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={getPbImageURL(roomData, 'img02')}
              alt={roomData.title}
              className='mx-auto'
              width='640'
              height='400'
            />
          </SwiperSlide>
        </Swiper>

        <div className='border-b-8 border-thirdary pb-4'>
          <p className='py-2 text-lg font-bold' key={roomData.id}>
            {roomData.title}
          </p>
          <span className='rounded bg-slate-100 px-2 py-1 font-semibold text-gray2'>
            {roomData.info}
          </span>
        </div>
        <div className='mt-2 flex justify-around py-2 font-bold shadow-md'>
          <div className='flex flex-col items-center'>
            <span className='text-primary'>체크인</span>
            <Input
              inputRef={checkInRef}
              label='체크인'
              type='date'
              id='checkin'
              className='font-semibold focus:outline-none'
              labelClass='sr-only'
              min={formattedDate}
            />
          </div>
          <div className='flex flex-col items-center'>
            <span className='text-accent'>체크아웃</span>
            <Input
              inputRef={checkOutRef}
              label='체크아웃'
              type='date'
              id='checkout'
              className='font-semibold focus:outline-none'
              labelClass='sr-only'
              min={formattedDate}
            />
          </div>
        </div>
        <div className='flex flex-col leading-8'>
          <p className='mt-4 text-right text-lg font-bold text-primary'>
            {numberWithComma(roomData.price)}원
          </p>
          <div className='flex justify-between'>
            <NumberOfPeople
              number={number}
              selectNumber={selectNumber}
              setSelectNumber={setSelectNumber}
              selectList={selectList}
              setSelectList={setSelectList}
              NumberBoxclassName='right-0 w-[4rem] text-center bg-white rounded-md shadow-md'
              NumberListClassName='text-[0.9rem] py-[0.5rem]'
            />
            <Button
              type='button'
              className='mt-4 h-8 w-52 rounded bg-primary font-bold text-white max-[420px]:w-32 '
              onClick={() => handleBookingRoom()}
            >
              숙소 예약하기
            </Button>
          </div>
        </div>

        <div className='my-5 border-y border-gray py-4 leading-7'>
          <p className='text-lg font-bold'>기본 정보</p>
          <p className='whitespace-pre-line text-gray3'>{roomData.desc}</p>
        </div>
        <div className='leading-7'>
          <p className='text-lg font-bold'>예약 안내</p>
          <p className='whitespace-pre-line text-gray3'>{roomData.notice}</p>
        </div>
      </section>

      <AnimatePresence>
        {isShowPayment && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3 }}
            className='fixed bottom-0 z-[100] flex w-full max-w-3xl flex-col gap-1 border-t-2 border-[#919191] bg-white px-5 py-4 font-bold'
          >
            <div className='flex justify-end'>
              <Button onClick={handleClosePayment} className='w-5 pb-2'>
                <img src='/close.svg' alt='닫기' />
              </Button>
            </div>
            <div className='flex items-center justify-between'>
              <span className='pl-1'>총</span>
              <span className='text-lg text-primary'>{numberWithComma(roomData.price)}원</span>
            </div>
            <span className='text-end text-[12px] text-[#919191]'>
              결제 단계에서 쿠폰 적용시 추가 할인 가능
            </span>
            <div className='flex justify-between gap-2 font-bold'>
              <Button
                className='w-[50%] rounded-[4px] border border-primary px-4 py-2 text-primary'
                onClick={handleCart}
              >
                장바구니 담기
              </Button>
              <Button
                className='w-[50%] rounded-[4px] border bg-primary px-4 py-2 text-white'
                onClick={handlePayment}
              >
                바로 예약하기
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Toaster
        toastOptions={{
          duration: 900,
          success: {
            style: {
              background: '#5D6FFF',
              color: 'white',
            },
          },
          error: {
            style: {
              background: '#E03B69',
              color: 'white',
            },
          },
        }}
        containerStyle={{
          top: 300,
        }}
      />
    </>
  );
}
export default HotelRoomDetailPage;
