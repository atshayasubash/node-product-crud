const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;
const DATA_FILE = "products.json";
const cors = require("cors");
app.use(cors());
app.use(express.json());

// Helper function to read JSON file
const readData = () => {
    if (!fs.existsSync(DATA_FILE)) return [];
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
};

// Helper function to write JSON file
const writeData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};


// GET: Fetch all products
app.get("/products", (req, res) => {
    res.json(readData());
});

// POST: Add new product
app.post("/products", (req, res) => {
    const products = readData();
    const { productNo, productName, price, image } = req.body;
    
    if (!productNo || !productName || !price || !image) {
        return res.status(400).json({ message: "All fields are required" });
    }
    
    if (products.find(p => p.productNo === productNo)) {
        return res.status(400).json({ message: "Product number must be unique" });
    }

    const newProduct = { productNo, productName, price, image };

    products.push(newProduct);
    writeData(products);
    res.status(201).json(newProduct);
});

// PUT: Edit product
app.put("/products/:productNo", (req, res) => {
    let products = readData();
    const { productNo } = req.params;
    const { productName, price, image } = req.body;

    const index = products.findIndex(p => p.productNo == productNo);
    if (index === -1) {
        return res.status(404).json({ message: "Product not found" });
    }
    
    products[index] = { productNo, productName, price, image };
    writeData(products);
    res.json(products[index]);
});

// DELETE: Remove product
app.delete("/products/:productNo", (req, res) => {
    let products = readData();
    const { productNo } = req.params;
    
    const filteredProducts = products.filter(p => p.productNo != productNo);
    if (filteredProducts.length === products.length) {
        return res.status(404).json({ message: "Product not found" });
    }
    
    writeData(filteredProducts);
    res.json({ message: "Product deleted successfully" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
