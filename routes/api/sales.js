const express = require("express");
const router = express.Router();

const passport = require("passport");

// Sales model
const Sale = require("../../models/Sale");
// Location model
const Location = require("../../models/Location");
// Inventory model
const Inventory = require("../../models/Inventory");
// Input Validation
const validateSalesInput = require("../../validations/sales");

// @route   GET api/sales/test
// @desc    Tests sales route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Sales route works" }));

// @route   GET api/sales
// @desc    Get all sales
// @access  Private
router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const errors = {};
        return Sale.getAllSales()
            .then(data => {
                if (!data) {
                    errors.nosales = "There are no sales";
                    return res.status(404).json(errors);
                }
                return res.json(data);
            })
            .catch(err => {
                console.log(err);
                return res.status(404).json(err);
            });
    }
);

// @route   POST api/sales
// @desc    Add Sale
// @access  Private
router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const { errors, isValid } = validateSalesInput(req.body);

        // Check Validation
        if (!isValid) {
            return res.status(400).json({ errors })
        }

        const bookId = req.body.bookId;
        const location = req.body.location;
        const date = req.body.date;
        const price = req.body.price;
        const quantity = req.body.quantity;
        const total = req.body.total;

        console.log(bookId, location, date, price, quantity, total);

        // Get Location
        return Location.getLocationByName(location).then(location => {
            if (location == null) {
                errors.push("Cannot find center with given name");
                return res.status(404).json({ errors });
            }

            return Inventory.getInventoryByLocationAndBook(bookId, location.id).then(existingInventory => {
                if (existingInventory == null) { 
                    // No Inventory
                    errors.push("No Inventory available for the given book and center");
                    return res.status(404).json({ errors });
                } else {
                    if (existingInventory.count < quantity) {
                        errors.push("Not enough Inventory");
                        return res.status(404).json({ errors });
                    }
                    // Add Sale
                    return Sale.addSale(bookId, location.id, quantity, price, total, date).then(() => {
                        // Reduce Inventory
                        return Inventory.updateInventory((-1 * quantity), bookId, location.id).then(() => {
                            return res.json({
                                success: true
                            })
                        })
                    })
                } 
            })
        })
    }
);

module.exports = router;
