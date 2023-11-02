import Button from './Button';


function LocationSideButton({ locationSideButton, selectLocationSide, setSelectLocationSide, className }) {
 
  const handleChangeLocationSide = (nav) => {
    {selectLocationSide}(nav);
  };

  return (
    <>
      <ul className={`flex  flex-col   ${className}`}>
        {locationSideButton.map((item) => {
          const isActive = selectLocationSide === item;
      
          return (
            <li
              key={item}
              aria-label={item}
              className={``}
            onClick={() => {
              setSelectLocationSide(item);
              handleChangeLocationSide(item)
            }}>
              <Button
              className={` w-full text-gray2 font-bold px-[3rem] py-6 md:py-7 text-[0.9rem] bg-lightPurple border-b-[0.1rem] border-[#E1E1E1]
              ${isActive ? 'bg-white  text-[#000000] ' : ''
              }`}
              onClick={() => {
                setSelectLocationSide(item);
              }} 
              >{item}</Button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
export default LocationSideButton