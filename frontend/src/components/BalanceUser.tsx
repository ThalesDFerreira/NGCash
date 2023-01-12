import React, { useState, useEffect } from 'react';
import { requestData } from '../services/requests';
import '../styles/components/balanceUser.css';

const BalanceUser = () => {
  const [balance, setBalance] = useState(0);

  const user = localStorage.getItem('username');

  const vewierBalanceUser = async () => {
    const data = await requestData('account');
    if (data) {
      return setBalance(data.balance);
    }
  };

  useEffect(() => {
    vewierBalanceUser();
  }, []);

  return (
    <section className='common-user-balance position-absolute top-0 end-0'>
      <div>
        <h1>{`Usuário: ${user?.toUpperCase()}`}</h1>
      </div>
      <div>
        <h2>{`Saldo Atual: R$ ${balance}`}</h2>
      </div>
    </section>
  );
};

export default BalanceUser;
