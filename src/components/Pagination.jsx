import React, {useState} from 'react';
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/solid';

function Pagination({totalItems, itemsPerPage, paginationLenght, setOffset}) {
  //Elementos numéricos que se mostrarán en el pagination
  const paginationItems = [];

  //Estado para saber la página en la que nos encontramos, inicialmente la 1
  const [currentPage, setCurrentPage] = useState(1);

  /*Calculamos el total de páginas a partir del número de items en la API
    y del número de items que se quieran por página
  */
  const totalPages = Math.round(totalItems / itemsPerPage); //se redondea al entero más cercano

  /*El Pagination es un array que va a cambiar los elementos numéricos que muestra.
    Calculamos el último elemento numérico que mostrará sumando la página actual más el tamaño
    del Pagination y cuando nos encontremos cerca de la última página, cambiamos este cálculo por
    el total de páginas +1. Eso se hace con Math.min()
  */
  const end = Math.min(currentPage + paginationLenght, totalPages + 1);

  /*Para calcular el primer elemento numérico que se mostrará en el Pagination 
    restamos el final menos el tamaño del Pagination
  */
  const start = end - paginationLenght;

  //Si el item del Pagination es la página actual se le agrega las clases que resaltan su color
  const getClassActive = (paginationItem) => {
    return paginationItem === currentPage
      ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50';
  };

  //Se crean los elementos numéricos del Pagination a partir de star y end calculados
  for (let i = start; i < end; i++) {
    paginationItems.push(
      <button
        key={`Paginador-${i}`}
        onClick={() => {
          //Se asigna la página actual modificanto el estado
          setCurrentPage(i);
          /*El offset cambia, al cambiar el offset cambia el endpoint
            y al cambiar el endpoint, como este está como activador del UseEffect en 
            el custom hook useFetch(), se vuelve a hacer una petición, pero ahora con
            el nuevo offset, por lo que se solicitan otros productos
          */
          setOffset((i - 1) * itemsPerPage);
        }}
        href="#"
        aria-current="page"
        className={`${getClassActive(
          i
        )} relative inline-flex items-center px-4 py-2 border text-sm font-medium`}>
        {i}
      </button>
    );
  }

  const prevPage = () => {
    //Validamos que no nos encontremos en la página 1
    if (currentPage > 1) {
      //Le restamos 1 a la página actual y lo asignamos al estado
      //De esta manera volvemos a la página anterior
      setCurrentPage(currentPage - 1);
      //Modificamos el offset
      setOffset((currentPage - 2) * itemsPerPage);
    }
  };

  const nextPage = () => {
    //Validamos que no nos encontremos en la última página
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setOffset(currentPage * itemsPerPage);
    }
  };

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className=" sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{' '}
            <span className="font-medium">
              {itemsPerPage * (currentPage - 1) + 1}
            </span>{' '}
            to{' '}
            <span className="font-medium">
              {currentPage * itemsPerPage < totalItems
                ? currentPage * itemsPerPage
                : totalItems}
            </span>{' '}
            of <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination">
            <button
              onClick={() => prevPage()}
              href="#"
              className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {paginationItems}
            <button
              onClick={() => nextPage()}
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
