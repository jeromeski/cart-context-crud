import Counter from "./components/Counter";
import CartProvider, { useCart } from "./context/cart-provider";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

function App() {
  const {
    state: { items, increaseQty, decreaseQty }
  } = useCart();
  return (
    <div className="App">
      <div className="container p-5">
        <div className="row">
          <div className="col-sm-6">
            {items &&
              items.map((item) => (
                <Counter
                  key={item._id}
                  item={item}
                  increaseQty={increaseQty}
                  decreaseQty={decreaseQty}
                  {...item}
                />
              ))}
          </div>
          <div className="col-sm-6">
            <pre>{JSON.stringify(items, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function () {
  return (
    <CartProvider>
      <App />
    </CartProvider>
  );
}
