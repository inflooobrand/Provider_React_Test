import React, { useState } from "react";

const PlaceOrderModal = ({ isOpen, onClose, onPlaceOrder }) => {
const [quantity, setQuantity] = useState("");


  return (
    <div className={`fixed inset-0 flex items-center justify-center`}>
      <div className="absolute inset-0 bg-white opacity-700"></div>
      <div className="bg-white p-6 rounded-lg z-10">
        <h2 className="text-xl font-semibold mb-4">Place an Order</h2>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Enter quantity"
          className="border border-gray-300 rounded-md px-3 py-2 mb-4"
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 border border-gray-300 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={() => onPlaceOrder(quantity, isOpen?.id)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderModal;
