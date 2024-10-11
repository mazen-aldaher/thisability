import React from 'react';
import { Button } from '@mui/material';

// A4 Receipt component
const A4Receipt = ({ order }) => {
  const printReceipt = () => {
    window.print();
  };

  return (
    <div style={styles.receiptContainer}>
      <h2 style={styles.header}>Order Receipt</h2>
      <p style={styles.details}>
        <strong>Order Date:</strong> {order.date}
      </p>
      <p style={styles.details}>
        <strong>Total:</strong> EGP {order.total.toFixed(2)}
      </p>
      <h3 style={styles.itemsHeader}>Items:</h3>
      <ul style={styles.itemList}>
        {order.items.map((item, index) => (
          <li key={index} style={styles.item}>
            {item.name} - EGP {item.price.toFixed(2)}
          </li>
        ))}
      </ul>
      <Button variant="contained" color="primary" onClick={printReceipt} style={styles.printButton}>
        Print Receipt
      </Button>
    </div>
  );
};

// Styles for A4 receipt
const styles = {
  receiptContainer: {
    width: '210mm', // A4 width
    height: '297mm', // A4 height
    padding: '20mm',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#fff',
    color: '#333',
    position: 'relative',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  details: {
    fontSize: '16px',
    margin: '5px 0',
  },
  itemsHeader: {
    marginTop: '20px',
    marginBottom: '10px',
  },
  itemList: {
    listStyleType: 'none',
    padding: 0,
  },
  item: {
    margin: '5px 0',
  },
  printButton: {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
  },
};

export default A4Receipt;
