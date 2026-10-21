import React from 'react';
import { CATEGORIES } from '../data';

const FilterBar = ({ search, setSearch, category, setCategory }) => (
    <div>
        <label htmlFor="search">Tìm kiếm</label>
        <input id="search" value={search} onChange={e => setSearch(e.target.value)} />
        <label htmlFor="category">Danh mục</label>
        <select id="category" value={category} onChange={e => setCategory(e.target.value)}>
            <option value="Tất cả">Tất cả</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
    </div>
);
export default FilterBar;