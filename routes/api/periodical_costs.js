const express = require("express");
const router = express.Router();

const passport = require("passport");

// Periodical Costs model
const PeriodicalCosts = require("../../models/PeriodicalCosts");


// @route   GET api/periodical-costs/test
// @desc    Tests periodical costs route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Periodical Costs route works" }));

// @route   GET api/periodical-costs
// @desc    Get all periodical costs
// @access  Private
router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const errors = {};
        return PeriodicalCosts.getAllPeriodicalCosts()
            .then(data => {
                if (!data && data.length == 0) {
                    errors.nobooks = "There are no periodical costs";
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
