const { products } = require("../server");
const express = require("express");
const router = express.Router();

router.get("/products", (req, res) => {
    // res.send(users); send -> json

    if (!products.length) {
        return res.status(400).json({
            msg: "Malumot topilmadi",
            variand: "error",
            payload: "null",
        });
    }
    res.status(200).json({
        msg: "Barcha Productlar",
        variant: "success",
        payload: products,
        total: products.length,
    });
});

router.post("/products", (req, res) => {
    let exitProduct = products.find(
        (product) => product.title === req.body.title
    );
    if (exitProduct) {
        return res.status(400).json({
            msg: "Mahsulot mavjud",
            variant: "warning",
            payload: null,
        });
    }
    let newProduct = {
        id: new Date().getTime(),
        ...req.body,
    };
    products.push(newProduct);

    res.status(201).json({
        msg: "Mahsulot yaratildi",
        variant: "success",
        payload: newProduct,
    });
});

router.delete("/products/:id", (req, res) => {
    let id = +req.params.id;
    let productInx = products.findIndex((product) => product.id === id);
    if (productInx < 0) {
        return res.status(400).json({
            msg: "Mahsulot topilmadi",
            variant: "error",
            payload: null,
        });
    }
    products.splice(productInx, 1);
    res.status(200).json({
        msg: "Mahsulot o'chirildi",
        variant: "success",
        payload: null,
    });
});

router.put("/products/:id", (req, res) => {
    let id = +req.params.id;

    let productInx = products.findIndex((product) => product.id === id);
    if (productInx < 0) {
        return res.status(400).json({
            msg: "Mahsulot topilmadi",
            variant: "error",
            payload: null,
        });
    }
    let updateProduct = {
        id,
        ...req.body,
    };
    products.splice(productInx, 1, updateProduct);
    res.status(201).json({
        msg: "Mahsulot o'zgartirildi",
        variant: "success",
        payload: updateProduct,
    });
});

module.exports = router;
