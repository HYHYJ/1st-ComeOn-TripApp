import { NavLink } from 'react-router-dom';
import { useState } from 'react';

function Navigation() {
  const [isActive, setIsActive] = useState('');

  const handleIsActive = (name) => {
    setIsActive(name);
  };

  return (
    <nav className='fixed bottom-0 z-50 flex h-14 w-full max-w-3xl justify-center bg-navColor'>
      <ul className='flex items-center gap-8 text-center'>
        <li>
          <NavLink to='/location' onClick={() => handleIsActive('location')}>
            <img
              src={isActive === 'location' ? '/locationActive.svg' : '/location.svg'}
              alt='지역'
              width='29'
              height='29'
            />
          </NavLink>
        </li>
        <li>
          <NavLink to='/around' onClick={() => handleIsActive('around')}>
            <img
              src={isActive === 'around' ? '/aroundActive.svg' : '/around.svg'}
              alt='내주변'
              width='29'
              height='29'
            />
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/'
            onClick={() => handleIsActive('home')}
            className='mb-8 flex rounded-full bg-primary p-3 shadow-md'
          >
            <img src='/logoHome.svg' alt='홈' width='29' height='29' />
          </NavLink>
        </li>
        <li>
          <NavLink to='/wish' onClick={() => handleIsActive('heart')}>
            <img
              src={isActive === 'heart' ? '/heartActive.svg' : '/heart.svg'}
              alt='찜목록'
              width='29'
              height='29'
            />
          </NavLink>
        </li>
        <li>
          <NavLink to='/mypage' onClick={() => handleIsActive('my')}>
            <img
              src={isActive === 'my' ? '/myActive.svg' : '/my.svg'}
              alt='마이페이지'
              width='29'
              height='29'
            />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
export default Navigation;
