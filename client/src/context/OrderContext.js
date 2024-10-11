import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([
    // Sample initial orders for testing
    {
      id: 1,
      itemName: 'Kindle Paperwhite (8GB)',
      buyerName: 'Mazen Abdelhalim',
      cost: 7999.00,
      country: 'Egypt',
      address: 'Capital Business Park, Sheikh Zayed',
      shippingMethod: 'Standard',
      status: 'Processing',
    },
    // Add more sample orders as needed
  ]);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
    );
  };

  return (
    <OrderContext.Provider value={{ orders, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => useContext(OrderContext);
