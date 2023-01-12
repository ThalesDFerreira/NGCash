import React, { useState } from 'react';
import Header from '../components/Header';
import BalanceUser from '../components/BalanceUser';
import TransactionsForm from '../components/TransactionsForm';
import TableTransactions from '../components/TableTransactions';
import '../styles/pages/register.css';

const Transactions = () => {
  const [logged, setLogin] = useState(true);

  return (
    <>
      <Header setLogin={setLogin} logged={logged} />
      <BalanceUser />
      <TransactionsForm />
      <TableTransactions />
    </>
  );
};

export default Transactions;
