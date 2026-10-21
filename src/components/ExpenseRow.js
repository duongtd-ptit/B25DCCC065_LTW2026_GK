import React from 'react';
import { Link } from 'react-router-dom';
import { formatMoney } from '../data';

const ExpenseRow = ({ expense, deleteExpense, togglePaid }) => (
    <tr>
        <td><Link to={`/expenses/${expense.id}`}>{expense.title}</Link></td>
        <td>{formatMoney(expense.amount)}</td>
        <td className="col-category">{expense.category}</td>
        <td className="col-date">{expense.date}</td>
        <td style={{ color: !expense.paid ? 'orange' : 'inherit' }}>
            {expense.paid ? 'Đã thanh toán' : 'Chưa thanh toán'}
        </td>
        <td>
            <button onClick={() => togglePaid(expense.id)}>
                {expense.paid ? 'Đánh dấu chưa trả' : 'Đánh dấu đã trả'}
            </button>
            <button onClick={() => deleteExpense(expense.id)}>Xóa</button>
        </td>
    </tr>
);
export default ExpenseRow;