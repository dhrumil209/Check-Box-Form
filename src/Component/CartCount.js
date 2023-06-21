import React from "react";
import { useState } from "react";
const CartCount = () => {
  const [count, setIsCount] = useState(() => {
    const countStored = localStorage.getItem("Count");
    return countStored ? parseInt(countStored) : 0;
  });
  
  const handleAddCart = () => {
    setIsCount((prevCount) => {
      const newCount = prevCount + 1;

      localStorage.setItem("Count", newCount);
      return newCount;
    });
  };

  const handleRemoveCart = () => {
    setIsCount((prevCount) => {
      const newCount = prevCount - 1;
      localStorage.setItem("Count", newCount);
      return newCount;
    });
  };
  return (
    <div>
      <div>
        <button onClick={handleRemoveCart}> - </button>
        {count}
        <button onClick={handleAddCart}> + </button>
      </div>
    </div>
  );
};
export default CartCount;
