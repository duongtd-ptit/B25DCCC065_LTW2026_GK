import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { formatMoney } from '../data';

const ExpenseDetail = ({ expenses }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const expense = expenses.find(e => e.id === Number(id));

    if (!expense) return <div>Không tìm thấy khoản chi</div>;

    return (
        <div>
            <p>Tên khoản chi: {expense.title}</p>
            <p>Số tiền: {formatMoney(expense.amount)}</p>
            <p>Danh mục: {expense.category}</p>
            <p>Ngày: {expense.date}</p>
            <p>Trạng thái: {expense.paid ? "Đã thanh toán" : "Chưa thanh toán"}</p>
            <button onClick={() => navigate(-1)}>Quay lại</button>
        </div>
    );
};
export default ExpenseDetail;