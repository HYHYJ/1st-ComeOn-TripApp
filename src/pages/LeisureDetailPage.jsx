import { usePocketData } from '@/api/usePocketData';
import { getPbImageURL } from '@/utils/getPbImageURL';
import { numberWithComma } from '@/utils/numberWithComma';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import Header from '@/components/Header';
import LeisureInfoCategory from '@/components/LeisureInfoCategory';
import LeisureProduct from '@/components/LeisureProduct';
import LeisureProductInfo from '@/components/LeisureProductInfo';
import Spinner from '@/components/Spinner';
import useAuthStore from '@/store/useAuthStore';
import Button from '@/components/Button';
import CartController from '@/components/CartController';
import useStorage from '@/Hook/useStorage';

function LeisureDetailPage() {
  const { id } = useParams();

  const [selectCategory, setSelectCategory] = useState('상품선택');
  const { storageData: isActive, update, remove } = useStorage(id, false);

  const { getIdData } = usePocketData('leisure');
  const { data, isLoading } = useQuery(['leisure', id], () => getIdData(id, { expand: 'product' }));
  const { updateData: updateUser } = usePocketData('users');

  useEffect(() => {
    if (!isActive) {
      remove(id);
    }
  }, []);

  // const carts = useStore((state) => state.carts);
  const productData = data?.expand?.product;

  const isAuth = useAuthStore((state) => state.isAuth);
  const user = useAuthStore((state) => state.user);
  const userId = user.id;

  // const queryClient = useQueryClient();

  const handleChangeCategory = (category) => {
    setSelectCategory(category);
  };

  if (isLoading) {
    return <Spinner />;
  }
  const { title, discount, price, brand } = data;
  const discountPrice = price * (100 - discount) * 0.01;

  const handleWish = () => {
    update(!isActive);

    if (!isActive) {
      toast.success('찜 목록에 추가했습니다.');
      updateUser(userId, {
        'wishLeisure+': id,
      });
    } else {
      toast.error('찜 목록에서 해제하였습니다.');
      updateUser(userId, {
        'wishLeisure-': id,
      });
      remove(id);
    }
  };

  return (
    <>
      <Header className='ml-10 text-xl font-semibold ' back='back' search='search' cart='cart' />
      <section className='pb-[140px]'>
        <img className='w-full' key={data.id} src={getPbImageURL(data, 'main')} alt={brand} />
        <div className='mx-5 my-4'>
          <div className='flex justify-between'>
            <span className='text-[20px] font-bold'>{title}</span>
            <div className='mt-1 flex gap-2'>
              {isAuth && (
                <Button type='button' onClick={handleWish}>
                  <img
                    src={isActive ? '/heartActive.svg' : '/hotel-heartBlack.svg'}
                    alt='찜'
                    className='h-7 w-7 cursor-pointer'
                  />
                </Button>
              )}
            </div>
          </div>
          <div className='my-3 flex flex-col'>
            <span className='text-[12px] font-bold text-accent'>
              {discount}%
              <span className='pl-1 font-normal text-[#919191] line-through'>
                {numberWithComma(price)}원
              </span>
            </span>
            <span className='text-[18px] font-bold'>{numberWithComma(discountPrice)}원 부터~</span>
          </div>
          <span className='font-bold'>상품 소개</span>
          <div className='my-3 rounded-[4px] border border-[#e6e6e6] p-4'>
            <div className='mb-3 flex gap-2 text-[12px]'>
              <img src='/leisure-time.png' alt='' />
              <span className='font-bold'>당일사용</span>
              <span className='text-[#616161]'>당일 사용 가능</span>
            </div>
            <div className='mb-3 flex gap-2 text-[12px]'>
              <img src='/leisure-info.png' alt='' />
              <span className='font-bold'>이용방법</span>
              <span className='text-[#616161]'>QR/바코드 확인 후 입장</span>
            </div>
            <div className='flex gap-2 text-[12px]'>
              <img src='/leisure-calendar.png' alt='' />
              <span className='font-bold'>유효기간</span>
              <span className='text-[#616161]'>~ 2024.02.09</span>
            </div>
          </div>
          <img
            src={getPbImageURL(data, 'detail')}
            alt=''
            className='w-full rounded-[4px] border-none'
          />
        </div>

        <div className='h-2 w-full bg-slate-300'></div>

        <LeisureInfoCategory
          selectCategory={selectCategory}
          handleChangeCategory={handleChangeCategory}
        />

        {selectCategory === '상품선택' && <LeisureProduct data={data} productData={productData} />}
        {selectCategory === '이용안내' && <LeisureProductInfo data={data} />}
        <CartController userId={userId} id={id} />
      </section>
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
    </>
  );
}

export default LeisureDetailPage;
