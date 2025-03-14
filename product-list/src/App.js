import React from "react";
import ProductList from "./components/ProductList";

function App() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <ProductList />
    </div>
  );
}

export default App;
