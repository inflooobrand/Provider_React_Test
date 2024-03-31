import React, { useState } from 'react';

const ProductModelPopup = ({ isOpen, onClose, onSubmit }) => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [productDescription, setProductDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Call the onSubmit function and pass the submitted data
        onSubmit({
            name: productName,
            price: productPrice,
            quantity: productQuantity,
            description: productDescription
        });
        // Reset the form fields
        setProductName('');
        setProductPrice('');
        setProductQuantity('');
        setProductDescription('');
        // Close the popup
        onClose();
    };

    return (
        <div className={`fixed inset-0 z-50 ${isOpen ? 'flex' : 'hidden'} items-center justify-center bg-black bg-opacity-50`}>
            <div className="bg-white p-12 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="productName" className="block text-gray-700 font-bold mb-2">Product Name</label>
                        <input type="text" id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="productPrice" className="block text-gray-700 font-bold mb-2">Product Price</label>
                        <input type="text" id="productPrice" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="productQuantity" className="block text-gray-700 font-bold mb-2">Product Quantity</label>
                        <input type="text" id="productQuantity" value={productQuantity} onChange={(e) => setProductQuantity(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="productDescription" className="block text-gray-700 font-bold mb-2">Product Description</label>
                        <textarea id="productDescription" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Add</button>
                        <button onClick={onClose} className="ml-4 text-gray-600 hover:text-gray-800 focus:outline-none">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductModelPopup;
