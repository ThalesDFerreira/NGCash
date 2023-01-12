import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';
import { requestTableTransactions, requestData } from '../services/requests';
import '../styles/components/tableTransactions.css';

const TableTransactions = () => {
  const [arrayTransactions, setArrayTransactions] = useState([]);
  const [failedTryTransactions, setFailedTryTransactions] = useState(false);
  const [checkedCheckBox, setCheckedCheckBox] = useState('');
  const [inputDate, setInputDateDate] = useState('');

  const tableTransactions = async (event: any) => {
    event.preventDefault();

    const data = await requestTableTransactions('transaction/any-transactions');

    if (data[0]?.createdAt) {
      setFailedTryTransactions(false);
      setArrayTransactions(data);
      return;
    }
    setArrayTransactions([]);
    setFailedTryTransactions(true);
    return;
  };

  const applayFiltring = async (event: any) => {
    event.preventDefault();

    if (checkedCheckBox === 'cash-in' && inputDate === '') {
      const dataCashIn = await requestData('transaction/cash-in');

      if (dataCashIn[0]?.createdAt) {
        setFailedTryTransactions(false);
        return setArrayTransactions(dataCashIn);
      }
      setArrayTransactions([]);
      return setFailedTryTransactions(true);
    }

    if (checkedCheckBox === 'cash-in' && inputDate !== '') {
      const dataCashInDate = await requestData(
        `transaction/cash-in?date=${inputDate}`
      );

      if (dataCashInDate[0]?.createdAt) {
        setFailedTryTransactions(false);
        return setArrayTransactions(dataCashInDate);
      }
      setArrayTransactions([]);
      return setFailedTryTransactions(true);
    }

    if (checkedCheckBox === 'cash-out' && inputDate === '') {
      const dataCashOut = await requestData('transaction/cash-out');

      if (dataCashOut[0]?.createdAt) {
        setFailedTryTransactions(false);
        return setArrayTransactions(dataCashOut);
      }
      setArrayTransactions([]);
      return setFailedTryTransactions(true);
    }

    if (checkedCheckBox === 'cash-out' && inputDate !== '') {
      const dataCashOutDate = await requestData(
        `transaction/cash-out?date=${inputDate}`
      );

      if (dataCashOutDate[0]?.createdAt) {
        setFailedTryTransactions(false);
        return setArrayTransactions(dataCashOutDate);
      }
      setArrayTransactions([]);
      return setFailedTryTransactions(true);
    }
  };

  return (
    <section className='table-transactions-container'>
      <div>
        <h1>Histórico de Transferências NG-Cash</h1>
        <div>
          <button type='button' className='btn btn-info' onClick={(event) => tableTransactions(event)}>
            Extrato de Todas Transações
          </button>
          <form>
            <h3>Filtrar Histórico de Transferências</h3>
            <label htmlFor='cash-in-input'>
              <input
                className='cash-in-input'
                name='cashin-and-cashout'
                type='radio'
                value='cash-in'
                onChange={({ target: { value } }) => setCheckedCheckBox(value)}
                id='cash-in-input'
              />
              Entradas
            </label>
            <label htmlFor='cash-out-input'>
              <input
                className='cash-out-input'
                name='cashin-and-cashout'
                type='radio'
                value='cash-out'
                onChange={({ target: { value } }) => setCheckedCheckBox(value)}
                id='cash-out-input'
              />
              Saídas
            </label>
            <label htmlFor='cash-out-input'>
              <input
                className='cash-out-input'
                type='date'
                onChange={({ target: { value } }) => setInputDateDate(value)}
                id='cash-out-input'
              />
            </label>
            <button type='submit' className='btn btn-secondary' onClick={(event) => applayFiltring(event)}>
              Pesquisar
            </button>
          </form>
        </div>
        <div className='table-responsive-sm'>
          <>
            {failedTryTransactions ? (
              <div>
                <p>
                  Até o momento você não não possui Histórico de Transferências
                  na NG-Cash
                </p>
              </div>
            ) : (
              arrayTransactions.map((tr) => {
                const {
                  id,
                  debitedAccountId,
                  creditedAccountId,
                  value,
                  createdAt,
                } = tr;
                return (
                  <table className='table table-sm table-dark' key={id}>
                    <thead>
                      <tr>
                        <th scope='col'>ID</th>
                        <th scope='col'>Conta Debitada</th>
                        <th scope='col'>Conta Creditada</th>
                        <th scope='col'>Valor</th>
                        <th scope='col'>Data da Transação</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope='row'>{id}</th>
                        <td>{debitedAccountId}</td>
                        <td>{creditedAccountId}</td>
                        <td>{value}</td>
                        <td>{moment(createdAt).format('L')}</td>
                      </tr>
                    </tbody>
                  </table>
                );
              })
            )}
          </>
        </div>
      </div>
    </section>
  );
};

export default TableTransactions;
