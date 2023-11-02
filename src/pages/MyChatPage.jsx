import { toast, Toaster } from 'react-hot-toast';
import { useState, useRef, useEffect } from 'react';
import { getPbImageURL } from '@/utils/getPbImageURL';
import Header from '@/components/Header';
import useAuthStore from '@/store/useAuthStore';
import pb from '@/api/pocketbase';
import Guest from '@/components/Guest';
import MyInput from '@/components/MyInput';
import MetaTag from '@/components/MetaTag';
import MyChatMessage from '@/components/MyChatMessage';

function MyChatPage() {
  const isAuth = useAuthStore((state) => state.isAuth);
  const user = useAuthStore((state) => state.user);
  const inputRef = useRef();
  const chatRef = useRef();
  const fileInputRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isFileButtonClicked, setIsFileButtonClicked] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    async function realtimeChat() {
      await pb.collection('chats').subscribe('*', async ({ action, record }) => {
        if (action === 'create') {
          try {
            const user = await pb.collection('users').getOne(record.user);
            record.expand = user;
            setMessages((prev) => [...prev, record]);
          } catch (error) {
            console.error('Failed to get user data:', error);
          }
        }
      });
    }

    realtimeChat();

    return () => {
      pb.collection('chats').unsubscribe('*');
    };
  }, []);

  const handleImageClick = (message) => {
    const imageUrl = getPbImageURL(message, 'img');
    setModalImageUrl(imageUrl);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    setIsUploading(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
      setIsUploading(false);
    };

    reader.readAsDataURL(file);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (inputRef.current.value !== '' || previewUrl) {
      try {
        setIsSending(true);
        await pb.collection('chats').create({
          text: inputRef.current.value,
          img: fileInputRef.current.files[0],
          user: user.id,
        });

        inputRef.current.value = '';
        setPreviewUrl(null);
        fileInputRef.current.value = '';
      } catch (error) {
        console.error('Failed to send message:', error);
      } finally {
        setIsSending(false);
      }
    }
  };

  useEffect(() => {
    if (isSending) {
      toast.error('입력 시간이 너무 빠릅니다. 기다려 주세요.');
    }
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <MetaTag title='상담원 채팅' description='상담원 채팅' />
      <Header
        search='search'
        back='back'
        cart='cart'
        title='상담원 채팅'
        className='ml-10 text-xl font-semibold'
      ></Header>
      {!isAuth && <Guest></Guest>}
      {isAuth && (
        <>
          <section className='absolute left-1/2 top-1/2 h-[77%] w-[90%] -translate-x-1/2 -translate-y-1/2  transform rounded-3xl bg-lightPurple  shadow-lg sm:max-w-[500px]'>
            <article className='absolute left-1/2 top-1/2 mb-3 h-[95%] w-[93%] -translate-x-1/2 -translate-y-1/2 transform rounded-3xl py-8'>
              <div className='absolute left-1/2 top-[53%] h-[95%] w-[100%] -translate-x-1/2 -translate-y-1/2 transform rounded-2xl bg-white'>
                <div className='absolute left-1/2 top-[50%] h-[93%] w-[91%] -translate-x-1/2 -translate-y-1/2 transform  '>
                  <ul className=''>
                    <li
                      className=' absolute left-1/2 top-[50%] h-[100%] w-[100%] -translate-x-1/2 -translate-y-1/2 transform overflow-scroll pb-6'
                      ref={chatRef}
                    >
                      {messages.map((message, index) => (
                        <div key={index}>
                          <MyChatMessage message={message.text} date={message.created.slice(0, 10)}>
                            {message.img && (
                              <div className='m-2 flex h-12 w-12 items-center align-middle'>
                                <img
                                  src={getPbImageURL(message, 'img')}
                                  alt=''
                                  className='h-full w-full cursor-pointer object-cover'
                                  onClick={() => handleImageClick(message)}
                                />
                              </div>
                            )}
                          </MyChatMessage>
                        </div>
                      ))}
                    </li>
                    {isModalOpen && (
                      <div
                        className='absolute left-1/2 top-1/2 z-50 flex h-full w-full -translate-x-1/2 -translate-y-1/2 transform items-center justify-center bg-black bg-opacity-10 align-middle'
                        onClick={closeModal}
                      >
                        <img
                          src={modalImageUrl}
                          alt=''
                          className='max-h-[80%] max-w-[80%] object-contain'
                        />
                      </div>
                    )}
                    <li>
                      {/* 인풋 컨테이너 */}
                      <div className='absolute bottom-0 left-0 w-full bg-white'>
                        <div className='flex'>
                          <button
                            type='file'
                            onClick={async () => {
                              setIsFileButtonClicked(true);
                              await fileInputRef.current.click();
                              setIsFileButtonClicked(false);
                            }}
                            className={`${isFileButtonClicked ? 'active' : ''}`}
                          >
                            <img
                              src={
                                (isModalOpen && previewUrl) || isInputFocused || isFileButtonClicked
                                  ? '/my-plusactive.svg'
                                  : '/my-plus.svg'
                              }
                              alt='파일추가'
                              className={`w-4 fill-secondary hover:fill-primary`}
                            />
                            <input
                              type='file'
                              ref={fileInputRef}
                              className='sr-only'
                              onChange={handleFileChange}
                            />
                          </button>
                          {previewUrl && (
                            <div className='absolute top-[-100px] z-40 h-24 w-24 rounded-sm bg-slate-200 p-2 shadow-md'>
                              <button
                                onClick={() => setPreviewUrl(null)}
                                className='absolute left-[-5px] top-[-15px] h-2 w-2 align-middle text-xl text-primary '
                              >
                                x
                              </button>

                              <img
                                src={previewUrl}
                                alt='Preview'
                                className='h-full w-full object-cover'
                              />
                            </div>
                          )}
                          <div className='relative w-full pl-3'>
                            <form action='' onSubmit={handleSendMessage} className=' flex w-full'>
                              <MyInput
                                ref={inputRef}
                                id='newchat'
                                placeholder=''
                                label='채팅입력'
                                labelClass='sr-only'
                                onFocus={() => setIsInputFocused(true)}
                                onBlur={() => setIsInputFocused(false)}
                                className={`${
                                  (previewUrl && 'border-secondary') ||
                                  (previewUrl && 'border-primary')
                                } min-h-[25px] w-full rounded-xl border-[1px] border-secondary bg-lightPurple pl-2 pr-8 shadow-md sm:h-[30px] sm:rounded-2xl`}
                              ></MyInput>
                              <button
                                disabled={isSending || isUploading}
                                className={`${
                                  isModalOpen || isInputFocused
                                    ? 'text-primary-active'
                                    : ':text-primary'
                                } absolute right-[10px] top-[5px] sm:top-[7px]`}
                                type='submit'
                              >
                                <img
                                  src={
                                    isModalOpen || isInputFocused
                                      ? '/my-paperplaneactive.svg'
                                      : '/my-paperplane.svg'
                                  }
                                  alt='채팅보내기'
                                  className={`w-4`}
                                />
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </article>
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
      )}
    </>
  );
}
export default MyChatPage;
