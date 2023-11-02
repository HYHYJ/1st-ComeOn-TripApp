import { useState } from 'react';
import Category from '@/components/Category';
import Header from '@/components/Header';
import Input from '@/components/Input';
import SelectModal from '@/components/SelectModal';
import MetaTag from '@/components/MetaTag';
import useAuthStore from '@/store/useAuthStore';

function AirlinePage() {
  const isAuth = useAuthStore((state) => state.isAuth);

  const [selectCategory, setSelectCategory] = useState('왕복');
  const category = ['왕복', '편도'];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [departure, setDeparture] = useState('서울');
  const [arrival, setArrival] = useState('선택');
  const [click, setClick] = useState('왕복');

  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];

  const clickDeparture = () => {
    setClick('왕복');
  };

  const clickArrival = () => {
    setClick('편도');
  };

  const clickChange = () => {
    let tmp;
    tmp = departure;
    setDeparture(arrival);
    setArrival(tmp);
  };

  const departureCategory = [
    '제주',
    '인천',
    '김포',
    '부산',
    '광주',
    '청주',
    '대구',
    '여수',
    '양양',
  ];

  const arrivalCategory = [
    '제주',
    '인천',
    '김포',
    '부산',
    '광주',
    '청주',
    '대구',
    '여수',
    '양양',
    '오사카',
    '도쿄',
    '후쿠오카',
    '방콕',
    '다낭',
    '파리',
    '런던',
  ];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDeparture = () => {
    setDeparture(event.target.innerText);
  };

  const handleArrival = () => {
    setArrival(event.target.innerText);
  };

  return (
    <>
      <MetaTag title='항공 예약' description='항공 예약' />
      <Header back='back' search='search' title='항공' className='text-xl font-semibold' />
      <section className='pb-20'>
        <div className='flex flex-col items-center justify-center'>
          <img src='/airplane.png' alt='비행기' className='w-[90px]' />
          <span>설레는 여행의 즐거운 시작</span>
          <h3 className='text-[18px] font-bold'>야무지개놀자 항공</h3>
          <Category
            className='justify-center gap-1 py-3 max-[340px]:text-sm max-[340px]:leading-6 '
            category={category}
            selectCategory={selectCategory}
            setSelectCategory={setSelectCategory}
          />
        </div>
        <div className='mx-5 flex justify-around gap-5 rounded-[8px] border border-[#cccccc] px-5 py-4'>
          <button
            type='button'
            className='text-[30px] font-bold'
            onClick={() => {
              openModal();
              clickDeparture();
            }}
          >
            {departure}
          </button>

          <button onClick={clickChange}>
            <img src='/change.png' alt='' />
          </button>

          <button
            type='button'
            className='text-[30px] font-bold'
            onClick={() => {
              openModal();
              clickArrival();
            }}
          >
            {arrival}
          </button>
        </div>

        <div
          className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity ${
            isModalOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <div
            className='h-full w-full transform bg-white p-4 transition-transform duration-300 ease-in-out'
            style={{ translateY: isModalOpen ? 0 : '100%' }}
          >
            <button type='button' onClick={closeModal}>
              <img src='/close.svg' alt='닫기' className='w-6' />
            </button>

            <h3 className='mb-5 mt-[-36px] text-center text-[18px] font-bold'>출발지 선택</h3>
            <div>
              <div className='flex flex-wrap justify-around gap-3 text-[14px]'>
                {click === '왕복' && (
                  <SelectModal
                    category={departureCategory}
                    title={'출발지 선택'}
                    isModalOpen={isModalOpen}
                    closeModal={closeModal}
                    handleFunction={handleDeparture}
                  />
                )}
                {click === '편도' && (
                  <SelectModal
                    category={arrivalCategory}
                    title={'도착지 선택'}
                    isModalOpen={isModalOpen}
                    closeModal={closeModal}
                    handleFunction={handleArrival}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='mx-5 mt-3 rounded-[8px] border border-[#cccccc] p-3'>
          <span>가는날을 선택해주세요</span>
          <form action=''>
            <Input
              label='날짜'
              type='date'
              className=' ml-4 mt-2 text-[1rem] font-semibold focus:outline-none'
              min={formattedDate}
            />
          </form>
          {selectCategory === '왕복' && (
            <div>
              <div className='my-1 h-[1px] bg-[#cccccc]'></div>
              <span>오는날을 선택해주세요</span>
              <form action=''>
                <Input
                  label='날짜'
                  type='date'
                  className=' ml-4 mt-2 text-[1rem] font-semibold focus:outline-none'
                  min={formattedDate}
                />
              </form>
            </div>
          )}
          <div className='my-1 h-[1px] bg-[#cccccc]'></div>
          <button
            type='button'
            className='mt-3 w-full rounded-[8px] bg-[#cccccc] py-3 text-[18px] font-bold text-white'
          >
            항공편 검색
          </button>
        </div>
        {!isAuth && (
          <div className='flex flex-col border-b border-t border-[#f2f2f2] bg-[#fbfbfb] p-3 text-center text-[12px]'>
            <span>항공은 야무지개놀자 회원만 예약할 수 있습니다.</span>
            <a href='/signin' className='underline underline-offset-1'>
              로그인하기
            </a>
          </div>
        )}
      </section>
    </>
  );
}
export default AirlinePage;
