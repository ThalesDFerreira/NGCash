import Header from '../components/Header';
import React, { useState } from 'react';

const Home = () => {
  const [logged, setLogin] = useState(false);
  return (
    <>
      <Header setLogin={setLogin} logged={logged} />
      <section className='user-login-area'>
        <h1 className='text-center fs-1 lh-base w-auto p-3'>
          Bem-Vindo à NG CASH
        </h1>
        <p className='text-center text-break lh-1 font-monospace w-auto p-3 h-auto d-inline-block'>
          Somos o app financeiro da Nova Geração!
        </p>
        <p className='text-center text-break lh-1 font-monospace w-auto p-3 h-auto d-inline-block'>
          Uma plataforma tecnológica com tudo o que é
        </p>
        <p className='text-center text-break lh-1 font-monospace w-auto p-3 h-auto d-inline-block'>
          necessário para dar início à uma vida financeira responsável e
          controlada.
        </p>
        <p className='text-center text-break lh-1 font-monospace w-auto p-3 h-auto d-inline-block'>
          Venha fazer parte dessa Nova Geração!
        </p>
        <p className='text-center text-break lh-1 w-auto p-3 h-auto d-inline-block'>
          Cadastre-se agora e ganhe um bônus de R$ 100,00!
        </p>
      </section>
    </>
  );
};

export default Home;
