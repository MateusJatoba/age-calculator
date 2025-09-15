import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
export default function App() {
    return (_jsx("div", { className: "min-h-screen bg-white flex items-center justify-center p-6", children: _jsxs("div", { className: "container p-8 bg-white shadow-xl rounded-2xl", children: [_jsx(Header, {}), _jsx(Routes, { children: _jsx(Route, { path: "/", element: _jsx(Home, {}) }) })] }) }));
}
