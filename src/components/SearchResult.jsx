import { Link } from 'react-router-dom';

function SearchResult({data, state}) {  
  return (
    <article>
      <ul className=' w-[90%]  md:w-[80%] mx-auto'>
          {data.map((item) => (
            <li key={item.id} className='bg-lightPurple md:text-[0.95rem] text-sm font-medium mx-2 mt-4 px-1 py-1 rounded-full list-none'>
              <Link to={state === 'hotel' ? `/hotel/${item.id}` : `/LeisureDetail/${item.id}`} aria-label='호텔 상세페이지로 이동' className='w-[100%] block'>
                <img src='/locationActive.svg' alt='검색 결과' className='inline-block w-5 mx-2' />
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
      </ul>
    </article>
    
  );
}

export default SearchResult