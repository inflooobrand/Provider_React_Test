import React from 'react';
import  Sidebar  from "../Sidebar";
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const Dashboard = () => {

    const ordersData = [20, 30, 40, 50, 60, 70, 80];
    const productsData = [10, 20, 30, 40, 50, 60, 70];
    const paymentsData = [5, 10, 15, 20, 25, 30, 35];

    // Chart data
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Orders',
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: ordersData
            },
            {
                label: 'Products',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: productsData
            },
            {
                label: 'Payments',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(54, 162, 235, 0.4)',
                hoverBorderColor: 'rgba(54, 162, 235, 1)',
                data: paymentsData
            }
        ]
    };

    return (
        <div className="flex h-screen">
            <Sidebar/>
            
        <div className="container w-full mx-auto px-4 py-4 ">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="mb-8">
                <h2 className="text-xl font-bold mb-2">Statistics</h2>
                <div className="flex w-full flex-wrap -mx-4">
                    <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
                        <Bar data={data} />
                    </div>
                </div>
            </div>
        </div>

        </div>
    );
};

export default Dashboard;
