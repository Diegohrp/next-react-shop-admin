import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import {endPoints} from '@services/api/index';

function useAuthState() {
  const [user, setUser] = React.useState(null);

  const signIn = async (email, password) => {
    //Options, indicamos que la info estará en formato Json
    const options = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    };
    //Axios devuelve un objeto con un elemento llamado data
    //axios.post(endpoint,infoAMandar,options)
    const {data} = await axios.post(
      endPoints.auth.login,
      {email, password},
      options
    );
    //data también es un objeto
    //La API nos devuelve un access token
    //Validamos si existe el access token y lo guardamos en una Cookie
    if (data.access_token) {
      const token = data.access_token;
      //Cookie.set("nombre",valor,{expira:tiempo});
      Cookies.set('token', token, {expires: 5});
      //Añadimos el token al header de las peticiones como bearer token
      //Es decir, un token de acceso o autorización
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      //Solicitamos los datos del usuario en una nueva petición
      const {data: userLogged} = await axios.get(endPoints.auth.profile);
      setUser(userLogged);
    }

    return data;
  };

  const logOut = () => {
    Cookies.remove('token');
    setUser(null);
    delete axios.defaults.headers.Authorization;
    window.location.href = '/login';
  };

  return {
    user,
    signIn,
    logOut,
  };
}

export {useAuthState};
