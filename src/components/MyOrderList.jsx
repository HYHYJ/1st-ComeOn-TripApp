import { Link } from 'react-router-dom';

function MyOrderList({ src, alt, name, info, info2, info3, info4, to, ...restProps }) {
  return (
    <Link
      to={to}
      className=' flex w-full items-center overflow-hidden rounded-2xl border-[1px] border-transparent p-1 align-middle shadow-md hover:border-primary'
      {...restProps}
    >
      <div className='mr-3 box-border aspect-square  h-16  w-16 flex-shrink-0 overflow-hidden rounded-2xl  bg-slate-100 md:h-24 md:w-24'>
        <img src={src} alt={alt} className=' aspect-square h-full w-full' />
      </div>
      <div className='flex-col gap-0 align-middle leading-[1rem] md:text-lg'>
        <div>{name}</div>
        <div className='text-xs font-thin leading-[1rem] md:text-base'>{info}</div>
        <div className='text-xs font-thin leading-[1rem]  md:text-base'>
          {info2}~{info3}
        </div>
        <div className='text-xs font-bold leading-[1rem]  md:text-base'>총 {info4} ₩</div>
      </div>
    </Link>
  );
}
export default MyOrderList;
