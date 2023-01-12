import React from 'react';
import { useNavigate } from 'react-router-dom';
import { untitled, exitToAppImg } from '../images';
import { ILogin } from '../interfaces/interfaces';
import '../styles/components/header.css';

const Header = ({ logged, setLogin }: ILogin) => {
  const navigate = useNavigate();

  const logoff = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setLogin(false);
    navigate('/');
  };

  const redirectRegister = () => {
    navigate('/register');
  };

  const redirectLogin = () => {
    navigate('/login');
  };

  return (
    <header className='common-header'>
      <div className='image-content'>
        <img
          className='image img-fluid img-thumbnail'
          src={untitled}
          alt='NG-Cash'
        />
      </div>
      <div>
        {logged ? (
          <div className='div-btn-content d-flex p-2 position-absolute top-0 end-0 hstack gap-3'>
            <button
              type='button'
              className='btn btn-danger'
              onClick={() => logoff()}
            >
              Sair
              <img src={exitToAppImg} alt='Sair do aplicativo' />
            </button>
          </div>
        ) : (
          <div className='div-btn-content d-flex p-2 position-absolute top-0 end-0 hstack gap-3'>
            <button
              type='button'
              className='btn btn-dark'
              onClick={() => redirectRegister()}
            >
              Cadastre-se
            </button>
            <button
              type='button'
              className='btn btn-success'
              onClick={() => redirectLogin()}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
