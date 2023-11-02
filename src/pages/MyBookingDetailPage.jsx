import { useEffect } from 'react';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import { usePocketData } from '@/api/usePocketData';
import { getPbImageURL } from '@/utils/getPbImageURL';
import { useParams } from 'react-router-dom';
import Guest from '@/components/Guest';
import Button from '@/components/Button';
import Header from '@/components/Header';
import MetaTag from '@/components/MetaTag';
import Spinner from '@/components/Spinner';
import useAuthStore from '@/store/useAuthStore';
import MyOrderList from '@/components/MyOrderList';
import { numberWithComma } from '@/utils/numberWithComma';

function MyBookingDetailPage() {
  const isAuth = useAuthStore((state) => state.isAuth);
  const user = useAuthStore((state) => state.user);
  const { date } = useParams();
  const { getIdData: getUser } = usePocketData('users');
  const { getListData: getHotelList } = usePocketData('hotel');
  const { getListData: getOrderList } = usePocketData('order');
  const { getListData: getRoomList } = usePocketData('room');
  const { getIdData: getOrder } = usePocketData('order');
  const [orders, setOrders] = useState([]);
  const id = user?.id;
  const { data: userData, isLoading } = useQuery(['users', id], () => getUser(id));

  const { data: orderData, isLoading: isOrderDataLoading } = useQuery(['order'], getOrderList);

  const { data: hotelData, isLoading: isHotelDataLoading } = useQuery(['hotel'], getHotelList);

  const { data: roomData, isLoading: isRoomDataLoading } = useQuery(['room'], getRoomList);

  let matchingOrderIds;

  useEffect(() => {
    const fetchOrders = async () => {
      const fetchedOrders = await Promise.all(matchingOrderIds.map((orderId) => getOrder(orderId)));
      setOrders(fetchedOrders);
    };

    if (matchingOrderIds) {
      fetchOrders();
    }
  }, [matchingOrderIds]);
  if (isLoading || isOrderDataLoading || isRoomDataLoading || isHotelDataLoading) {
    return <Spinner />;
  }

  if (orderData) {
    matchingOrderIds = orderData
      .filter((order) => order.username === userData.username)
      .map((order) => order.id);
  }

  let userOrders = orderData
    ? orderData.filter((order) => order.username === userData.username)
    : [];

  let groupedUserOrders = userOrders.reduce((grouped, order) => {
    let date = order.created.slice(0, 10);

    if (!grouped[date]) {
      grouped[date] = [];
    }

    grouped[date].push(order);

    return grouped;
  }, {});

  const totalPrice = groupedUserOrders[date]?.reduce((total, order) => total + order.price, 0);

  return (
    <>
      <MetaTag title='예약 상세' description='예약 상세' />
      <Header
        search='search'
        back='back'
        cart='cart'
        title='예약 상세'
        className='ml-10 text-xl font-semibold'
      ></Header>
      {!isAuth && <Guest></Guest>}
      {isAuth && (
        <>
          <section
            className='mx-auto mb-20 mt-0 w-[90%]
      flex-col rounded-3xl border-[1px] border-slate-300 p-6 text-sm shadow-lg sm:max-w-[500px] sm:text-base'
          >
            <article className='flex-shrink flex-grow whitespace-normal break-keep  border-b-[1px] border-slate-300 pb-2  text-center text-sm font-semibold sm:text-base'>
              <span className=' text-primary'>{user.username}</span>님의
              <span className='text-primary'>{date} </span>결제 내역
            </article>

            <ul className='flex w-full  flex-shrink flex-grow flex-col  items-center'>
              <li className='w-full max-w-md flex-row px-2 py-4'>
                <div className='flex w-full flex-shrink-0 flex-grow-0 flex-row flex-wrap justify-between gap-y-2 '>
                  {groupedUserOrders[date]?.map((order) => {
                    const hotelItem = hotelData.find((hotel) => hotel.id === order.hotelId);
                    const roomItem = roomData.find((room) => room.id === order.roomId);

                    return (
                      <MyOrderList
                        to={`/hotel/${hotelItem.id}`}
                        key={order.id}
                        name={hotelItem.title}
                        info={roomItem.title}
                        info2={order.checkin.slice(0, 10)}
                        info3={order.checkout.slice(5, 10)}
                        src={getPbImageURL(hotelItem, 'img')}
                        info4={` ${numberWithComma(order.price)}`}
                      />
                    );
                  })}
                </div>
              </li>
              <li
                className='w-full border-b-[1px] border-t-[1px] 
              border-slate-300 px-8 py-3 md:px-12 md:py-8'
              >
                <div className='flex justify-between font-bold '>
                  <div className='text'>총금액</div>
                  <p>{` ${numberWithComma(totalPrice)}`} ￦</p>
                </div>
              </li>

              <Button
                type='submit'
                className={`mb-18 w-full max-w-md rounded-lg border py-2 text-center font-light text-primary outline-primary `}
              >
                <div className='flex items-end justify-center'>
                  <p className='text-xs font-light text-slate-400'></p>환불하기
                </div>
              </Button>
              <div role='alert' aria-live='assertive' aria-atomic='true' className='sr-only'></div>
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
export default MyBookingDetailPage;
