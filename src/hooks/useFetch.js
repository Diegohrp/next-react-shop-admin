import React from 'react';
import axios from 'axios';
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
  }, []);
  //Retornamos la data de la petición
  return data;
}

export {useFetch};
