import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector, shallowEqual } from 'react-redux';
// import { getAuth, login } from '../store/auth/slice';

type AuthmiddlewareProps = {
  children: React.ReactNode;
};

const Authmiddleware = (props: AuthmiddlewareProps) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');

  // const dispatch = useDispatch();
  // const { auth } = useSelector(
  //   (state) => ({
  //     auth: state.Auth.authen.data,
  //   }),
  //   shallowEqual
  // );

  useEffect(() => {
    const getAuthentication = async () => {
      try {
        if (!token) {
          navigate('/login');
        }
      } catch (error) {
        if (token) {
          // dispatch(getAuth());
        }
      }
    };
    getAuthentication();
  }, [token, navigate]);

  // useEffect(() => {
  //   if (auth && !auth.success) {
  //     dispatch(login());
  //   }
  // }, [auth, dispatch, navigate]);

  return <React.Fragment>{props.children}</React.Fragment>;
};

export default Authmiddleware;
