import React from 'react';
import axios from 'axios';
import {useAlert} from './useAlert';
//Custom Hook para hacer peticiones de los productos
function useFetch(endpoint) {
  //Creamos el estado donde guardaremos la data de la petición
  const [data, setData] = React.useState([]);

  //Se hace la petición, se usa asincronismo
  const fetchData = async () => {
    //Método get en axios y se le manda el endpoint
    const response = await axios.get(endpoint);
    /*La info de la respuesta a la petición es la que
      se guarda en el estado
    */
    setData(response.data);
  };

  React.useEffect(() => {
    //Llamamos la función fetchData();
    //Como es asíncrona, utilizamos try-catch
    try {
      fetchData();
    } catch (err) {
      console.log(err);
    }
    //Si el endpoint cambia, se vuelve a ejecutar el UseEffect, se hace la petición de nuevo
    //Cuando el estado del alert cambia, se debió añadir un nuevo producto
    //Entonces se hace la petición de nuevo
  }, [endpoint]);
  //Retornamos la data de la petición
  return data;
}

export {useFetch};
