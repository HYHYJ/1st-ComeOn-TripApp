import { useState } from 'react';
import { usePocketData } from '@/api/usePocketData';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast, Toaster } from 'react-hot-toast';
import Header from '@/components/Header';
import useAuthStore from '@/store/useAuthStore';
import Spinner from '@/components/Spinner';
import WishCart from '@/components/WishCart';
import Input from '@/components/Input';
import Guest from '@/components/Guest';
import HotelInfoCategory from '@/components/HotelInfoCategory';
import WishList from '@/components/WishList';
import MetaTag from '@/components/MetaTag';

function CartPage() {
  const isAuth = useAuthStore((state) => state.isAuth);
  const user = useAuthStore((state) => state.user);

  const { getIdData, updateData: updateUser } = usePocketData('users');
  const { deleteData: deleteCart } = usePocketData('order');

  const [selectCartItem, setSelectCartItem] = useState([]);
  const [selectCategory, setSelectCategory] = useState('숙소');
  const tag = ['숙소', '레저'];

  const userId = user?.id;

  const { data, isLoading } = useQuery(
    ['userCart', userId],
    () => getIdData(userId, { expand: 'orderHotel, cartHotel, cartLeisure' }),
    {},
  );

  const queryClient = useQueryClient();

  const cartHotel = data?.expand?.cartHotel;
  const cartLeisure = data?.expand?.cartLeisure;

  if (!isAuth) {
    return (
      <>
        <Header back='back' search='search' title='장바구니' className='text-xl font-semibold' />
        <section className='px-4'>
          <h3 className='sr-only'>장바구니</h3>
          <HotelInfoCategory
            info={tag}
            selectCategory={selectCategory}
            handleChangeCategory={setSelectCategory}
            className='text-xl'
          />
          <Guest />
        </section>
      </>
    );
  }

  const handleDeleteCart = async (itemId) => {
    const category = selectCategory === '숙소' ? 'Hotel' : 'Leisure';

    await updateUser(userId, {
      [`cart${category}-`]: itemId,
    });

    if (selectCategory === '숙소') {
      await deleteCart(itemId);
    }

    toast.error('장바구니에서 삭제하였습니다.');
    queryClient.invalidateQueries(['userCart']);
  };

  const handleAllAgree = () => {
    const checkbox = document.querySelectorAll('.checkbox');
    const allChecked = checkbox[0].checked;
    const selectedId = [];

    checkbox.forEach((checkbox) => {
      if (checkbox.id !== 'all') {
        checkbox.checked = allChecked;
        if (allChecked) {
          selectedId.push(checkbox.id);
        }
      }
    });
    setSelectCartItem(selectedId);
  };

  const handleCheckbox = (itemId) => {
    const selectedItems = [...selectCartItem];
    const index = selectedItems.indexOf(itemId);

    if (index === -1) {
      selectedItems.push(itemId);
    } else {
      selectedItems.splice(index, 1);
    }

    setSelectCartItem(selectedItems);
  };

  const cartTotalPrice = () => {
    let totalPrice = 0;

    if (cartHotel) {
      for (const itemId of selectCartItem) {
        const selectedHotel = cartHotel.find((item) => item.id === itemId);
        if (selectedHotel) {
          totalPrice += Number(selectedHotel.price);
        }
      }
    }

    if (cartLeisure) {
      for (const itemId of selectCartItem) {
        const selectedLeisure = cartLeisure.find((item) => item.id === itemId);
        if (selectedLeisure) {
          totalPrice += Number(selectedLeisure.price);
        }
      }
    }

    return totalPrice;
  };

  const totalCartPrice = cartTotalPrice();

  const handleBooked = async () => {
    if (selectCartItem.length === 0) {
      return toast.error('항목을 선택해 주세요');
    }

    const category = selectCategory === '숙소' ? 'Hotel' : 'Leisure';

    for (const itemId of selectCartItem) {
      await updateUser(userId, {
        [`order${category}+`]: itemId,
      });

      await updateUser(userId, {
        [`cart${category}-`]: itemId,
      });
    }

    toast.success('결제가 완료되었습니다.');
    queryClient.invalidateQueries(['userCart']);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <MetaTag title='장바구니' description='호텔,레저 장바구니 페이지' />
      <Header back='back' search='search' title='장바구니' className='text-xl font-semibold' />
      <section className='mx-auto pb-40'>
        <h3 className='sr-only'>장바구니</h3>
        <HotelInfoCategory
          info={tag}
          selectCategory={selectCategory}
          handleChangeCategory={setSelectCategory}
          className='text-xl'
        />
        <div className='mx-auto flex max-w-[39rem] justify-between gap-2 border-b border-gray p-5 font-semibold'>
          <div className='flex items-center gap-2 max-[412px]:px-2'>
            <Input
              type='checkbox'
              id='all'
              label='전체 선택'
              className='checkbox h-5 w-5'
              labelClass='cursor-pointer text-lg font-semibold '
              onClick={handleAllAgree}
            />
          </div>
        </div>

        {selectCategory === '숙소' && isAuth && !cartHotel && <WishCart cart={true} link='' />}

        {selectCategory === '숙소' && isAuth && cartHotel && (
          <>
            {cartHotel?.map((item) => {
              return (
                <WishList
                  key={item.id}
                  cart={true}
                  data={[item]}
                  handleDelete={() => handleDeleteCart(item.id)}
                  cartImg='img'
                  cartHotel={true}
                  handleCheckbox={() => handleCheckbox(item.id)}
                  totalCartPrice={totalCartPrice}
                  handleBooked={handleBooked}
                />
              );
            })}
          </>
        )}

        {selectCategory === '레저' && isAuth && !cartLeisure && <WishCart cart={true} link='' />}

        {selectCategory === '레저' && isAuth && cartLeisure && (
          <>
            {cartLeisure?.map((item) => {
              return (
                <WishList
                  key={item.id}
                  cart={true}
                  leisure={true}
                  data={[item]}
                  handleDelete={() => handleDeleteCart(item.id)}
                  handleCheckbox={() => handleCheckbox(item.id)}
                  totalCartPrice={totalCartPrice}
                  handleBooked={handleBooked}
                />
              );
            })}
          </>
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
export default CartPage;
