function SelectModal({ title, category, isModalOpen, closeModal, handleFunction }) {
  return (
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

        <h3 className='mb-5 mt-[-36px] text-center text-[18px] font-bold'>{title}</h3>
        <div>
          <span className='text-[18px] font-bold'>주요 공항</span>
          <div className='flex flex-wrap justify-around gap-3 text-[14px]'>
            {category.map((item) => {
              return (
                <button
                  key={item}
                  type='button'
                  className='w-[30%] border-b border-b-[#e6e6e6] py-2'
                  onClick={() => {
                      closeModal();
                      handleFunction();
                  }}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectModal;
