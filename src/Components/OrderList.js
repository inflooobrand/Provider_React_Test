import React, { useState, useEffect } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/outline";

import PlaceOrderModal from "./PlaceOrderModal";
import Sidebar from "../Sidebar";
import toast from "react-hot-toast";
import APICall from "../network/apiCall";

const OrderList = () => {
  const [isModalOpen, setIsModalOpen] = useState({ show: false });
  const [filter, setFilter] = useState({ page: 1 });
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders(filter);
  }, [filter]);

  const fetchOrders = async (filter) => {
    APICall("get", filter, "orders")
      .then((res) => {
        setOrders(res?.data);
      })
      .catch((err) => {
        toast.error(err?.response?.message);
      });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const handleDeleteOrder = async (id) => {
    APICall("delete", null, `orders/${id}`)
      .then((res) => {
        toast.success(res?.data || "");
        fetchOrders(filter);
      })
      .catch((err) => {
        toast.error(err?.response?.message);
      });
  };

  const handlePlaceOrder = (quantity, id) => {
    const payload = {
        quantity: quantity,
        product_id: id,
    };
    APICall("post", payload, `orders`)
      .then((res) => {
        toast.success(res?.data || "");
        fetchOrders(filter);
        setIsModalOpen(false)
      })
      .catch((err) => {
        toast.error(err?.response?.message);
      });
  };

  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <div className="w-full px-16 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Order List</h1>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">
                    S.No
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">
                    Product Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">
                    Total Price
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders?.data?.map((order, index) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">ODR{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {order?.product?.name || ""}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {order?.product?.quantity || ""}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {order?.product?.price || ""}
                    </td>
                    <td className="px-6 flex py-4 whitespace-nowrap space-x-2">
                      <button
                        onClick={() =>
                          setIsModalOpen((st) => ({
                            ...st,
                            show: true,
                            id: order?.product?.id,
                          }))
                        }
                        className="flex items-center justify-center w-5 h-5 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <PlusIcon className="w-5 h-5" />
                      </button>

                      <button
                        onClick={() => handleDeleteOrder(order.id)}
                        className="text-red-600 hover:text-red-900 focus:outline-none"
                        data-tip="Delete"
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
                Showing {orders?.from} to {orders?.to} of {orders?.total} orders
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
      </div>
      {isModalOpen?.show && (
        <PlaceOrderModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen({ show: false })}
          onPlaceOrder={handlePlaceOrder}
        />
      )}
    </>
  );
};

export default OrderList;
