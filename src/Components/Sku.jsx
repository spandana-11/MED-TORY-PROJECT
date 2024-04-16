import React, { useState } from 'react';

function InventoryManagement() {
  const [product, setProduct] = useState('');
  const [sku, setSku] = useState('');

  const generateSKU = () => {
    // Logic to generate SKU, for simplicity let's assume it's a combination of product name and random number
    const randomNumber = Math.floor(Math.random() * 1000);
    const newSku = product.replace(/\s+/g, '-').toLowerCase() + '-' + randomNumber;
    setSku(newSku);
  };

  const handleProductChange = (event) => {
    setProduct(event.target.value);
  };

  return (
    <div>
      <label htmlFor="product">Product Name:</label>
      <input
        type="text"
        id="product"
        value={product}
        onChange={handleProductChange}
      />
      <button onClick={generateSKU}>Generate SKU</button>
      {sku && <p>Generated SKU: {sku}</p>}
    </div>
  );
}

export default InventoryManagement;
