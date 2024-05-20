import { useRouter } from 'next/router';

function Custom500() {
  const router = useRouter();
  const logout = () => {
    localStorage.removeItem('terminalStoreID');
    localStorage.removeItem('terminalUserID');
    localStorage.removeItem('terminalUserToken');
    router.push('/');
  };

  return (
    <>
      <main>
        <div className='container flex justify-between items-center w-screen h-screen min-h-788'>
          <h1 className='pl-75 text-56 text-black leading-60 font-bold'>
            Внутренняя <br />
            ошибка сервера <br />
            <small className='block mt-35 text-30 leading-40 text-opacity-60 font-normal'>
              Мы все знаем.
              <br /> Совсем скоро все
              <br /> будет хорошо!
              <br />
              <button onClick={() => logout()} className='text-red-500 hover:text-red-400 focus:text-red-600 text-left'>
                На главную страницу.
              </button>
            </small>
          </h1>
          <img src='/illustration_500.svg' className='w-950 h-619' />
        </div>
      </main>
    </>
  );
}

export default Custom500;
