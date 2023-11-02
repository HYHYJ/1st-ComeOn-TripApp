import Button from './Button';
import PropTypes from 'prop-types';

function HotelReviewEdit({ isShow, reviewRef, handleSubmitReview, handleShowReview }) {
  return (
    <>
      <div className='flex justify-end'>
        {isShow ? null : (
          <Button className='rounded bg-primary px-3 py-2 text-white' onClick={handleShowReview}>
            리뷰 쓰기
          </Button>
        )}
      </div>

      {isShow && (
        <form onSubmit={handleSubmitReview} className='pb-10'>
          <textarea
            ref={reviewRef}
            name='review'
            id='review'
            className='h-24 w-full resize-none rounded bg-lightPurple p-4 outline-secondary'
            maxLength='200'
          />
          <div className='flex justify-end gap-4 pt-2'>
            <Button type='submit' className='rounded bg-primary px-2 py-1 text-white'>
              등록하기
            </Button>
            <Button
              type='button'
              className='rounded bg-accent px-2 py-1 text-white'
              onClick={handleShowReview}
            >
              취소하기
            </Button>
          </div>
        </form>
      )}
    </>
  );
}
export default HotelReviewEdit;

HotelReviewEdit.propTypes = {
  isShow: PropTypes.bool,
  reviewRef: PropTypes.any,
  handleSubmitReview: PropTypes.func,
  handleShowReview: PropTypes.func,
};
