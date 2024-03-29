import React from 'react';
import Pagination from '@components/Pagination';
import Modal from '@common/Modal';
import {PlusIcon, ChevronDownIcon, XCircleIcon} from '@heroicons/react/solid';
import {Menu} from '@headlessui/react';
import {FormProduct} from '@components/FormProduct';
import {endPoints} from '@services/api';
import {Alert} from '@common/Alert';
import {useAlert} from '@hooks/useAlert';
import {deleteProduct} from '@services/api/products';
import Link from 'next/link';
import axios from 'axios';

//Parámetro que requiere la API para determinar cuántos productos llamar
const PRODUCTS_LIMIT = 5;

export default function Products() {
  //Para el Alert
  const {alert, setAlert, toggleAlert} = useAlert();

  const [open, setOpen] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [totalProducts, setTotalProducts] = React.useState(0);
  /*El offset es un parámetro que requiere la API que indica a partir 
    de qué producto en la lista de todos los productos, obtener. 
  */
  const [productsOffset, setProductsOffset] = React.useState(0);
  //El Pagination modifica productsOffset, al cambiar de página cambia el offset

  React.useEffect(() => {
    const fetchProducts = async (endPoint, endPointT) => {
      const response = await axios.get(endPoint);
      setProducts(response.data);
      const response2 = await axios.get(endPointT);
      setTotalProducts(response2.data.length);
    };
    try {
      fetchProducts(
        endPoints.products.getProducts(PRODUCTS_LIMIT, productsOffset),
        endPoints.products.getProducts(0, 0)
      );
    } catch (err) {
      console.log(err);
    }
  }, [productsOffset, alert]);

  const handleDelete = (id) => {
    deleteProduct(id)
      .then(() =>
        setAlert({
          active: true,
          message: 'Product deleted successfully',
          type: 'success',
          autoClose: false,
        })
      )
      .catch((err) =>
        setAlert({
          active: true,
          message: err.message,
          type: 'error',
          autoClose: false,
        })
      );
  };

  return (
    <>
      <Alert alert={alert} handleClose={toggleAlert} />
      <div className="lg:flex lg:items-center lg:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            List of products
          </h2>
        </div>
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
          <span className="sm:ml-3">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => setOpen(true)}>
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Add product
            </button>
          </span>

          {/* Dropdown */}
          <Menu as="span" className="ml-3 relative sm:hidden">
            <Menu.Button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              More
              <ChevronDownIcon
                className="-mr-1 ml-2 h-5 w-5 text-gray-500"
                aria-hidden="true"
              />
            </Menu.Button>
          </Menu>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      PRODUCT
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      CATEGORY
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      PRICE
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products?.map((product) => (
                    <tr key={`product-item-id-${product.id}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={product.images[0]}
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {product.title}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {product.category.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          ${product.price}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link href={`/dashboard/edit/${product.id}`}>
                          <div className="text-indigo-600 hover:text-indigo-900 cursor-pointer">
                            Edit
                          </div>
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <XCircleIcon
                          className="flex-shrink-0 h-6 w-6 text-red-500 cursor-pointer"
                          aria-hidden="true"
                          onClick={() => handleDelete(product.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {totalProducts > 0 && (
            <Pagination
              totalItems={totalProducts}
              itemsPerPage={PRODUCTS_LIMIT}
              setOffset={setProductsOffset}
              paginationLenght={3}
            />
          )}
        </div>
        <Modal open={open} setOpen={setOpen}>
          <FormProduct setAlert={setAlert} setOpen={setOpen} />
        </Modal>
      </div>
    </>
  );
}
