import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { usePocketData } from '@/api/usePocketData';
import { useQueryClient } from '@tanstack/react-query';
import Guest from '@/components/Guest';
import Header from '@/components/Header';
import MetaTag from '@/components/MetaTag';
import useAuthStore from '@/store/useAuthStore';
import MyQnaTemplate from '@/components/MyQnaTemplate';

function MyNewQnaPage() {
  const isAuth = useAuthStore((state) => state.isAuth);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const { getIdData: getUser } = usePocketData('users');
  const { updateData: updateUser } = usePocketData('users');
  const { createData: createQna } = usePocketData('qna');
  const queryClient = useQueryClient();

  const id = user?.id;

  const titleRef = useRef(null);
  const textRef = useRef(null);
  const photoRef = useRef(null);
  const formRef = useRef(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    const title = titleRef.current.value;
    const text = textRef.current.value;
    const img = photoRef.current.files;

    const formData = new FormData();

    formData.append('title', titleRef.current.value);
    formData.append('text', textRef.current.value);
    if (photoRef.current.files.length > 0) {
      formData.append('img', photoRef.current.files[0]);
    }

    if (!text || text.trim() === '') {
      toast.error('내용을 작성해주세요');
    }

    try {
      const created = await createQna(formData);

      await updateUser(id, {
        'qna+': created.id,
      });
      queryClient.invalidateQueries(['newQna']);
      navigate('/mypage/myqna');
    } catch (error) {
      toast.error('저장 불가합니다.');
    }
  };

  const [fileName, setFileName] = useState('');

  const handleUpload = async (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      const fileImages = Array.from(files).map((file) => ({
        image: URL.createObjectURL(file),
        label: file.name,
      }));
      setFileName(fileImages[0].label);

      const formData = new FormData();
      formData.append('img', files[0]);
    }
  };

  const handleReset = () => {
    titleRef.current.value = '';
    textRef.current.value = '';
    photoRef.current.files = null;
    setFileName('');
  };

  return (
    <>
      <MetaTag title='1:1문의' description='1:1문의' />
      <Header
        search='search'
        back='back'
        cart='cart'
        title='1:1문의 작성'
        className='ml-10 text-xl font-semibold'
      ></Header>
      {!isAuth && <Guest></Guest>}
      {isAuth && (
        <>
          <section className='absolute left-1/2 top-1/2 flex h-[73%] w-[90%] -translate-x-1/2 -translate-y-1/2 transform rounded-3xl bg-lightPurple p-3 shadow-lg sm:max-w-[500px] sm:p-5'>
            <MyQnaTemplate
              formref={formRef}
              onReset={handleReset}
              onSubmit={handleRegister}
              username={user.username}
              email={user.email}
              titleRef={titleRef}
              textRef={textRef}
              photoRef={photoRef}
              onChange={handleUpload}
              fileName={fileName}
              bluebutton='저장'
              redbutton='취소'
            ></MyQnaTemplate>
            <Toaster
              toastOptions={{
                success: {
                  duration: 100,
                  style: {
                    background: '#5D6FFF',
                    color: 'white',
                  },
                },
                error: {
                  duration: 2000,
                  style: {
                    background: '#E03B69',
                    color: 'white',
                  },
                },
              }}
            />
          </section>
        </>
      )}
    </>
  );
}
export default MyNewQnaPage;
