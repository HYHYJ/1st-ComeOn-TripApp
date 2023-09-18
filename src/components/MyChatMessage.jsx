function MyChatMessage({ message, children }) {
  return (
    <div className='min-h-2 relative min-w-[20px] pb-3'>
      <div className='mb-2 flex justify-end'>
        <div className=''>
          <div className='break-word min-w-[30px] rounded-2xl bg-lightPurple px-5 py-3'>
            <div
              className=' max-w-[51vw] whitespace-pre-wrap
            break-words text-xs sm:max-w-[300px] sm:text-sm'
            >
              {message}
              {children}
            </div>
          </div>
          <div className='text-right text-[8px] font-light'>2022.03.02</div>
        </div>
        <div className='sm:min-w-[50px]flex-shrink-0 ml-3 aspect-square max-h-[30px] min-h-[30px] min-w-[30px] max-w-[30px] items-start overflow-hidden rounded-full sm:max-h-[50px] sm:min-h-[50px] sm:max-w-[50px]'>
          <img src='/my-testimg.jpg' alt='프로필사진' className='aspect-square' />
        </div>
      </div>
    </div>
  );
}

export default MyChatMessage;
