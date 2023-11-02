import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { usePocketData } from '@/api/usePocketData';
import { getPbImageURL } from '@/utils/getPbImageURL';
import { numberWithComma } from '@/utils/numberWithComma';
import Guest from '@/components/Guest';
import Header from '@/components/Header';
import MyList from '@/components/MyList';
import Spinner from '@/components/Spinner';
import MetaTag from '@/components/MetaTag';
import useAuthStore from '@/store/useAuthStore';
import MyCircleProfile from '@/components/MyCircleProfile';

function MyBookingPage() {
  const isAuth = useAuthStore((state) => state.isAuth);
  const user = useAuthStore((state) => state.user);
  const { getIdData: getUser } = usePocketData('users');
  const { getListData: getHotelList } = usePocketData('hotel');
  const { getListData: getOrderList } = usePocketData('order');
  const { getIdData: getOrder } = usePocketData('order');
  const [orders, setOrders] = useState([]);

  const id = user?.id;
  const { data: userData, isLoading } = useQuery(['users', id], () => getUser(id));

  const { data: orderData, isLoading: isOrderDataLoading } = useQuery(['order'], getOrderList);

  const { data: hotelData, isLoading: isHotelDataLoading } = useQuery(['hotel'], getHotelList);

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

  if (isLoading || isOrderDataLoading || isHotelDataLoading) {
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

  let dates = Object.keys(groupedUserOrders);
  let firstOrders = dates.map((date) => groupedUserOrders[date][0]);

  return (
    <>
      <MetaTag title='나의 예약' description='예약 내역' />
      <Header
        search='search'
        back='back'
        cart='cart'
        title='나의 예약'
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
            <ul className='box-border h-auto w-2/3 rounded-2xl bg-lightPurple px-3 pt-4 text-sm'>
              <li className=' flex flex-row items-center justify-between pb-3   text-primary'>
                <div className='font-semibold'>예약 내역 ({firstOrders.length})</div>
              </li>

              {firstOrders.map((order) => {
                const totalAmount = groupedUserOrders[order.created.slice(0, 10)].reduce(
                  (sum, order) => sum + order.price,
                  0,
                );
                const hotelItem = hotelData.find((hotel) => hotel.id === order.hotelId);
                const hotelLocation = hotelItem?.location;

                return (
                  <MyList
                    key={order.id}
                    link={`/MyBookingDetailPage/${order.created.slice(0, 10)}`}
                    handler=''
                    title={
                      `${order.hotelTitle}` +
                      (groupedUserOrders[order.created.slice(0, 10)].length > 1
                        ? ` 외 ${groupedUserOrders[order.created.slice(0, 10)].length - 1}`
                        : '')
                    }
                    src={getPbImageURL(hotelItem, 'img')}
                    flexbetween='flex justify-between'
                    second={`위치: ${hotelLocation || '정보 없음'}`}
                    third={`총 결제금액: ${numberWithComma(totalAmount)}`}
                    date={order.created.slice(0, 10)}
                    className2='text-md font-semibold h-[20px] sm:h-[30px] sm:text-md'
                    className3='text-md font-bold sm:text-md'
                  >
                    <div className='h-4 w-20 rounded-full border-transparent text-center text-xs text-black'></div>
                  </MyList>
                );
              })}
            </ul>
          </section>
        </>
      )}
    </>
  );
}
export default MyBookingPage;
