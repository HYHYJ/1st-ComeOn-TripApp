import { usePocketData } from '@/api/usePocketData';
import { numberWithComma } from '@/utils/numberWithComma';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useStore from '@/store/zustand';
import useAuthStore from '@/store/useAuthStore';
import Button from './Button';

function CartController({ userId, id }) {
  const { updateData: updateUser } = usePocketData('users');
  const queryClient = useQueryClient();
  const navigation = useNavigate();

  const isAuth = useAuthStore((state) => state.isAuth);

  const handleCart = async () => {
    if (!isAuth) {
      toast(
        (t) => (
          <div className='flex-col items-center gap-5 font-semibold'>
            <div className='text-center text-sm text-accent'>로그인이 필요합니다.</div>
            <div className='text-lg text-primary'>로그인 하시겠습니까?</div>
            <div className='flex justify-between py-2'>
              <Button
                className='rounded-lg bg-primary px-5 py-2 text-white'
                onClick={() => {
                  toast.dismiss(t.id);
                  setTimeout(() => {
                    navigation('/signIn');
                  }, 1000);
                }}
              >
                예
              </Button>
              <Button
                className='rounded-lg bg-accent px-2 py-2 text-white'
                onClick={() => {
                  toast.dismiss();
                }}
              >
                아니오
              </Button>
            </div>
          </div>
        ),
        {
          duration: 2300,
        },
      );
      return;
    }

    await updateUser(userId, {
      'cartLeisure+': carts.map((obj) => obj.id),
    });

    toast.success('장바구니에 담겼습니다.');
    queryClient.invalidateQueries(['users'], id);
  };

  const carts = useStore((state) => state.carts);

  const hasCartItems = carts.length > 0;
  const totalPrice = carts.reduce((total, cart) => {
    return total + (cart.count * cart.price * ((100 - Number(cart.discount)) / 100) ?? 0);
  }, 0);

  return hasCartItems ? (
    <div className='fixed bottom-0 z-[100] flex w-full max-w-3xl flex-col gap-1 border-t-2 border-[#919191] bg-white px-5 py-4 font-bold'>
      <div className='flex items-center justify-between'>
        <span className='text-[14px]'>총 {carts.length}개</span>
        <span className='text-[18px]'>{numberWithComma(totalPrice)}원</span>
      </div>
      <span className='text-end text-[12px] text-[#919191]'>
        결제 단계에서 쿠폰 적용시 추가 할인 가능
      </span>
      <div className='flex justify-between gap-2 font-bold'>
        <button
          className='w-[100%] rounded-[4px] border border-primary px-4 py-2 text-primary'
          onClick={handleCart}
        >
          장바구니 담기
        </button>
      </div>
    </div>
  ) : null;
}

export default CartController;
