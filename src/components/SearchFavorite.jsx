import { Link } from 'react-router-dom'

function SearchFavorite({category, state}) {
  return (
    <ul>
      {category?.map((item, index)=> (
        <li key={item} className='my-3.5 hover:text-primary text-[0.9rem]'>
          <Link to = {state==='hotel'? `/location/${item}` :`/search/${item}`} >
            <span className='mr-3.5 text-primary text-sm font-extrabold'>
              {index + 1}
            </span>
            {item}
          </Link>
        </li>
      ))}
      
    </ul>
  )
}

export default SearchFavorite


export function SearchFavoriteSecond({category, state}) {
  return (
    <ul>
      {category?.map((item, index)=> (
      <Link to = {state==='hotel'? `/location/${item}` :`/search/${item}`} key={item}>
        <li  className='my-3.5 hover:text-primary  text-[0.9rem]'>
          <span className='mr-3.5 text-primary text-sm font-extrabold'>
            {index + 5}
          </span>{item}
        </li>
      </Link>
      ))}
      
    </ul>
  )
}
