import React from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';
import {endPoints} from '@services/api/index';

//Creamos el contexto
const AuthContext = React.createContext();

function ProviderAuth({children}) {
  //Auth es el value que se le pasa al provider
  //En value se manda el estado global de la aplicación
  const auth = useProviderAuth();
  //Provider para envolver la aplicación
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
//Retorna el estado global almacenado en el contexto AuthContext
function useAuth() {
  return React.useContext(AuthContext);
}

function useProviderAuth() {
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
      //Cookie.set("nombre",valor,{expira:tiempo});
      Cookie.set('token', data.access_token, {expires: 5});
    }

    return data;
  };
  //Esto se retorna a auth para pasarse al value del provider y así acceder a esta info
  //Desde cualquier parte de la aplicación
  return {
    user,
    signIn,
  };
}

export {ProviderAuth, useAuth};
