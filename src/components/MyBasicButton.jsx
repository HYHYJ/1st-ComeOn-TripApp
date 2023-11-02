import { Link } from 'react-router-dom';

function MyBasicButton({ towhere, type, onClick, children, ...restProps }) {
  return (
    <Link
      to={towhere}
      type={type}
      aria-label={children}
      className={`mb-2 flex h-9 w-52 items-center justify-center rounded-full border-[1px] border-primary align-middle text-sm font-semibold text-primary shadow-md hover:bg-primary hover:font-bold hover:text-white md:h-11 md:w-60 md:text-base`}
      onClick={onClick}
      {...restProps}
    >
      {children}
    </Link>
  );
}

export default MyBasicButton;
