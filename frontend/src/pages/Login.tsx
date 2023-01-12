import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import { requestLogin, setToken } from '../services/requests';
import { useNavigate } from 'react-router-dom';
import { logoNg } from '../images';
import '../styles/pages/login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [failedTryLogin, setFailedTryLogin] = useState(false);

  const navigate = useNavigate();

  const redirectStart = () => {
    navigate('/');
  };

  const login = async (event: any) => {
    event.preventDefault();

    const token = await requestLogin('login', {
      username: username,
      password: password,
    });

    if (typeof token !== 'string') {
      setFailedTryLogin(true);
      setIsLogged(false);
      return toast.error(`${token.message}`);
    }
    setToken(token);
    setIsLogged(true);
    localStorage.setItem('username', username);
    return toast.success('Usuário Logado com Sucesso!');
  };

  useEffect(() => {
    setFailedTryLogin(false);
  }, [username, password]);

  if (isLogged) return <Navigate to='/transactions' />;

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
      <section className='user-login-area'>
        <img src={logoNg} alt='NGlogo' />
        <form>
          <h1>Área do usuário</h1>
          <label htmlFor='username-input'>
            <input
              className='login__login_input'
              type='text'
              value={username}
              onChange={({ target: { value } }) => setUsername(value)}
              data-testid='login__login_input'
              placeholder='Login'
            />
          </label>
          <label htmlFor='password-input'>
            <input
              type='password'
              value={password}
              onChange={({ target: { value } }) => setPassword(value)}
              data-testid='login__password_input'
              placeholder='Senha'
            />
          </label>
          {failedTryLogin ? (
            <p data-testid='login__input_invalid_login_alert'>
              {`O nome de usuário ou a senha não estão corretos.
                    Por favor, tente novamente.`}
            </p>
          ) : null}
          <button
            data-testid='login__login_btn'
            type='submit'
            onClick={(event) => login(event)}
          >
            Entrar
          </button>
        </form>
      </section>
    </>
  );
};

export default Login;
