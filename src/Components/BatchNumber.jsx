import React, { useState } from 'react';

function InventoryManagement() {
  const [inventory, setInventory] = useState([]);

  // Function to generate unique batch numbers
  const generateBatchNumber = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  // Function to add 10 new items to inventory
  const addItemsToInventory = () => {
    const newItems = [];
    for (let i = 0; i < 10; i++) {
      const newItem = {
        id: Math.random().toString(36).substring(2, 8), // Unique ID for each item
        name: `Item ${i + 1}`,
        batchNumber: generateBatchNumber(),
      };
      newItems.push(newItem);
    }
    setInventory([...inventory, ...newItems]);
  };

  return (
    <div>
      <button onClick={addItemsToInventory}>Add 10 Items to Inventory</button>
      <ul>
        {inventory.map((item) => (
          <li key={item.id}>
            {item.name} - Batch Number: {item.batchNumber}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InventoryManagement;
