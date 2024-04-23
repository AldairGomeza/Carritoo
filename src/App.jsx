import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeView from "./views/HomeView";
import NavBar from "./components/Navbar/Navbar";
import PedidosView from "./views/PedidosView";
import ProductForm from "./views/Add-products";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./App.css";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="pages">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/pedidos" element={<PedidosView />} />
          <Route path="/add-productos" element={<ProductForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
