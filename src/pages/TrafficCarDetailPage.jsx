import { usePocketData } from '@/api/usePocketData';
import { getPbImageURL } from '@/utils/getPbImageURL';
import { numberWithComma } from '@/utils/numberWithComma';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/Header';
import LeisureInfoCategory from '@/components/LeisureInfoCategory';
import LeisureProduct from '@/components/LeisureProduct';
import LeisureProductInfo from '@/components/LeisureProductInfo';
import Spinner from '@/components/Spinner';
import CartController from '@/components/CartController';
function TrafficCarDetailPage() {
  let { id } = useParams();

  const { getIdData } = usePocketData('traffic');
  const { data, isLoading } = useQuery(['traffic', id], () => getIdData(id, { expand: 'product' }));

  const productData = data?.expand?.product;

  const [selectCategory, setSelectCategory] = useState('상품선택');

  if (isLoading) {
    return <Spinner />;
  }

  const handleChangeCategory = (category) => {
    setSelectCategory(category);
  };

  const { title, discount, price, brand } = data;
  const discountPrice = price * (100 - discount) * 0.01;

  return (
    <>
      <Header className='ml-10 text-xl font-semibold ' back='back' search='search' cart='cart' />
      <section className='pb-[140px]'>
        <img className='w-full' key={data.id} src={getPbImageURL(data, 'main')} alt={brand} />
        <div className='mx-5 my-4'>
          <div className='flex justify-between'>
            <span className='text-[20px] font-bold'>{title}</span>
            <div className='mt-1 flex gap-2'>
              <button className='h-[20px] w-[20px] bg-[url("/leisure-share.png")]'></button>
              <button className='h-[20px] w-[20px] bg-[url("/leisure-heart.png")]'></button>
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
              <span className='text-[#616161]'>구매 후 1개월 이내, 미사용시 자동 환불</span>
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
        <CartController />
      </section>
      <Toaster />
    </>
  );
}

export default TrafficCarDetailPage;
