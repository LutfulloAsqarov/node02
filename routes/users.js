const { users } = require("../server");
const express = require("express");
const router = express.Router();

router.get("/users", (req, res) => {
    // res.send(users); send -> json

    if (!users.length) {
        return res.status(400).json({
            msg: "Malumot topilmadi",
            variand: "error",
            payload: "null",
        });
    }
    res.status(200).json({
        msg: "Barcha foydalanuvchilar",
        variant: "success",
        payload: users,
        total: users.length,
    });
});

router.post("/users", (req, res) => {
    let existUser = users.find((user) => user.username === req.body.username);
    if (existUser) {
        return res.status(400).json({
            msg: "username mavjud",
            variant: "warning",
            payload: null,
        });
    }
    let newUser = {
        id: new Date().getTime(),
        fname: req.body.fname,
        username: req.body.username,
        password: req.body.password,
    };
    users.push(newUser);
    res.status(201).json({
        msg: "Qo'shildi",
        variant: "success",
        payload: newUser,
    });
});

router.delete("/users/:id", (req, res) => {
    let id = +req.params.id;
    let userIndex = users.find((user) => user.id === id);
    if (!userIndex) {
        return res.status(400).json({
            msg: "User topilmadi",
            variant: "error",
            payload: null,
        });
    }

    users.splice(userIndex, 1);

    res.status(201).json({
        msg: "User o'chirildi",
        variant: "success",
        payload: null,
    });
});

router.put("/users/:id", (req, res) => {
    let id = +req.params.id;
    let userIndex = users.findIndex((user) => user.id === id);
    if (userIndex < 0) {
        return res.status(400).json({
            msg: "User topilmadi",
            variant: "error",
            payload: null,
        });
    }

    let editUser = {
        id,
        ...req.body,
    };

    users.splice(userIndex, 1, editUser);
    res.status(201).json({
        msg: "O'zgartirildi",
        variant: "success",
        payload: editUser,
    });
});

module.exports = router;
