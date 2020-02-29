const express = require("express");

const router = express.Router();

const burger = require("../models/burger.js");

router.get("/", (req, res) => {
    burger.all(data => {
        let burgerObj = { burgers: data };
        console.log(burgerObj);
        res.render("index", burgerObj);
    });
});

//add/create burger
router.post("/api/burgers", (req, res) => {
    burger.create(
        ["name", "devoured"], [req.body.name, req.body.devoured],
        result => {
            //send back ID of new burger
            res.json({ id: result.insertId });
        });
});

//update condition of burger from !devoured to devoured
router.put("/api/burgers/:id", (req, res) => {
    // let condition = `id = ${req.params.id}`;
    let condition = "id = " + req.params.id;

    console.log(`condition ${condition}`);

    burger.update({
        devoured: req.body.devoured
    }, condition, result => {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;