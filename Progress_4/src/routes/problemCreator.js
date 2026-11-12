const express = require('express');

const problemRouter =  express.Router();
const adminMiddleware = require("../middleware/adminMiddleware");
const userMiddleware = require("../middleware/userMiddleware");
const {
    createProblem,
    updateProblem,
    deleteProblem,
    getProblemById,
    getAllProblem,
    solvedAllProblembyUser
} = require("../controllers/userProblem");


// Create
problemRouter.post("/create", adminMiddleware, createProblem);
problemRouter.patch("/:id", adminMiddleware, updateProblem);
problemRouter.delete("/:id", adminMiddleware, deleteProblem);

problemRouter.get("/user", userMiddleware, solvedAllProblembyUser);
problemRouter.get("/:id", getProblemById);
problemRouter.get("/", getAllProblem);

// fetch
// update
// delete 

module.exports = problemRouter;
