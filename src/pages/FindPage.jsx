import { useRef } from 'react';
import { usePocketData } from '@/api/usePocketData';
import { toast, Toaster } from 'react-hot-toast';
import Header from '@/components/Header';
import MetaTag from '@/components/MetaTag';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Form from '@/components/Form';

function FindPage() {
  const resetRef = useRef(null);
  const { passwordReset } = usePocketData('users');

  const handleReset = async (e) => {
    e.preventDefault();

    const reset = resetRef.current.value;
    
    await passwordReset(reset);

    toast.success('이메일을 보냈습니다! 확인해 주세요.');
  };
  return (
    <>
      <MetaTag title='비밀번호 찾기' description='비밀번호 찾기' />
      <Header back='back' className='mr-4 text-xl font-semibold' title='비밀번호 찾기' />
      <section className='mx-auto px-5 pt-12'>
        <h3 className='sr-only'>비밀번호 찾기</h3>
        <Form onSubmit={handleReset} className='flex flex-col items-center font-semibold'>
          <span>찾으시는 비밀번호의</span>
          <span>이메일 주소를 입력해주세요</span>
          <Input
            inputRef={resetRef}
            label='이메일'
            type='text'
            id='reset'
            placeholder='이메일'
            className='mt-10 h-9 w-full max-w-md border-b border-gray px-4 outline-primary'
            labelClass='sr-only'
          />
          <Button
            type='submit'
            className='mt-10 w-full max-w-md rounded-lg border py-2 text-center font-bold text-primary hover:bg-primary hover:text-white'
          >
            이메일 보내기
          </Button>
        </Form>
        <Toaster
          toastOptions={{
            duration: 1000,
            success: {
              style: {
                background: '#5D6FFF',
                color: 'white',
              },
            },
          }}
        />
      </section>
    </>
  );
}
export default FindPage;
