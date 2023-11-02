import { usePocketData } from '@/api/usePocketData';
import { getPbImageURL } from '@/utils/getPbImageURL';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';

function LeisureListPage() {
  const { getListData: getExhibitionListData } = usePocketData('exhibitionList');
  const { data: exhibitionListData } = useQuery(['exhibitionList'], () =>
    getExhibitionListData({ sort: 'created' }),
  );

  return (
    <>
      <Header className='ml-10 text-xl font-semibold' back='back' search='search' cart='cart' />
      <section className='mx-5 pb-20'>
        <h2 className='mb-3 text-[25px] font-bold'>기획전</h2>
        {exhibitionListData?.map((item) => (
          <article
            key={item.id}
            style={{
              backgroundImage: `url(${getPbImageURL(item, 'photo')})`,
            }}
            className='mb-3 flex h-[158px] flex-col justify-end bg-contain px-5 py-3'
          >
            {/* <img src={getPbImageURL(item, 'photo')} alt={item.title} /> */}
            <ul className=' text-white'>
              {item.label && (
                <li className='inline rounded-[2px] bg-[#9a5ed2] px-1 py-[2px] text-[10px] text-white'>
                  {item.label}
                </li>
              )}
              <li className='text-[20px] font-bold'>{item.title}</li>
              <li className='text-[12px]'>{item.subTitle}</li>
            </ul>
          </article>
        ))}
      </section>
    </>
  );
}

export default LeisureListPage;
