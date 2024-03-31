import React, { useState,useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import ProductModelPopup from './ProductModelPopup';
import  Sidebar  from "../Sidebar";
import APICall from "../network/apiCall";
import toast from "react-hot-toast";
import EditProductModal from './EditProductModal'; // Import the modal component

const ProductList = () => {
    const [filter, setFilter] = useState({ page: 1 });
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        fetchProducts(filter);
      }, [filter]);
    
      const fetchProducts = async (filter) => {
        APICall("get", filter, "products")
          .then((res) => {
            setProducts(res?.data);
          })
          .catch((err) => {
            toast.error(err?.response?.message);
          });
      };
    
    const itemsPerPage = 5;

    const totalPages = Math.ceil(products.length / itemsPerPage);


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handlePopupOpen = () => {
        setIsPopupOpen(true);
    };

    const handlePopupClose = () => {
        setIsPopupOpen(false);
    };

    const handleFormSubmit = (formData) => {

        const payload = {
            description: formData?.description,
            name: formData?.name,
            price: parseInt(formData?.price),
            quantity: parseInt(formData?.quantity),
        };
        APICall("post", payload, `products`)
          .then((res) => {
            if (res?.status_code===422) {
              toast.error(res?.message);
            }else{
              toast.success("Product Created Successfully");
              fetchProducts(filter);
              setIsPopupOpen(false)
            }
          })
          .catch((err) => {
            toast.error(err?.response?.message);
          });
    };

    const handleEditProduct = (id) => {
        console.log('Edit product', id);
    };


    const closeEditModal = () => {
      setSelectedProduct(null); // Reset selected product when closing the modal
    };



    const [selectedProduct, setSelectedProduct] = useState(null);  

    const openEditModal = (product) => {
      setSelectedProduct(product); 
    };



    
    const handleDeleteProduct = async (id) => {
        APICall("delete", null, `products/${id}`)
          .then((res) => {
            toast.success(res?.data || "");
            fetchProducts(filter);
          })
          .catch((err) => {
            toast.error(err?.response?.message);
          });
      };
    return (
        <>
        <div className="flex h-screen">
            <Sidebar/>

        
        <div className="w-full px-16 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Product List</h1>
                <button onClick={handlePopupOpen} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                    Add Product</button>
                <ProductModelPopup isOpen={isPopupOpen} onClose={handlePopupClose} onSubmit={handleFormSubmit} />

            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-200">
                        <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">
                            S.No
                        </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">Product ID</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">Customer Name</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">Price</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">Quantity</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">Actions</th>

                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {products?.data?.map((product, index) => (

                            <tr key={product.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                <td className="px-6 py-4 whitespace-nowrap">PDO{product.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{product.price}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{product.quantity}</td>
                                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                    <button  className="text-indigo-600 hover:text-indigo-900 focus:outline-none" 
                                    onClick={() => openEditModal(product)}>
                                      <PencilAltIcon className="h-5 w-5" />
                                      </button>

                                    <button
                                        onClick={() => handleDeleteProduct(product.id)}
                                        className="text-red-600 hover:text-red-900 focus:outline-none"
                                    >
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-6 flex justify-between items-center">
                <div>
                    <p className="text-sm text-gray-600">
                    Showing {products?.from} to {products?.to} of {products?.total} Products
                    </p>
                </div>
                <div>
                <nav
                className="flex items-center space-x-2"
                aria-label="Pagination"
              >
                <button
                  onClick={() =>
                    setFilter((st) => ({ ...st, page: st.page - 1 }))
                  }
                  disabled={filter?.page === 1}
                  className={`${
                    filter?.page === 1
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-100"
                  } px-3 py-1 rounded-md bg-white text-sm font-medium text-gray-500 focus:outline-none`}
                >
                  <ChevronLeftIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() =>
                    setFilter((st) => ({ ...st, page: st.page + 1 }))
                  }
                  disabled={currentPage === totalPages}
                  className={`${
                    currentPage === totalPages
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-100"
                  } px-3 py-1 rounded-md bg-white text-sm font-medium text-gray-500 focus:outline-none`}
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
              </nav>
                </div>
            </div>
        </div>
      {selectedProduct && (
        <EditProductModal product={selectedProduct}  closeModal={closeEditModal} />
      )}
        </div>
        </>
    );
};

export default ProductList;
