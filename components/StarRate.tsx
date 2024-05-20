interface IStarRate {
  rate: number;
}

function StarRate({ rate }: IStarRate) {
  return (
    <div className='grid grid-flow-col grid-col-auto gap-5'>
      <img src='/icon_star--black.svg' className='w-16 h-16' />
      {rate >= 2 ? (
        <img src='/icon_star--black.svg' className='w-16 h-16' />
      ) : rate > 1 ? (
        <img src='/icon_star--halfblack.svg' className='w-16 h-16' />
      ) : (
        <img src='/icon_star--gray.svg' className='w-16 h-16' />
      )}
      {rate >= 3 ? (
        <img src='/icon_star--black.svg' className='w-16 h-16' />
      ) : rate > 2 ? (
        <img src='/icon_star--halfblack.svg' className='w-16 h-16' />
      ) : (
        <img src='/icon_star--gray.svg' className='w-16 h-16' />
      )}
      {rate >= 4 ? (
        <img src='/icon_star--black.svg' className='w-16 h-16' />
      ) : rate > 3 ? (
        <img src='/icon_star--halfblack.svg' className='w-16 h-16' />
      ) : (
        <img src='/icon_star--gray.svg' className='w-16 h-16' />
      )}
      {rate === 5 ? (
        <img src='/icon_star--black.svg' className='w-16 h-16' />
      ) : rate > 4 ? (
        <img src='/icon_star--halfblack.svg' className='w-16 h-16' />
      ) : (
        <img src='/icon_star--gray.svg' className='w-16 h-16' />
      )}
    </div>
  );
}

export default StarRate;
