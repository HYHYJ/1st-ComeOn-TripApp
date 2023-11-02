import { useState } from 'react';
import SearchFavorite, { SearchFavoriteSecond } from './SearchFavorite';
import debounce from '@/utils/debounce';
import useStorage from '@/Hook/useStorage';
import CustomDate from './CustomDate';
import SearchResult from './SearchResult';
import SearchRecent from './SearchRecent';

function SearchLeisure({ data }) {
  let filterData;
  const categoryFisrt = ['놀이동산', '동물원', '전시', '워터파크'];
  const categorySecond = ['아쿠아리움', '케이블카', '스파', '축제'];
  const [state, setstate] = useState('leisure');
  const [userInput, setUserInput] = useState('');
  const [searchedData, setSearchedData] = useState('');

  const { storageData: searchData, update } = useStorage('searchLeigureData', []);

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
    default:
      filterData = data.filter((leisure) => leisure.category === userInput);
      break;
  }
  const searched = data.filter((item) => item.title.toLowerCase().includes(userInput));

  return (
    <section className='pb-[8rem]'>
      <h2 className='sr-only'>레저/티켓 검색</h2>
      <form
        onSubmit={searchEnter}
        className='relative mx-auto mt-3.5 flex w-[90%] rounded-2xl  border-[0.1rem]   border-solid border-secondary py-3 md:w-[80%]'
      >
        <img src='/search-primary.svg' alt='' className='mx-4 inline-block ' />
        <label htmlFor='SearchLeisure' className='sr-only'>
          검색
        </label>
        <input
          type='search'
          name='SearchLeisure'
          id='SearchLeisure'
          placeholder='지역, 레저명 키워드로 찾아보세요'
          className='mr-3 flex-grow  focus:outline-none'
          onChange={debounce(getValue, 1000)}
        />

        <button
          type='reset'
          aria-label='검색어 초기화 버튼'
          className='bottom-0.2 absolute  right-2 bg-white px-4 py-1 '
          aria-pressed='false'
        >
          <img src='/search-close.svg' alt='' className='h-4 w-4' onClick={resetText} />
        </button>
      </form>

      {userInput !== '' ? <SearchResult data={filterData} state={state} /> : ''}

      {userInput !== '' ? <SearchResult data={searched} state={state} /> : ''}
      {userInput === '' ? (
        <>
          <article className='mx-auto mt-7 w-[88%] md:w-[78%]'>
            <h2 className='inline-block text-lg font-bold' id='popularSearch'>
              인기 검색어
            </h2>
            <CustomDate className='ml-3 mr-1.5 text-[0.9rem] font-semibold text-gray' />
            <span className='text-[0.9rem] font-semibold text-gray '>기준</span>
            <div className='mb-8 mt-2 flex md:mb-12' aria-labelledby='popularSearch'>
              <ul className='w-[50%]'>
                <SearchFavorite category={categoryFisrt} state={state} />
              </ul>
              <ul>
                <SearchFavoriteSecond category={categorySecond} state={state} />
              </ul>
            </div>
          </article>
          <SearchRecent data={searchData} removeSearch={removeSearch} />
        </>
      ) : (
        ''
      )}
    </section>
  );
}

export default SearchLeisure;
