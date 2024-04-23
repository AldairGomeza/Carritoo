import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import computerStoreData from "../data";

const ProductForm = ({ onAddProduct }) => {
  const [formData, setFormData] = useState({
    Codigo: "",
    Nombre: "",
    Descripcion: "",
    Precio: 0,
    CantidadStock: 0,
  });

  const [products, setProducts] = useState(computerStoreData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const allProducts = [...computerStoreData, ...storedProducts];
    console.log(allProducts);
    const isCodeExists = allProducts.some(
        (product) => product.Codigo === formData.Codigo
    );

    if (isCodeExists) {
      alert(
        "El código ingresado ya existe en los productos. Por favor, ingrese un código diferente."
      );
      return;
    }

    const newProduct = {
      id: Math.random().toString(),
      ...formData,
    };
    const updatedProducts = [...storedProducts, newProduct];
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    setFormData({
      Codigo: "",
      Nombre: "",
      Descripcion: "",
      Precio: 0,
      CantidadStock: 0,
    });
    setProducts(updatedProducts);
  };

  const handleEdit = (id) => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const productToEdit = storedProducts.find((product) => product.id === id);
    if (productToEdit) {
      setFormData(productToEdit);
    } else {
      const staticProductToEdit = computerStoreData.find(
        (product) => product.id === id
      );
      if (!staticProductToEdit) {
        const productToEdit = storedProducts.find(
          (product) => product.id === id
        );
        setFormData(productToEdit);
      }
    }
  };

  const handleDelete = (id) => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const updatedProducts = storedProducts.filter(
      (product) => product.id !== id
    );
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);
  return (
    <div>
      <h2>Agregar Producto</h2>
      <div className="container mt-4 mx-auto">
        <div className="card w-50 mx-auto">
          <div className="card-body">
            <h5 className="card-title">Agregar Producto</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="Codigo" className="form-label">
                  Código:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Codigo"
                  name="Codigo"
                  value={formData.Codigo}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Nombre" className="form-label">
                  Nombre:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Nombre"
                  name="Nombre"
                  value={formData.Nombre}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Descripcion" className="form-label">
                  Descripción:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Descripcion"
                  name="Descripcion"
                  value={formData.Descripcion}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Precio" className="form-label">
                  Precio:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="Precio"
                  name="Precio"
                  value={formData.Precio}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="CantidadStock" className="form-label">
                  Cantidad en Stock:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="CantidadStock"
                  name="CantidadStock"
                  value={formData.CantidadStock}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Agregar Producto
              </button>
            </form>
          </div>
        </div>
      </div>

      <h2 className="mt-4">Lista de Productos</h2>
      <Table className="w-75 mx-auto" striped bordered hover>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {computerStoreData.concat(products).map((product) => (
            <tr key={product.id}>
              <td>{product.Codigo}</td>
              <td>{product.Nombre}</td>
              <td>{product.Descripcion}</td>
              <td>{product.Precio}</td>
              <td>{product.CantidadStock}</td>
              <td>
                {!computerStoreData.some(
                  (staticProduct) => staticProduct.id === product.id
                ) && (
                  <Button variant="info" onClick={() => handleEdit(product.id)}>
                    Editar
                  </Button>
                )}
                {!computerStoreData.some(
                  (staticProduct) => staticProduct.id === product.id
                ) && (
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(product.id)}
                  >
                    Eliminar
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductForm;
