import { useEffect } from 'react';
import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePocketData } from '@/api/usePocketData';
import { toast, Toaster } from 'react-hot-toast';
import { getPbImageURL } from '@/utils/getPbImageURL';
import useAuthStore from '@/store/useAuthStore';
import Header from '@/components/Header';
import Form from '@/components/Form';
import Button from '@/components/Button';
import Input from '@/components/Input';
import regEx from '@/utils/regEx';

function MyInfoChangePage() {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const { updateData: updateUser } = usePocketData('users');
  const userId = user.id;

  // const navigate = useNavigate();
  // const { data: userData, isLoading } = useQuery(['user', id], () => getUser(id));

  const nickNameRef = useRef(null);
  const bgImgRef = useRef(null);
  const avatarRef = useRef(null);
  const formRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);

  const [fileName, setFileName] = useState('');

  const [avatarSrc, setAvatarSrc] = useState('/My-ProfileBasic.jpeg');
  const [selectedImage, setSelectedImage] = useState('');
  const [bgImgSrc, setBgImgSrc] = useState(selectedImage);
  const [nickName, setNickName] = useState('');

  ///////
  useEffect(() => {
    const images = [
      '/my-randombg1.png',
      '/my-randombg2.png',
      '/my-randombg3.png',
      '/my-randombg4.png',
    ];

    const randomIndex = Math.floor(Math.random() * images.length);
    setSelectedImage(images[randomIndex]);

    if (user && user.bgimg) {
      try {
        const url = getPbImageURL(user, 'bgimg');
        setBgImgSrc(url);
      } catch (error) {
        setBgImgSrc(images[randomIndex]); // 기본 랜덤 이미지로 설정
      }
    } else {
      setBgImgSrc(images[randomIndex]); // user.bgimg가 없는 경우 기본 랜덤 이미지로 설정
    }
  }, [user]);

  ///////
  useEffect(() => {
    if (user && user.avatar) {
      try {
        const url = getPbImageURL(user, 'avatar');
        setAvatarSrc(url);
      } catch (error) {
        setAvatarSrc('/My-ProfileBasic.jpeg');
      }
    }
  }, [user]);

  useEffect(() => {
    if (user && user.nickName) {
      setNickName(user.nickName);
    }
  }, [user]);

  //
  const handleSubmit = async (event) => {
    event.preventDefault();

    const nickName = nickNameRef.current.value;
    const bgimg = bgImgRef.current.files;
    const avatar = avatarRef.current.files;

    const password = passwordRef.current.value;
    const passwordConfirm = passwordConfirmRef.current.value;

    const formData = new FormData();
    formData.append('nickName', nickName);
    if (bgImgRef.current.files.length > 0) {
      formData.append('bgimg', bgImgRef.current.files[0]);
    }
    if (avatarRef.current.files.length > 0) {
      formData.append('avatar', avatarRef.current.files[0]);
    }

    if (!nickName || nickName.trim() === '') {
      toast.error('별명을 작성해주세요');
      return;
    }

    if (!regEx.name(nickName)) {
      nickNameRef.current.classList.add('border-b-accent');
      toast.error('닉네임은 12자리까지 입력이 가능합니다.');
      return;
    } else {
      nickNameRef.current.classList.remove('border-b-accent');
    }

    if (!regEx.pw(password)) {
      passwordRef.current.classList.add('border-b-accent');
      toast.error('유효한 비밀번호를 입력해주세요.');
      return;
    } else {
      passwordRef.current.classList.remove('border-b-accent');
    }

    if (passwordConfirm !== password) {
      passwordConfirmRef.current.classList.add('border-b-accent');
      toast.error('비밀번호가 일치하지 않습니다.');
      return;
    } else {
      passwordConfirmRef.current.classList.remove('border-b-accent');
    }

    try {
      const promise = updateUser(userId, formData);
      toast.promise(promise, {
        loading: '반영 중...',
        success: () => {
          setTimeout(() => {
            // setTimeout 추가
            window.location.href = '/mypage';
          }, 2000); // 2초 지연
          return '정보가 수정되었습니다.';
        },
        error: '저장 불가합니다.',
      });
    } catch (error) {
      toast.error('저장 불가합니다.');
    }
  };

  const handleUpload = async (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      const fileImages = Array.from(files).map((file) => ({
        image: URL.createObjectURL(file),
        label: file.name,
      }));
      setFileName(fileImages[0].label);

      // 여기서 바로 파일 전송
      const formData = new FormData();
      formData.append('avatar', files[0]);

      // FileReader를 이용하여 미리보기 이미지 생성
      let reader = new FileReader();

      reader.onloadend = () => {
        if (e.target.id === 'avatar') {
          setAvatarSrc(reader.result);
        } else if (e.target.id === 'bgimg') {
          setBgImgSrc(reader.result);
        }
      };

      reader.readAsDataURL(files[0]);
      // 서버에 파일 전송하는 코드...
    }
  };

  return (
    <>
      <Helmet>
        <title>야무지개놀자</title>
      </Helmet>
      <Header search='search' back='back' cart='cart' title='마이 페이지'>
        메인페이지
      </Header>
      <section
        className='mx-auto mb-20 mt-0 w-[90%]
      flex-col rounded-3xl border-[1px] border-slate-300 p-6 text-sm shadow-lg sm:max-w-[500px] sm:text-base'
      >
        <h1 className='flex-shrink flex-grow whitespace-normal break-keep  border-b-[1px] border-slate-300 pb-5  text-center text-sm font-semibold text-primary sm:text-base'>
          정보변경
        </h1>

        <Form
          className='flex w-full  flex-shrink flex-grow flex-col items-center'
          onSubmit={handleSubmit}
          inputRef={formRef}
        >
          <ul className='flex w-full max-w-md flex-col gap-1'>
            <li>
              <div className='flex w-full border-b-[1px] border-slate-300 py-1 text-sm sm:py-3 sm:text-base '>
                <p className='mr-4 font-semibold'>이름</p>
                <p className='font-thin'>{user.username}</p>
              </div>
            </li>
            <li>
              <div className=' flex w-full border-b-[1px] border-slate-300 pb-[4px] text-sm sm:py-3 sm:text-base '>
                <p className='mr-4 font-semibold'>이메일</p>
                <p className='font-thin'>{user.email}</p>
              </div>
            </li>
            <li>
              <div className='flex w-full border-b-[1px] border-slate-300 pb-[4px] text-sm sm:py-3 sm:text-base '>
                <p className='mr-4 font-semibold'>별명</p>
                <Input
                  type='text'
                  id='nickName'
                  value={nickName}
                  onClick={() => setNickName('')}
                  name='nickName'
                  inputRef={nickNameRef}
                  onChange={(e) => setNickName(e.target.value)}
                  className='font-thin sm:w-72'
                ></Input>
              </div>
            </li>
            <li>
              <div className='flex w-full border-b-[1px] border-slate-300 pb-[4px] text-sm sm:py-3 sm:text-base '>
                <p className='mr-4 font-semibold'>비밀번호</p>
                <Input
                  type='password'
                  inputRef={passwordRef}
                  placeholder='비밀번호'
                  className={`font-thin sm:w-72 `}
                ></Input>
              </div>
            </li>
            <li>
              <div className='flex w-full border-b-[1px] border-slate-300 pb-[4px] text-sm sm:py-3 sm:text-base '>
                <p className='mr-4 font-semibold'>비밀번호 확인</p>
                <Input
                  type='password'
                  inputRef={passwordConfirmRef}
                  placeholder='비밀번호확인'
                  className={`font-thin sm:w-72 `}
                ></Input>
              </div>
            </li>
            <li className='border-b-[1px] border-slate-300 pb-[15px] sm:pb-8'>
              <div className='flex w-full  pb-[4px]  text-sm sm:py-3 sm:text-base '>
                <p className='mr-4 font-semibold'>배경 이미지</p>
                <p className='w-24 flex-shrink-0 overflow-hidden overflow-ellipsis whitespace-nowrap font-thin sm:w-32 md:w-72'>
                  {fileName || user.bgimg}
                </p>
              </div>
              <label htmlFor='bgimg' className='sr-only'>
                배경사진
              </label>
              <div className='relative table h-[150px] w-full bg-slate-200  text-center text-sm sm:h-[250px] sm:py-3 sm:text-base '>
                <input
                  type='file'
                  accept='*.jpg,*.png,*.jpeg,*.webp,*.avif'
                  id='bgimg'
                  name='bgimg'
                  ref={bgImgRef}
                  onChange={handleUpload}
                  // onChange={handleUpload}
                  className={`absolute z-10 h-full w-full cursor-pointer opacity-0`}
                />
                <div className='flex h-full w-full content-center items-center  justify-center gap-2 overflow-x-auto bg-slate-100 p-2 text-center align-middle dark:rounded dark:bg-black dark:outline-double dark:outline-[1px] dark:outline-zinc-100/40'>
                  <img src={bgImgSrc} className='max-h-[150px]  sm:max-h-[250px]' />
                </div>
              </div>
            </li>
            <li className='border-b-[1px] border-slate-300 pb-[15px] sm:pb-8'>
              <div className='flex w-full  pb-[4px]  text-sm sm:py-3 sm:text-base '>
                <p className='mr-4 font-semibold'>프로필 이미지</p>
                <p className='w-24 flex-shrink-0 overflow-hidden overflow-ellipsis whitespace-nowrap font-thin sm:w-32 md:w-72'>
                  {fileName || user.bgimg}
                </p>
              </div>
              <label htmlFor='avatar' className='sr-only'>
                프로필사진
              </label>
              <div className='relative min-h-[150px] w-full  bg-slate-200 text-sm sm:min-h-[250px] sm:py-3 sm:text-base '>
                <input
                  type='file'
                  accept='*.jpg,*.png,*.jpeg,*.webp,*.avif'
                  id='avatar'
                  name='avatar'
                  ref={avatarRef}
                  onChange={handleUpload}
                  // onChange={handleUpload}
                  className={`absolute z-10 h-full w-full cursor-pointer opacity-0`}
                />
                <div className='flex h-full w-full content-center items-center  justify-center gap-2 overflow-x-auto bg-slate-100 p-2 text-center align-middle dark:rounded dark:bg-black dark:outline-double dark:outline-[1px] dark:outline-zinc-100/40'>
                  <img src={avatarSrc} className='max-h-[150px]  sm:max-h-[250px]' />
                </div>
              </div>
            </li>
          </ul>
          <div className='flex w-full justify-between gap-x-3 sm:pt-2'>
            <Button
              type='submit'
              className='mb-18 mt-4 w-full max-w-md rounded-lg border py-2 text-center font-light text-primary outline-primary hover:bg-primary hover:font-semibold  hover:text-white'
            >
              <div className='flex items-end justify-center'>
                <p className='text-sm sm:text-base'>변경 내용 저장</p>
              </div>
            </Button>
            <Button
              type='button'
              onClick={() => {
                window.location.href = '/mypage';
              }}
              className='mb-18 mt-4 w-full max-w-md rounded-lg border py-2 text-center font-light text-primary outline-primary hover:bg-rose-500 hover:font-semibold hover:text-white hover:outline-red-500'
            >
              <div className='flex items-end justify-center'>
                <p className='text-sm sm:text-base'>변경 취소</p>
              </div>
            </Button>
          </div>
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
export default MyInfoChangePage;
