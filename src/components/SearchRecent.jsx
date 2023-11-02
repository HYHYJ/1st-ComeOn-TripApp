function SearchRecent({data,removeSearch }) {
  return (
    <article className='mx-auto mt-5 w-[88%] md:w-[78%] '>
              <h2 className='mb-4 text-lg font-semibold' id='recentSearch'>
                최근 검색
              </h2>
              <ul role='group' aria-labelledby='recentSearch' className='flex flex-row gap-x-2 gap-y-[0.4rem] flex-wrap'>
                {data.map((item, index) => (
                  <li
                    key={index}
                    className='inline-block  rounded-full text-[0.9rem] bg-lightPurple pt-[0.45rem] px-5 h-9   font-semibold'
                  >
                    {item}
                    <button type='button' className='' aria-pressed='false' onClick={removeSearch}>
                      <img
                        id={index}
                        src='/search-recentClose.svg'
                        alt='최근 검색 지우기'
                        className='ml-[0.8rem] inline-block h-4 w-3 pb-1'
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </article>
  )
}

export default SearchRecent