import { usePocketData } from '@/api/usePocketData';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { numberWithComma } from '@/utils/numberWithComma';
import { getPbImageURL } from '@/utils/getPbImageURL';
import { toast, Toaster } from 'react-hot-toast';
import useAuthStore from '@/store/useAuthStore';
import Header from '@/components/Header';
import Button from '@/components/Button';
import Spinner from '@/components/Spinner';
import MetaTag from '@/components/MetaTag';

function HotelBookingPage() {
  const { id, hotel, title, checkin, checkout } = useParams();
  const { getIdData } = usePocketData('room');
  const { createData: createOrder } = usePocketData('order');
  const { updateData: updateUser } = usePocketData('users');
  const { data: roomData, isLoading } = useQuery(['room', id], () => getIdData(id));

  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const userId = user.id;

  const handlePayment = () => {
    const orderData = {
      username: user.username,
      hotelTitle: title,
      hotelId: hotel,
      roomId: id,
      checkin,
      checkout,
      price: roomData.price,
    };

    toast((t) => (
      <div className='flex-col items-center gap-5'>
        <span className='text-lg'>결제 하시겠습니까?</span>
        <div className='flex gap-10 pt-2'>
          <Button
            type='submit'
            className='rounded-lg bg-primary px-5 py-2 text-white'
            onClick={async () => {
              toast.dismiss(t.id);
              const order = await createOrder(orderData);
              updateUser(userId, {
                'orderHotel+': order.id,
              });
              toast.success('결제가 완료되었습니다.');
              setTimeout(() => {
                toast.dismiss();
                navigate('/');
              }, 1000);
            }}
          >
            예
          </Button>
          <Button
            type='button'
            className='rounded-lg bg-accent px-1 py-2 text-white'
            onClick={() => toast.dismiss(t.id)}
          >
            아니오
          </Button>
        </div>
      </div>
    ));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <MetaTag title={`${title} 예약`} description='호텔/리조트 숙소 예약하는 페이지' />
      <Header back='back' className='mr-7 text-xl font-semibold' title='예약' />
      <section className='px-4 pb-20'>
        <h2 className='mx-auto flex max-w-[39rem] justify-center border-b border-gray px-4 pt-2 text-xl font-bold'>
          {title}
        </h2>
        <article key={roomData.id} className='flex justify-center pt-3'>
          <div>
            <figure>
              <img
                src={getPbImageURL(roomData, 'img')}
                alt={roomData.title}
                width='640'
                height='400'
              />
              <figcaption className='sr-only'>{roomData.title}</figcaption>
            </figure>
            <h3 className=' pb-4 pt-1 text-xl font-bold'>{roomData.title}</h3>
            <p className='mb-5 rounded bg-slate-100 px-2 py-1 font-semibold text-gray2'>
              {roomData.info}
            </p>
            <div className='flex justify-between border-b border-gray pb-2 font-semibold'>
              <div>
                <p>체크인</p>
                <p>{checkin}</p>
                <p>15:00</p>
              </div>
              <div>
                <p>체크아웃</p>
                <p>{checkout}</p>
                <p>11:00</p>
              </div>
            </div>
            <div className='flex justify-between py-8 text-xl font-bold'>
              <p>총 결제 금액</p>
              <p className='text-accent'>{numberWithComma(roomData.price)}원</p>
            </div>
            <Button
              type='submit'
              className='h-10 w-full rounded-md border text-primary hover:bg-primary hover:text-white'
              onClick={handlePayment}
            >
              결제하기
            </Button>
          </div>
        </article>

        <Toaster
          toastOptions={{
            duration: 1500,
            success: {
              style: {
                background: '#5D6FFF',
                color: 'white',
              },
            },
          }}
          containerStyle={{
            top: 300,
          }}
        />
      </section>
    </>
  );
}
export default HotelBookingPage;
