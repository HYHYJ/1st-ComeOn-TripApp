import { useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import { usePocketData } from '@/api/usePocketData';
import { getPbImageURL } from '@/utils/getPbImageURL';
import Guest from '@/components/Guest';
import Header from '@/components/Header';
import MyList from '@/components/MyList';
import Spinner from '@/components/Spinner';
import MetaTag from '@/components/MetaTag';
import useAuthStore from '../store/useAuthStore';
import MyCircleProfile from '@/components/MyCircleProfile';

function MyReviewPage() {
  const isAuth = useAuthStore((state) => state.isAuth);
  const user = useAuthStore((state) => state.user);
  const id = user?.id;
  const { getListData: getHotel } = usePocketData('hotel');
  const { getIdData: getUser } = usePocketData('users');
  const { data: userData, isLoading } = useQuery(['users', id], () =>
    getUser(id, { expand: 'review' }),
  );
  const { data: hotelData, isLoading: hotelLoading } = useQuery(['hotel'], getHotel);
  const reviewData = userData?.expand?.review;

  useEffect(() => {
    if (!reviewData || reviewData.length === 0) {
      toast('❌ 작성된 리뷰가 없습니다.');
    } else {
      toast.success('리뷰 데이터 로드 성공');
    }
  }, [reviewData]);

  if (isLoading || hotelLoading) {
    return <Spinner />;
  }

  return (
    <>
      <MetaTag title='나의 후기' description='나의 후기' />
      <Header
        search='search'
        back='back'
        cart='cart'
        title='나의 후기'
        className='ml-10 text-xl font-semibold'
      ></Header>
      {!isAuth && <Guest></Guest>}
      {isAuth && (
        <>
          <MyCircleProfile
            towhere='/mypage'
            imgpath='/ad.png'
            imgalt='프로필사진'
          ></MyCircleProfile>

          <section className='flex justify-center pb-20'>
            <ul className='box-border h-auto w-2/3 rounded-2xl bg-lightPurple px-3 pb-1 pt-4 text-sm'>
              <li className=' flex flex-row items-center justify-between pb-3  text-primary'>
                <div className='font-semibold'>나의 후기 ({reviewData?.length || '0'})</div>
              </li>
              {reviewData &&
                reviewData.length > 0 &&
                [...reviewData]
                  .sort((a, b) => new Date(b.created) - new Date(a.created))
                  .map((item) => {
                    const correspondingHotel = hotelData
                      ? hotelData.find((hotel) => hotel.title === item.title)
                      : null;

                    return (
                      <MyList
                        link={`/hotel/${correspondingHotel.id}`}
                        handler=''
                        alt={item.title}
                        key={item.id}
                        date={item.created.slice(0, 10)}
                        title={correspondingHotel?.title || item.title}
                        src={
                          correspondingHotel ? getPbImageURL(correspondingHotel, 'img') : undefined
                        }
                        second={item.review}
                        third='별점'
                        className2='text-sm line-clamp-2 h-[35px] sm:line-clamp-3 sm:h-[60px] sm:text-sm'
                        className3='text-sm font-semibold sm:text-md'
                      ></MyList>
                    );
                  })}
            </ul>
            <Toaster
              toastOptions={{
                duration: 1000,
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
      )}
    </>
  );
}
export default MyReviewPage;
