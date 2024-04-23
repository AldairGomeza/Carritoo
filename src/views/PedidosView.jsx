import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./Pedidos.css";

const PedidosView = () => {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCartItems(parsedCart);
    }
  }, []);

  const increaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decreaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const removeItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalPedido = cartItems.reduce(
    (total, item) => total + item.Precio * item.quantity,
    0
  );

  const pagarPedido = async () => {
    for (const item of cartItems) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const fakeResponse = { status: 200 };
        if (fakeResponse.status === 200) {
          Swal.fire({
            icon: "success",
            title: "¡Venta exitosa!",
            text: "Tu compra se ha realizado con éxito.",
            confirmButtonText: "Aceptar",
          });

          setCartItems([]);
          localStorage.removeItem("cart");
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al realizar la venta.",
          confirmButtonText: "Aceptar",
        });
        console.error("Error al crear la venta:", error);
      }
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mt-5 mb-4">Tu Carrito</h1>
      {cartItems.length > 0 && (
        <div className="pagos col-md-6  mx-auto mb-3">
          <div className="pagos border p-4 bg-light d-flex justify-content-between align-items-center">
            <h3 className="pagos mb-0">
              Total del Pedido: <span className="fw-bold">${totalPedido}</span>
            </h3>
            <button class="Btn" onClick={pagarPedido}>
              Pay
              <svg class="svgIcon" viewBox="0 0 576 512">
                <path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path>
              </svg>
            </button>
          </div>
        </div>
      )}

      {cartItems.length ? (
        <div className="row">
          {cartItems.map((item, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card">
                <img
                  src={item.Descripcion}
                  className="card-img-top"
                  alt={item.Nombre}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.Nombre}</h5>
                  <p className="card-text">Cantidad: {item.quantity}</p>
                  <p className="card-text">
                    Precio: ${item.Precio * item.quantity}
                  </p>
                  <div className="btn-group" role="group">
                    <button
                      className="btn btn-secondary"
                      onClick={() => increaseQuantity(index)}
                    >
                      +
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => decreaseQuantity(index)}
                    >
                      -
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeItem(index)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-center">
          No hay artículos en tu carrito de compras
        </p>
      )}
    </div>
  );
};

export default PedidosView;
