import { useState } from 'react';
import { usePocketData } from '@/api/usePocketData';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getPbImageURL } from '@/utils/getPbImageURL';
import Header from '@/components/Header';
import Spinner from '@/components/Spinner';
import HotelInfoCategory from '@/components/HotelInfoCategory';
import HotelRoom from '@/components/HotelRoom';
import HotelIntro from '@/components/HotelIntro';
import HotelService from '@/components/HotelService';
import HotelReview from '@/components/HotelReview';
import useStorage from '@/Hook/useStorage';
import Button from '@/components/Button';
import toast from 'react-hot-toast';

function HotelDetailPage() {
  const { id } = useParams();
  const [selectCategory, setSelectCategory] = useState('객실선택');
  const { getIdData: getHotel } = usePocketData('hotel');
  const { updateData: updateUser } = usePocketData('users');
  const { storageData: authUser } = useStorage('pocketbase_auth');

  const { data: hotelData, isLoading } = useQuery(['hotel', id], () =>
    getHotel(id, { expand: 'room, review' }),
  );

  const info = ['객실선택', '소개', '시설/서비스', '후기'];
  const roomData = hotelData?.expand?.room;
  const reviewData = hotelData?.expand?.review;

  const [isActive, setIsactive] = useState(false);

  const handleWish = () => {
    const userId = authUser?.model?.id;
    setIsactive(!isActive);

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
    }
  };

  const handleChangeCategory = (category) => {
    setSelectCategory(category);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Helmet>
        <title>{hotelData.title}</title>
      </Helmet>
      <Header back='back' home='home' cart='cart' />
      <section className='relative'>
        <h2 className='sr-only'>호텔 상세 페이지</h2>
        <div className='flex justify-center'>
          <div>
            <figure>
              <img
                src={getPbImageURL(hotelData, 'img')}
                alt={hotelData.title}
                className='w-full max-w-[39rem]'
              />
            </figure>
            <div className='border-b-8 border-thirdary p-4'>
              <span className='text-sm font-semibold text-gray3'>{hotelData.grade}</span>
              <div className='flex justify-between'>
                <h3 className='text-2xl font-semibold max-[500px]:text-xl'>{hotelData.title}</h3>
                <Button>
                  <img
                    src={isActive ? '/heartActive.svg' : '/hotel-heartBlack.svg'}
                    alt='찜'
                    className='h-7 w-7 cursor-pointer'
                    onClick={handleWish}
                  />
                </Button>
              </div>
              <div className='flex items-center gap-1 text-primary'>
                <img src='/locationActive.svg' alt={hotelData.title} className='h-4 w-4' />
                {hotelData.location}
              </div>
              <div className='flex items-center gap-1 pt-1 text-sm text-gray2'>
                <img src='/star.svg' alt='평점' className='h-4 w-4' />
                <span>{hotelData.star}</span>
                <span>({hotelData.count})</span>
              </div>
            </div>
          </div>
        </div>
        <HotelInfoCategory
          info={info}
          className='justify-between'
          selectCategory={selectCategory}
          handleChangeCategory={handleChangeCategory}
        />
        {selectCategory === '객실선택' && <HotelRoom data={roomData} />}
        {selectCategory === '소개' && <HotelIntro intro={hotelData.intro} />}
        {selectCategory === '시설/서비스' && <HotelService />}
        {selectCategory === '후기' && (
          <HotelReview
            star={hotelData.star}
            hotel={hotelData.title}
            hotelId={id}
            reviewData={reviewData}
          />
        )}
      </section>
    </>
  );
}
export default HotelDetailPage;
