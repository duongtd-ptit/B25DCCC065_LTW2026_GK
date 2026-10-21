import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Layout from './components/Layout';
import Home from './pages/Home';
import ExpenseList from './pages/ExpenseList';
import AddExpense from './pages/AddExpense';
import ExpenseDetail from './pages/ExpenseDetail';
import './App.css';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const localData = localStorage.getItem("gk_expenses");

    if (localData) {
      setExpenses(JSON.parse(localData));
      setLoading(false);
    } else {
      axios.get("/data/expenses.json", { signal: controller.signal })
        .then(res => {
          setExpenses(res.data);
          setLoading(false);
        })
        .catch(err => {
          if (!axios.isCancel(err)) {
            setError("Không tải được dữ liệu");
            setLoading(false);
          }
        });
    }
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("gk_expenses", JSON.stringify(expenses));
    }
  }, [expenses, loading]);

  const addExpense = (newEx) => setExpenses([...expenses, newEx]);
  const deleteExpense = (id) => setExpenses(expenses.filter(e => e.id !== id));
  const togglePaid = (id) => setExpenses(expenses.map(e => e.id === id ? { ...e, paid: !e.paid } : e));

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home expenses={expenses} />} />
          <Route path="expenses" element={<ExpenseList expenses={expenses} deleteExpense={deleteExpense} togglePaid={togglePaid} />} />
          <Route path="expenses/new" element={<AddExpense expenses={expenses} addExpense={addExpense} />} />
          <Route path="expenses/:id" element={<ExpenseDetail expenses={expenses} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;