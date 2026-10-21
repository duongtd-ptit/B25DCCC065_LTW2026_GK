import React from 'react';
import { formatMoney } from '../data';

const Home = ({ expenses }) => {
    const totalPaid = expenses.filter(e => e.paid).reduce((sum, e) => sum + e.amount, 0);
    const totalUnpaid = expenses.filter(e => !e.paid).reduce((sum, e) => sum + e.mount, 0);
    return (
        <div>
            <h2>Trang chủ</h2>
            <p>Tổng số khoản chi: {expenses.length}</p>
            <p>Tổng số tiền đã chi: {formatMoney(totalPaid)}</p>
            <p>Tổng số tiền chưa thanh toán: {formatMoney(totalUnpaid)}</p>
        </div>
    );
};

export default Home;