import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import { requestRegister } from '../services/requests';
import { useNavigate } from 'react-router-dom';
import { logoNg } from '../images';
import '../styles/pages/register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistred, setIsRegistred] = useState(false);
  const [failedTryRegistred, setFailedTryRefistred] = useState(false);

  const navigate = useNavigate();

  const redirectStart = () => {
    navigate('/');
  };

  const register = async (event: any) => {
    event.preventDefault();

    const body = await requestRegister('register', {
      username: username,
      password: password,
    });
    if (!body?.username) {
      setFailedTryRefistred(true);
      setIsRegistred(false);
      return toast.error(`${body.message}`);
    }
    localStorage.setItem('username', body.username);
    setIsRegistred(true);
    return toast.success('Usuário Cadastrado com Sucesso!');
  };

  useEffect(() => {
    setFailedTryRefistred(false);
  }, [username, password]);

  if (isRegistred) return <Navigate to='/' />;

  return (
    <>
      <div className='div-btn-content d-flex p-2 position-absolute top-0 end-0 hstack gap-3'>
        <button
          type='button'
          className='btn btn-secondary'
          onClick={() => redirectStart()}
        >
          Página Inicial
        </button>
      </div>
      <section className='register-user-area'>
        <img src={logoNg} alt='NGlogo' />
        <form>
          <h1>Área de cadastro</h1>
          <label htmlFor='username-input'>
            <input
              className='username_input'
              type='text'
              value={username}
              onChange={({ target: { value } }) => setUsername(value)}
              data-testid='username_input'
              placeholder='Usuário'
            />
          </label>
          <label htmlFor='password-input'>
            <input
              type='password'
              value={password}
              onChange={({ target: { value } }) => setPassword(value)}
              data-testid='register_password_input'
              placeholder='Senha'
            />
          </label>
          <p>
            A senha deve conter :<br />
            ao menos um dígito <br />
            ao menos uma letra minúscula<br />
            ao menos uma letra maiúscula<br />
            ao menos 8 dos caracteres mencionados
          </p>
          {failedTryRegistred ? (
            <p data-testid='register_alert'>
              {`O nome de usuário deve conter no mínimo 3 caracteres;
              A senha 8 dígitos (contendo pelo menos um número, uma letra maiúscula e uma letra minúscula);
                    Por favor, tente novamente!`}
            </p>
          ) : null}
          <button
            data-testid='register_btn'
            type='submit'
            onClick={(event) => register(event)}
          >
            Cadastrar
          </button>
        </form>
      </section>
    </>
  );
};

export default Register;
