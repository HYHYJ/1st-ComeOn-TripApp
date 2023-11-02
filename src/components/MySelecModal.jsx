import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MySelecModal({
  children,
  MoveTo,
  MoveTo2,
  onClose,
  onOption2,
  onOption1,
  option1 = '확인',
  option2 = '취소',
}) {
  const modalRef = useRef();

  useEffect(() => {
    modalRef.current.focus();
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      className='h-fll fixed bottom-0 left-0 right-0 top-0 w-full bg-lightPurple'
      onClick={onClose}
    >
      <section
        className='absolute right-1/2 top-[5%] z-50 translate-x-1/2 translate-y-1/2 sm:top-[13%]'
        ref={modalRef}
        aria-modal='true'
        role='dialog'
        aria-describedby='modal-description'
        tabIndex='-1'
      >
        <div className='h-60 w-72 rounded-lg border-[1px] bg-white  bg-opacity-70 p-4 font-semibold shadow-md'>
          <div id='modal-description' className='p-6 text-center text-lg'>
            {children}
          </div>
          <div className='fixed bottom-4 right-4 flex gap-3 text-white'>
            <Link
              to={MoveTo}
              className='rounded bg-thirdary px-2 py-1 hover:bg-primary'
              onClick={onOption1}
            >
              {option1}
            </Link>

            <Link to={MoveTo2}>
              <button
                onClick={onOption2}
                className='mr-2 rounded bg-slate-400 px-2 py-1 hover:bg-accent'
              >
                {option2}
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MySelecModal;
