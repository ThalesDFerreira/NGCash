import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { requestTransaction } from '../services/requests';
import '../styles/components/transactionsForm.css';

const TransactionsForm = () => {
  const [username, setUsername] = useState('');
  const [value, setValue] = useState(0);
  const [failedTryTransfer, setFailedTryTransfer] = useState(false);

  const transactionForm = async (event: any) => {
    event.preventDefault();

    const data = await requestTransaction('transaction', {
      username: username,
      value: value,
    });

    if (data.createdAt) {
      setFailedTryTransfer(false);
      return toast.success('Transação Realizada com Sucesso!');
    }
    setFailedTryTransfer(true);
    return toast.error(`${data.message}`);
  };

  return (
    <>
      <section className='transaction-form-container'>
        <form>
          <h1>Faça sua Transferencia aqui!</h1>
          <label htmlFor='username-input'>
            <input
              className='login__login_input input-group mb-3'
              type='text'
              value={username}
              onChange={({ target: { value } }) => setUsername(value)}
              data-testid='login__login_input'
              placeholder='Usuário'
            />
          </label>
          <label htmlFor='value-input'>
            <input
              className='login__login_input input-group mb-3'
              type='number'
              value={value}
              min='0'
              onChange={({ target: { value } }) => setValue(Number(value))}
              data-testid='login__password_input'
            />
          </label>
          {failedTryTransfer ? (
            <p data-testid='login__input_invalid_login_alert'>
              {`Transferencia não Realizada! Tente novamente!`}
            </p>
          ) : null}
          <button
            className='btn btn-primary'
            data-testid='login__login_btn'
            type='submit'
            onClick={(event) => transactionForm(event)}
          >
            Enviar Transação
          </button>
        </form>
      </section>
      <hr />
    </>
  );
};

export default TransactionsForm;
