import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { usePocketData } from '@/api/usePocketData';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Guest from '@/components/Guest';
import Header from '@/components/Header';
import Button from '@/components/Button';
import MyList from '@/components/MyList';
import Spinner from '@/components/Spinner';
import MetaTag from '@/components/MetaTag';
import useAuthStore from '@/store/useAuthStore';
import MySelecModal from '@/components/MySelecModal';
import MyCircleProfile from '@/components/MyCircleProfile';

function MyQnaPage() {
  const isAuth = useAuthStore((state) => state.isAuth);
  const user = useAuthStore((state) => state.user);
  const { getIdData: getUser } = usePocketData('users');
  const { deleteData: deleteQna } = usePocketData('qna');

  const id = user?.id;
  const queryClient = useQueryClient();

  const getPbImageURL = (item, fileName = 'img') => {
    if (item && item[fileName]) {
      return `${import.meta.env.VITE_PB_API}/files/${item.collectionId}/${item.id}/${
        item[fileName]
      }`;
    } else {
      return '/Myzipedairplane.jpg';
    }
  };

  const { data: userData, isLoading } = useQuery(['userQna', id], () =>
    getUser(id, { expand: 'qna' }),
  );

  const qnaData = userData?.expand?.qna;

  useEffect(() => {
    if (!qnaData || qnaData.length === 0) {
      toast('❌ 작성된 QnA가 없습니다.');
    } else {
      toast.success('가져오는 중');
    }
  }, [qnaData]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteQna(selectedItem.id);
      toast.success('삭제 완료');
      queryClient.invalidateQueries(['userQna', id]);
      setIsModalOpen(false);
    } catch (error) {
      toast.error('삭제에 실패했습니다.');
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <MetaTag title='1:1문의 내역' description='1:1문의 내역' />
      <Header
        search='search'
        back='back'
        cart='cart'
        title='1:1문의 내역'
        className='ml-10 text-xl font-semibold'
      ></Header>
      {!isAuth && <Guest></Guest>}
      {isAuth && (
        <>
          <MyCircleProfile
            towhere='/mypage'
            src={getPbImageURL(user, 'avatar')}
            imgpath='/ad.png'
            imgalt='프로필사진'
          ></MyCircleProfile>

          <section className='box-border flex  justify-center pb-20'>
            <ul className=' box-border h-auto w-2/3 rounded-2xl bg-lightPurple px-3 pb-1 pt-4 text-sm'>
              <li className='box-border flex flex-row items-center justify-between  pb-3 text-primary'>
                <div className='font-semibold'>문의 내역 ({qnaData?.length || '0'})</div>
                <Link to='mynewqna' tabIndex='-1'>
                  <Button type='button' className='rounded-md bg-primary px-1 text-white'>
                    문의하기
                  </Button>
                </Link>
              </li>

              {qnaData &&
                qnaData.length > 0 &&
                [...qnaData]

                  .sort((a, b) => new Date(b.created) - new Date(a.created))
                  .map((item) => (
                    <MyList
                      link={`/MyQnaDetailPage/${item.id}`}
                      key={item.id}
                      flexbetween='flex justify-between'
                      src={getPbImageURL(item, 'img')}
                      handler=''
                      title={item.title}
                      second={item.text}
                      date={item.created.slice(0, 10)}
                      className0='justify-start'
                      className2=' box-border text-xs line-clamp-2 h-[30px] sm:line-clamp-3 sm:h-[60px] sm:text-sm'
                      className3='box-border text-xs sm:text-sm'
                    >
                      <button
                        className='
          h-4 w-4 rounded-full border-[1px]
        border-transparent text-center text-xs text-black hover:w-8 hover:border-primary hover:bg-lightPurple'
                        onClick={() => {
                          setSelectedItem(item);
                          setIsModalOpen(true);
                        }}
                      >
                        ❌ <span className='sr-only'>삭제하기</span>
                      </button>
                    </MyList>
                  ))}
              {isModalOpen && (
                <MySelecModal
                  onClose={() => setIsModalOpen(false)}
                  option1='취소'
                  option2='삭제'
                  onOption2={handleDelete}
                  onOption1={() => setIsModalOpen(false)}
                >
                  <div>진짜로</div>
                  <div className='overflow-hidden overflow-ellipsis whitespace-nowrap text-2xl text-primary'>
                    {selectedItem?.title}
                  </div>
                  <div>항목을 삭제하시겠습니까?</div>
                  <div>삭제시 복구 불가합니다</div>
                </MySelecModal>
              )}
            </ul>
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
export default MyQnaPage;
