import React from 'react';
import { Routes, Route,Navigate } from "react-router-dom";
import OrderList from "./Components/OrderList";
import ProductList from "./Components/ProductList";
import OrdersPage from "./Components/PlaceOrderModal";
import { AuthProvider } from './contexts/AuthContext';
import Dashboard from './Components/Dashboard';
import LoginForm from './Components/LoginForm';

const App = () => {
    const isAuthenticated = !!localStorage.getItem('token');

    return (
        <AuthProvider>
            <Routes>  
            <Route path="/" element={isAuthenticated ? <LoginForm /> : <Navigate to="/" />}/>

                <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}/>
                <Route path="/orders" element={isAuthenticated ? <OrderList /> : <Navigate to="/" />} />
                <Route path="/products" element={isAuthenticated ? <ProductList /> : <Navigate to="/" />}/>
                <Route path="/OrdersPage" element={isAuthenticated ? <OrdersPage /> : <Navigate to="/" />}/>

                  {/* <Route path="/dashboard" element={<Dashboard/>} />
                  <Route path="/orders" element={<OrderList />} />
                  <Route path="/products" element={<ProductList />} />
                  <Route path="/OrdersPage" element={<OrdersPage />} /> */}

            </Routes>
        </AuthProvider>
    );
};

export default App;
