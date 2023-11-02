import { useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePocketData } from '@/api/usePocketData';
import { toast, Toaster } from 'react-hot-toast';
import MetaTag from '@/components/MetaTag';
import Header from '@/components/Header';
import useAuthStore from '@/store/useAuthStore';
import Input from '@/components/Input';
import Form from '@/components/Form';
import Button from '@/components/Button';

function HotelEditPage() {
  const { id } = useParams();
  const { updateData } = usePocketData('hotel');
  const user = useAuthStore((state) => state.user);
  const admin = 'wo2jejtn6yi1wwu';

  const gradeRef = useRef(null);
  const introRef = useRef(null);
  const priceRef = useRef(null);
  const photoRef = useRef(null);
  const uploadImgRef = useRef(null);

  if (admin != user.id) {
    return (
      <div className='flex flex-col items-center gap-3 pt-40'>
        <div className='font-semibod text-center'>관리자만 접속할 수 있는 페이지 입니다.</div>
        <Link
          to='/signin'
          className='flex justify-center rounded border px-20 py-2 text-center text-gray2 hover:text-primary'
        >
          로그인 하러가기
        </Link>
      </div>
    );
  }

  const handleEditHotel = async (e) => {
    e.preventDefault();
    const grade = gradeRef.current.value;
    const price = priceRef.current.value;
    const intro = introRef.current.value;

    const data = {
      price,
      intro,
      grade,
      img: photoRef.current.files[0],
    };

    try {
      await updateData(id, data);
      toast.success('수정이 완료되었습니다.');
    } catch (error) {
      toast.error('서버 에러');
    }
  };

  const handleDisplayUploadImg = (e) => {
    const imgFile = e.target.files[0];
    const imgUrl = URL.createObjectURL(imgFile);
    uploadImgRef.current.setAttribute('src', imgUrl);
  };
  return (
    <>
      <MetaTag title='호텔 정보 수정' description='호텔 정보를 수정하는 페이지' />
      <Header back='back' title='호텔 정보 수정' className='mr-5 text-xl font-bold' />
      <section className='px-4 pb-20'>
        <Form
          encType='multipart/form-data'
          onSubmit={handleEditHotel}
          className='mx-auto flex max-w-md flex-col gap-3 rounded-md bg-lightPurple px-5 pt-10'
        >
          <span>[호텔 등급 수정]</span>
          <Input
            inputRef={gradeRef}
            label='호텔 등급'
            type='text'
            id='grade'
            placeholder='ex)4등급'
            className='mb-5 h-9 w-full rounded-md p-2 outline-primary'
            labelClass='sr-only'
          />
          <span>[호텔 가격 수정]</span>
          <Input
            inputRef={priceRef}
            label='호텔 가격'
            type='number'
            id='price'
            className='mb-5 h-9 w-full rounded-md p-2 outline-primary'
            labelClass='sr-only'
          />
          <span>[호텔 소개 수정]</span>
          <textarea
            ref={introRef}
            label='호텔 소개'
            type='text'
            id='intro'
            className='mb-5 h-24 w-full resize-none rounded p-4 outline-primary'
          />
          <div className='relative flex flex-col gap-2'>
            <label htmlFor='img'>[호텔 이미지 수정]</label>
            <input
              ref={photoRef}
              onChange={handleDisplayUploadImg}
              type='file'
              name='img'
              id='img'
              accept='*.jpg,*.png,*.webp,*.avif'
              className='absolute h-full w-full cursor-pointer opacity-0'
            />
            <div className='flex h-[140px] justify-center rounded-md pt-1'>
              <img
                ref={uploadImgRef}
                className='h-[130px] w-[130px] rounded-md border-secondary'
                src='https://placehold.co/84x124?text=PHOTO'
                alt=''
              />
            </div>
          </div>
          <div className='flex justify-center gap-10 py-3 text-white '>
            <Button type='submit' className='rounded-md bg-primary px-2'>
              수정하기
            </Button>
            <Button type='reset' className='rounded-md bg-accent px-2'>
              취소
            </Button>
          </div>
        </Form>
        <Toaster
          toastOptions={{
            duration: 900,
            success: {
              style: {
                background: '#5D6FFF',
                color: 'white',
              },
            },
            error: {
              style: {
                background: '#E03B69',
                color: 'white',
              },
            },
          }}
        />
      </section>
    </>
  );
}
export default HotelEditPage;
