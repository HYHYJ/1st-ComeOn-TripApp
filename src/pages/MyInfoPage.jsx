import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Guest from '@/components/Guest';
import Header from '@/components/Header';
import Button from '@/components/Button';
import MyInput from '@/components/MyInput';
import MetaTag from '@/components/MetaTag';
import useAuthStore from '@/store/useAuthStore';
import MyCircleProfile from '@/components/MyCircleProfile';
import debounce from '@/utils/debounce';

function MyInfoPage() {
  const isAuth = useAuthStore((state) => state.isAuth);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = useState(false);
  const [password, setPassword] = useState('');
  const handleInfoChange = () => {
    navigate('myinfochange');
  };

  useEffect(() => {
    if (password.length >= 6) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [password]);

  return (
    <>
      <MetaTag title='내 정보' description='정보변경을 위한 확인 절차' />
      <Header
        search='search'
        back='back'
        cart='cart'
        title='내 정보'
        className='ml-10 text-xl font-semibold'
      ></Header>
      {!isAuth && <Guest></Guest>}
      {isAuth && (
        <>
          <section className='md:absolute md:left-1/2 md:top-1/2 md:mb-8 md:-translate-x-1/2 md:-translate-y-1/2 md:transform'>
            <MyCircleProfile towhere='/mypage'></MyCircleProfile>

            <div className='mb-32 flex w-full flex-col items-center justify-center text-center'>
              <div
                className={`relative h-11 w-64 rounded-full border-[1px] ${
                  isFormValid ? 'border-primary' : ' border-red-500'
                }  md:h-[7vh]md:py-5 bg-lightPurple text-center align-middle text-xs font-semibold text-secondary shadow-md md:mb-8`}
              >
                <p className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform whitespace-nowrap'>
                  정보 변경을 위해 로그인 시 사용하시는 <br />
                  비밀번호를 입력해주세요.
                </p>
                <p
                  className='sr-only absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform whitespace-nowrap'
                  role='text'
                  tabIndex='0'
                  aria-live='polite'
                >
                  정보 변경을 위해 로그인 시 사용하시는 <br />
                  비밀번호를 입력해주세요.
                </p>
              </div>
              <MyInput
                type='password'
                id='password'
                placeholder='비밀번호'
                className='mt-10 h-11 w-72 border-b-[1px] border-neutral-200 sm:w-80'
                label='비밀번호'
                labelClass='sr-only'
                onChange={debounce((e) => setPassword(e.target.value), 1000)}
              ></MyInput>
              <Button
                onClick={handleInfoChange}
                type='submit'
                className={`mt-10 h-11 w-72 rounded-xl border-[1px] border-secondary text-secondary sm:w-80 md:h-14 ${
                  isFormValid ? 'bg-primary font-bold text-white ' : 'text-primary outline-primary'
                }`}
                disabled={!isFormValid}
              >
                정보 변경
              </Button>
            </div>
          </section>
        </>
      )}
    </>
  );
}
export default MyInfoPage;
