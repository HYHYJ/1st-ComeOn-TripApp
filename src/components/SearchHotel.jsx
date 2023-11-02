import { useState } from 'react';
import SearchFavorite, { SearchFavoriteSecond } from './SearchFavorite';
import useStorage from '@/Hook/useStorage';
import debounce from '@/utils/debounce';
import Input from './Input';
import CustomDate from './CustomDate';
import SearchResult from './SearchResult';
import NumberOfPeople from './NumberOfPeople';
import SearchRecent from './SearchRecent';

function SearchHotel({ data }) {
  const categoryFisrt = ['제주', '이탈리아', '오사카', '스페인'];
  const categorySecond = ['태국', '싱가포르', '부산', '교토'];
  const [state, setstate] = useState('hotel');
  const [selectNumber, setSelectNumber] = useState('1');
  const [selectList, setSelectList] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [searchedData, setSearchedData] = useState('');
  const number = ['1', '2', '3', '4'];
  let filterData;

  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];

  const { storageData: searchData, update } = useStorage('searchData', []);

  const getValue = (e) => {
    setUserInput(e.target.value.toLowerCase());

    if (userInput !== '') {
      const recentSearch = [...searchData, userInput];
      update(recentSearch);
      setSearchedData(true);
    }
  };

  const removeSearch = (e) => {
    const clickedIndex = e.target.id;
    searchData.splice(clickedIndex, 1);
    update(searchData);
    setSearchedData(e);
  };
  const resetText = () => {
    setUserInput('');
  };
  const searchEnter = (e) => {
    e.preventDefault();

    if (userInput !== '') {
      const recentSearch = [...searchData, userInput];
      update(recentSearch);
      setSearchedData(true);
    }
  };

  switch (userInput) {
    case '서울':
      filterData = data.filter((hotel) => hotel.category === '도심힐링');
      break;
    default:
      filterData = data.filter((hotel) => hotel.category === userInput);
      break;
  }
  const searched = data.filter((item) => item.title.toLowerCase().includes(userInput));

  return (
    <>
      <section className=''>
        <h2 className='sr-only '>숙소 검색</h2>
        <div
          role='search'
          className=' mx-auto mt-3.5 h-[5.7rem] w-[90%]  rounded-2xl border-[0.1rem]  border-solid border-secondary pb-1 md:w-[80%]'
        >
          <form className='relative flex h-[50%]' onSubmit={searchEnter}>
            <img src='/search-primary.svg' alt='' className='mx-4 mt-4 inline-block h-5' />
            <label htmlFor='searchHotel' className='sr-only'>
              검색
            </label>
            <input
              type='text'
              name='searchHotel'
              id='searchHotel'
              placeholder='지역, 숙소명 키워드로 찾아보세요'
              className=' mr-3 mt-2 flex-grow   focus:outline-none'
              onChange={debounce(getValue, 1000)}
            />

            <button
              type='reset'
              aria-label='검색어 초기화 버튼'
              className='bottom-0.2 absolute  right-2 mt-[0.55rem] bg-white px-4 py-2 '
              onClick={resetText}
            >
              <img src='/search-close.svg' alt='닫기' className='h-4 w-4' />
            </button>
          </form>

          <form action='' className=' inline-block h-[50%] w-[50%] border-solid   pl-4  '>
            <Input
              label='날짜'
              type='date'
              id='hotelDate'
              placeholder='지역, 숙소명 키워드로 찾아보세요'
              className=' mx-3 mt-2 w-[75%] pl-4 pr-3 text-[0.95rem] font-semibold focus:outline-none md:pl-10 md:text-[1rem]'
              labelClass='sr-only'
              min={formattedDate}
            />
          </form>
          <NumberOfPeople
            number={number}
            selectNumber={selectNumber}
            setSelectNumber={setSelectNumber}
            selectList={selectList}
            setSelectList={setSelectList}
            className='inline-block w-[50%] text-[0.9rem] md:text-[1rem] '
            NumberBoxclassName='left-[3.5rem]  top-[1.6rem] w-[4rem] text-center bg-white rounded-md shadow-md'
          />
        </div>

        {userInput ? <SearchResult data={filterData} state={state} /> : ''}

        {userInput ? <SearchResult data={searched} state={state} /> : ''}

        {!userInput ? (
          <section className='pb-[8rem]'>
            <article className='mx-auto mt-7 w-[88%] md:w-[78%]'>
              <h2 className='inline-block text-lg font-bold' id='popularSearch'>
                인기 검색어
              </h2>
              <CustomDate className='ml-3 mr-1.5 text-[0.9rem] font-semibold text-gray' />
              <span className='text-[0.9rem] font-semibold text-gray '>기준</span>
              <div className='mb-8 mt-2 flex md:mb-12' aria-labelledby='popularSearch' role='group'>
                <ul className='w-[50%]'>
                  <SearchFavorite category={categoryFisrt} state={state} />
                </ul>
                <ul>
                  <SearchFavoriteSecond category={categorySecond} state={state} />
                </ul>
              </div>
            </article>
            <SearchRecent data={searchData} removeSearch={removeSearch} />
          </section>
        ) : (
          ''
        )}
      </section>
    </>
  );
}

export default SearchHotel;
