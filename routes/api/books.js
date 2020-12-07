const express = require("express");
const router = express.Router();

const passport = require("passport");

// Books model
const Book = require("../../models/Book");


// @route   GET api/books/test
// @desc    Tests books route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Books route works" }));

// @route   GET api/books
// @desc    Get all books
// @access  Private
router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const errors = {};
        return Book.getAllBooks()
            .then(data => {
                if (!data) {
                    errors.nobooks = "There are no books";
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

module.exports = router;
