import React, { useState } from "react";
import cn from "classnames";
import { useCart } from "../context/cart-provider";

function Counter({ item }) {
  const [qty, setQty] = useState(1);
  const { increaseQty, decreaseQty } = useCart();

  const handleIncrement = () => {
    increaseQty(item, qty);
  };

  const handleDecrement = () => {
    decreaseQty(item, qty);
  };

  const handleChange = (e) => {
    setQty((prev) => prev + e.target.value);
  };

  const rootClasses = cn(
    "w-25 form-control d-flex justify-content-center align-items-center"
  );

  return (
    <div className="form-group d-flex">
      <button type="button" className="btn-secondary" onClick={handleDecrement}>
        -
      </button>
      <input
        className={rootClasses}
        type="text"
        placeholder={item.qty}
        readOnly
        onChange={handleChange}
      />
      <button type="button" className="btn-secondary" onClick={handleIncrement}>
        +
      </button>
    </div>
  );
}

export default Counter;
