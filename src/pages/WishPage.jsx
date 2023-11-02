import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { usePocketData } from '@/api/usePocketData';
import { toast, Toaster } from 'react-hot-toast';
import useAuthStore from '@/store/useAuthStore';
import Header from '@/components/Header';
import WishCart from '@/components/WishCart';
import Guest from '@/components/Guest';
import HotelInfoCategory from '@/components/HotelInfoCategory';
import WishList from '@/components/WishList';
import MetaTag from '@/components/MetaTag';

function WishPage() {
  const isAuth = useAuthStore((state) => state.isAuth);
  const user = useAuthStore((state) => state.user);
  const { getIdData, updateData: updateUser } = usePocketData('users');
  const [selectCategory, setSelectCategory] = useState('숙소');
  const info = ['숙소', '레저'];
  const queryClient = useQueryClient();
  const userId = user?.id;

  const { data } = useQuery(
    ['userWish', userId],
    () => getIdData(userId, { expand: 'wishHotel, wishLeisure' }),
    {
      refetchOnWindowFocus: false,
      enabled: !!userId,
    },
  );

  if (!isAuth) {
    return (
      <>
        <Header back='back' search='search' title='찜한 목록' className='text-xl font-semibold' />
        <section className='px-4'>
          <h3 className='sr-only'>찜한목록</h3>
          <HotelInfoCategory
            info={info}
            selectCategory={selectCategory}
            handleChangeCategory={setSelectCategory}
            className='text-xl'
          />
          <Guest />
        </section>
      </>
    );
  }

  const wishHotel = data?.expand?.wishHotel;
  const wishLeisure = data?.expand?.wishLeisure;

  const handleDeleteWish = async (itemId) => {
    const category = selectCategory === '숙소' ? 'Hotel' : 'Leisure';
    await updateUser(userId, {
      [`wish${category}-`]: itemId,
    });
    localStorage.removeItem(itemId);
    toast.error('찜 목록에서 해제하였습니다.');
    queryClient.invalidateQueries(['userWish']);
  };

  return (
    <>
      <MetaTag title='찜한목록' description='야무지개놀자 회원이 찜한 목록' />
      <Header back='back' cart='cart' className='text-xl font-semibold ' title='찜한 목록' />
      <HotelInfoCategory
        info={info}
        selectCategory={selectCategory}
        handleChangeCategory={setSelectCategory}
        className='text-xl'
      />
      <section className='pb-20'>
        {selectCategory === '숙소' && isAuth && !wishHotel && (
          <WishCart heart={true} hotel={true} link='hotel' />
        )}

        {selectCategory === '숙소' && (
          <WishList
            wish={true}
            data={wishHotel}
            link='hotel'
            handleDelete={handleDeleteWish}
            hotel={true}
            img='img'
          />
        )}

        {selectCategory === '레저' && isAuth && !wishLeisure && (
          <WishCart heart={true} leisure={true} link='leisure' />
        )}

        {selectCategory === '레저' && (
          <WishList
            wish={true}
            data={wishLeisure}
            link='leisureDetail'
            handleDelete={handleDeleteWish}
            img='thumbnail'
            buttonClass='absolute max-[375px]:bottom-8 bottom-12 right-4'
          />
        )}

        <Toaster
          toastOptions={{
            duration: 900,
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
export default WishPage;
