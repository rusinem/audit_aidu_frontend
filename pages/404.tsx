import { useRouter } from 'next/router';

function Custom404() {
  const router = useRouter();

  return (
    <main>
      <div className='container flex justify-between items-center w-screen h-screen min-h-788'>
        <h1 className='pl-75 text-56 text-black leading-60 font-bold'>
          Страница <br />
          не найдена <br />
          <small className='block mt-35 text-30 leading-40 text-opacity-60 font-normal'>
            Страница, на которую
            <br /> вы хотели перейти,
            <br /> не найдена.
            <br />{' '}
            <button onClick={() => router.back()} className='text-red-500 hover:text-red-400 focus:text-red-600'>
              Вернуться назад.
            </button>
          </small>
        </h1>
        <img src='/illustration_404.svg' className='w-890 h-645' />
      </div>
    </main>
  );
}

export default Custom404;
