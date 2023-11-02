import { useState } from 'react';
import { Link } from 'react-router-dom';

function MyList({
  src = '/Myzipedairplane.jpg',
  alt,
  title,
  flexbetween,
  children,
  second,
  third,
  date,
  handler,
  className0 = 'justify-between',
  className1,
  className2,
  className3,
  link,
  ...restProps
}) {
  const [isActive, setIsActive] = useState('');

  const handleIsActive = (name) => {
    setIsActive(name);
  };

  return (
    <li
      className='min-h-170 relative my-4 box-border  rounded-2xl border-[1px] border-transparent bg-white p-2  hover:border-primary hover:shadow-md '
      {...restProps}
      onMouseOver={() => handleIsActive({ handler })}
      onMouseLeave={() => handleIsActive('')}
    >
      <div className={flexbetween}>
        {children}
        <div className='mx-1 mb-3 box-border h-3 text-right text-xs'>{date}</div>
      </div>
      <Link to={link}>
        <div className='box-border flex overflow-hidden sm:mr-8'>
          <div className='mr-3 box-border aspect-square  h-20  w-20 flex-shrink-0 overflow-hidden rounded-2xl  bg-slate-100 sm:h-32 sm:w-32 md:h-32 md:w-32 lg:h-36 lg:w-36 xl:h-36 xl:w-36'>
            <img src={src} alt={alt} className=' aspect-square h-full w-full' />
          </div>
          <ul
            className={`box-border flex flex-col gap-0 overflow-hidden text-ellipsis sm:py-3 ${className0}`}
          >
            <li
              className={` text-md box-border overflow-hidden text-ellipsis whitespace-nowrap font-bold sm:text-lg  ${className1}`}
            >
              {title}
            </li>
            <li
              className={`box-border touch-none overflow-hidden text-ellipsis break-words  ${className2} `}
            >
              {second}
            </li>
            <li className={`overflow-hidden overflow-ellipsis whitespace-nowrap ${className3}`}>
              {third}
            </li>
          </ul>
          <div className='text-right sm:mt-10 lg:mt-12'>
            <img
              src='/myBlueArrow.svg'
              className={`absolute right-2 w-5 opacity-0 
            ${isActive ? 'sm:opacity-100' : ''}`}
              alt='상세보기'
            />
          </div>
        </div>
      </Link>
    </li>
  );
}
export default MyList;
