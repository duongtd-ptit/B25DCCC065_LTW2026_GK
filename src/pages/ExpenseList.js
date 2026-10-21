import React, { useState, useEffect } from 'react';
import FilterBar from '../components/FilterBar';
import ExpenseRow from '../components/ExpenseRow';

const ExpenseList = ({ expenses, deleteExpense, togglePaid }) => {
    const [width, setWidth] = useState(window.innerWidth);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("Tất cả");

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const filtered = expenses.filter(e => {
        const matchSearch = e.title.toLowerCase().includes(search.toLowerCase());
        const matchCat = category === "Tất cả" || e.category === category;
        return matchSearch && matchCat;
    });

    const isMobile = width < 768;

    return (
        <div>
            <p>Chế độ: {isMobile ? 'Điện thoại' : 'Máy tính'}</p>
            <FilterBar search={search} setSearch={setSearch} category={category} setCategory={setCategory} />
            <p>{filtered.length > 0 ? `Tìm thấy ${filtered.length} khoản chi` : 'Không có dữ liệu'}</p>

            <div className={`table-wrap ${isMobile ? 'mobile' : ''}`}>
                <table>
                    <thead>
                        <tr>
                            <th>Khoản chi</th>
                            <th>Số tiền</th>
                            <th className="col-category">Danh mục</th>
                            <th className="col-date">Ngày</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(e => (
                            <ExpenseRow key={e.id} expense={e} deleteExpense={deleteExpense} togglePaid={togglePaid} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default ExpenseList;