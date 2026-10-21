import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = () => (
    <div>
        <NavBar />
        <hr />
        <Outlet />
    </div>
);
export default Layout;