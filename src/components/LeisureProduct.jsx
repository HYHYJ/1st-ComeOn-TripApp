import { numberWithComma } from '@/utils/numberWithComma';
import LeisureButton from './LeisureButton';


function LeisureProduct({ data, productData }) {
 
  return (
    <section className='mx-5'>
      <div className='my-3 flex justify-center rounded-[4px] bg-[#fef8f2] py-2'>
        <img src='/leisure-infoOrange.png' alt='' />
        <span className='text-[12px] font-bold text-[#e67000]'>
          로그인 회원만 구매 가능한 상품입니다
        </span>
      </div>
      <span className='text-[18px] font-bold'>{data.title}</span>
      {productData.map((item) => (
        <div
          key={item.id}
          className='mt-3 flex flex-col gap-2 rounded-[4px] border border-[#cccccc] p-4'
        >
          <span className='font-bold'>{item.title}</span>
          <div className='flex flex-wrap'>
            {item.label.map((label) => (
              <span
                key={label}
                className='mr-1 mt-1 rounded-[2px] border-[1px] border-[#e6e6e6] bg-[#f2f2f2] px-1 py-[2px] text-[10px]'
              >
                {label}
              </span>
            ))}
          </div>
          <div className='flex items-center justify-between'>
            <LeisureButton item={item} />
            <div className='flex flex-col text-end'>
              <span className='text-[12px] font-bold text-accent'>
                {item.discount}%
                <span className='ml-1 font-normal text-[#919191] line-through'>
                  {numberWithComma(item.price)}원
                </span>
              </span>
              <span className='text-[18px] font-bold'>
                {numberWithComma(item.price * (100 - item.discount) * 0.01)}원
              </span>
            </div>
          </div>
        </div>
      ))}
      {/* {isShow && <div>0이상</div>} */}
    </section>
  );
}

export default LeisureProduct;
