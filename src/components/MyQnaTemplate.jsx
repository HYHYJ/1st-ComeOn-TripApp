import React from 'react';

// eslint-disable-next-line react/display-name
const MyQnaTemplate = React.forwardRef((props, ref) => {
  const {
    onReset,
    onSubmit,
    username,
    email,
    titleRef,
    textRef,
    photoRef,
    onChange,
    fileName,
    bluebutton,
    redbutton,
  } = props;
  return (
    <form
      className='flex h-full w-full flex-col justify-between'
      encType='multipart/form-data'
      ref={ref}
      onReset={onReset}
      onSubmit={onSubmit}
    >
      <div className='flex w-full border-b-[1px] border-slate-400 py-1 text-sm sm:py-3 sm:text-base '>
        <p className='mr-4 font-semibold'>NAME</p>
        <p className='font-thin'>{username}</p>
      </div>
      <div className='flex w-full border-b-[1px] border-slate-400 py-1 text-sm sm:py-3 sm:text-base'>
        <p className='mr-4 font-semibold'>EMAIL</p>
        <p className='font-thin'>{email}</p>
      </div>

      <div className='flex w-full items-start justify-start border-slate-400 pt-2 sm:py-3'>
        <p className='mr-4 h-8 w-auto flex-shrink-0 flex-grow-0 text-lg font-semibold'>제목</p>

        <input
          type='text'
          id='title'
          ref={titleRef}
          className='h-3 w-full rounded-2xl border-[1px] border-slate-400 p-3 sm:h-7'
        ></input>
      </div>
      <textarea
        name='qna'
        id='qna'
        ref={textRef}
        cols='30'
        rows='10'
        className='mb-auto h-full w-full flex-grow resize-none  rounded-2xl border-[1px] border-slate-400 p-3'
      ></textarea>
      <div className='flex w-full justify-between pt-2 sm:py-3'>
        <div className='flex items-end'>
          <input
            type='file'
            id='photo'
            ref={photoRef}
            accept='*.jpg,*.png,*.jpeg,*.webp,*.avif'
            onChange={onChange}
            className='hidden flex-shrink-0'
          />
          <label
            htmlFor='photo'
            tabIndex='0'
            className='mr-2 flex-shrink-0 cursor-pointer rounded-md border-[1px] p-1 hover:border-primary hover:bg-primary hover:text-white hover:shadow-md'
          >
            파일첨부
          </label>
          <div className='w-24 flex-shrink-0 overflow-hidden overflow-ellipsis whitespace-nowrap sm:w-32 md:w-56'>
            {fileName}
          </div>
        </div>
        <div>
          <button
            type='submit'
            label='저장하기'
            className='ml-auto mr-1 flex-shrink-0 rounded-md border-[1px] p-1 hover:border-primary hover:bg-primary hover:text-white hover:shadow-md'
          >
            {bluebutton}
          </button>
          <button
            type='reset'
            label='취소하기'
            className='ml-auto flex-shrink-0 rounded-md border-[1px] p-1 hover:border-red-500 hover:bg-red-500 hover:text-white hover:shadow-md'
          >
            {redbutton}
          </button>
        </div>
      </div>
    </form>
  );
});

export default MyQnaTemplate;
