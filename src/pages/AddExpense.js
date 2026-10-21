import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../data';

const AddExpense = ({ expenses, addExpense }) => {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("Ăn uống");
    const [date, setDate] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !amount || !category || !date) {
            setError("Vui lòng nhập đầy đủ thông tin phía dưới form");
            return;
        }
        const num = Number(amount);
        if (!Number.isInteger(num) || num < 1000 || num > 100000000) {
            setError("Số tiền phải từ 1.000 đến 100.000.000");
            return;
        }
        const newId = expenses.length > 0 ? Math.max(...expenses.map(ex => ex.id)) + 1 : 1;
        addExpense({ id: newId, title, amount: num, category, date, paid: false });
        navigate("/expenses", { replace: true });
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p>{error}</p>}
            <label htmlFor="title">Tên khoản chi</label>
            <input id="title" value={title} onChange={e => setTitle(e.target.value)} />
            <br />
            <label htmlFor="amount">Số tiền</label>
            <input id="amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} />
            <br />
            <label htmlFor="category">Danh mục</label>
            <select id="category" value={category} onChange={e => setCategory(e.target.value)}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <br />
            <label htmlFor="date">Ngày chi</label>
            <input id="date" type="date" value={date} onChange={e => setDate(e.target.value)} />
            <br />
            <button type="submit">Thêm</button>
        </form>
    );
};
export default AddExpense;