import { useState, useEffect } from 'react';
import { usePocketData } from '@/api/usePocketData';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { getPbImageURL } from '@/utils/getPbImageURL';
import { toast, Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Kakao2 } from '@/components/Kakao';
import Header from '@/components/Header';
import Spinner from '@/components/Spinner';
import HotelInfoCategory from '@/components/HotelInfoCategory';
import HotelRoomPage from '@/pages/HotelRoomPage';
import HotelIntro from '@/components/HotelIntro';
import HotelService from '@/components/HotelService';
import HotelReviewPage from '@/pages/HotelReviewPage';
import useAuthStore from '@/store/useAuthStore';
import Button from '@/components/Button';
import MetaTag from '@/components/MetaTag';
import useStorage from '@/Hook/useStorage';

function HotelDetailPage() {
  const { id } = useParams();
  const [selectCategory, setSelectCategory] = useState('숙소선택');
  const { getIdData: getHotel } = usePocketData('hotel');
  const { updateData: updateUser } = usePocketData('users');
  const isAuth = useAuthStore((state) => state.isAuth);
  const user = useAuthStore((state) => state.user);
  const { data: hotelData, isLoading } = useQuery(['hotel', id], () =>
    getHotel(id, { expand: 'room, review' }),
  );

  const [isShowMap, setIsShowMap] = useState(false);

  const info = ['숙소선택', '소개', '시설/서비스', '후기'];
  const roomData = hotelData?.expand?.room;
  const reviewData = hotelData?.expand?.review;
  const userId = user?.id;
  const admin = 'wo2jejtn6yi1wwu';

  const { storageData: isActive, update, remove } = useStorage(id, false);

  const handleWish = () => {
    update(!isActive);

    if (!isActive) {
      toast.success('찜 목록에 추가했습니다.');
      updateUser(userId, {
        'wishHotel+': id,
      });
    } else {
      toast.error('찜 목록에서 해제하였습니다.');
      updateUser(userId, {
        'wishHotel-': id,
      });
      remove(id);
    }
  };

  useEffect(() => {
    if (!isActive) {
      remove(id);
    }
  }, []);

  const handleShowMap = () => {
    setIsShowMap(!isShowMap);
  };

  const handleChangeCategory = (category) => {
    setSelectCategory(category);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <MetaTag title={hotelData.title} description='호텔 상세 설명 페이지' />
      <Header back='back' cart='cart' title={hotelData.title} className='text-xl font-bold' />
      <section className='relative'>
        <h2 className='sr-only'>호텔 상세 페이지</h2>
        <div className='flex justify-center'>
          <div>
            <figure>
              <img
                src={getPbImageURL(hotelData, 'img')}
                alt={hotelData.title}
                width='640'
                height='400'
              />
              <figcaption className='sr-only'>{hotelData.title}</figcaption>
            </figure>
            <div className='border-b-8 border-thirdary p-4'>
              <span className='text-sm font-semibold text-gray3'>{hotelData.grade}</span>
              <div className='flex justify-between'>
                <h3 className='text-2xl font-semibold max-[500px]:text-xl'>{hotelData.title}</h3>
                {isAuth && (
                  <Button type='button' onClick={handleWish}>
                    <img
                      src={isActive ? '/heartActive.svg' : '/hotel-heartBlack.svg'}
                      alt='찜'
                      className='h-7 w-7'
                    />
                  </Button>
                )}
              </div>
              <div className='flex items-center gap-1 text-primary'>
                <img src='/locationActive.svg' alt={hotelData.title} className='h-4 w-4' />
                <Button type='button' onClick={handleShowMap}>
                  {hotelData.location}
                </Button>
              </div>
              <div className='flex items-center gap-1 pt-1 text-sm text-gray2'>
                <img src='/star.svg' alt='평점' className='h-4 w-4' />
                <span>{hotelData.star}</span>
                <span>({hotelData.count})</span>
              </div>
              {admin === userId && (
                <div className='flex justify-end'>
                  <Link
                    to={`/hotel/edit/${hotelData.id}`}
                    className='font-bold text-accent border px-2 rounded-md'
                  >
                    호텔 정보 수정하기
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        <AnimatePresence>
          {isShowMap && (
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.5 }}
              className='fixed bottom-0 left-0 right-0 top-0 z-[100] flex items-center justify-center'
            >
              <div className='w-full max-w-2xl rounded-lg bg-white shadow-lg'>
                <Kakao2
                  data={hotelData}
                  latitude={hotelData.latitude}
                  longitude={hotelData.longitude}
                  className='mb-2 h-[50vh] w-auto max-w-3xl'
                />
                <Button type='button' onClick={handleShowMap} className='pl-2'>
                  <img src='/close.svg' alt='닫기' className='h-5 w-5' />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <HotelInfoCategory
          info={info}
          className='justify-between'
          selectCategory={selectCategory}
          handleChangeCategory={handleChangeCategory}
        />
        {selectCategory === '숙소선택' && (
          <HotelRoomPage data={roomData} hotelId={id} title={hotelData.title} />
        )}
        {selectCategory === '소개' && <HotelIntro intro={hotelData.intro} />}
        {selectCategory === '시설/서비스' && <HotelService />}
        {selectCategory === '후기' && (
          <HotelReviewPage
            star={hotelData.star}
            hotel={hotelData.title}
            hotelId={id}
            reviewData={reviewData}
          />
        )}
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
        />
      </section>
    </>
  );
}
export default HotelDetailPage;
