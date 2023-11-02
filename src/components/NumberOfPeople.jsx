function NumberOfPeople({number, selectNumber, setSelectNumber, selectList, setSelectList, className, NumberBoxclassName , NumberListClassName='text-[0.9rem] py-[0.35rem]'}) {

  return (
    <div role="group" aria-label="인원수" className={`relative text-[1rem] ${className}`} tabIndex='0' onClick={() => {setSelectList((e) => !e)}} >
      <img src='/myActive.svg' alt='' className='inline-block mx-3 mb-1' />
      <span className=' font-semibold'>성인 {selectNumber}명</span>
      <ul className={`absolute ${NumberBoxclassName} ${!selectList ? 'hidden' : ''}`}>
          {number.map((item)=>(
            <li key={item}  tabIndex='0' className={`hover:bg-lightPurple ${NumberListClassName}`} onClick={() => {
              setSelectNumber(`${item}`)}}>{item}</li>
              ))}
      </ul>
    </div>
  )
}

export default NumberOfPeople