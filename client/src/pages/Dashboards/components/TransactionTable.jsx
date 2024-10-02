import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const TransactionTable = () => {
  const rows = [
    // Example data
    { id: 1, date: '2023-09-30', amount: '500 EGP', type: 'بطاقة', paymentMethod: 'Visa' },
    // Add more rows
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>تحديث</TableCell>
            <TableCell>نوع المعاملة</TableCell>
            <TableCell>رقم الطلب</TableCell>
            <TableCell>الحالة</TableCell>
            <TableCell>المصدر</TableCell>
            <TableCell>طريقة الدفع</TableCell>
            <TableCell>النوع</TableCell>
            <TableCell>المبلغ</TableCell>
            <TableCell>تاريخ الإنشاء</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>--</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.id}</TableCell>
              <TableCell>مكتمل</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell>Visa</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionTable;
