const express = require('express');

const problemRouter =  express.Router();


// Create
// need admin access
problemRouter.post("/create",problemCreate);//create problem
problemRouter.patch("/:id", problemUpdate);//update problem
problemRouter.delete("/:id",problemDelete);//delete problem


// no access control
problemRouter.get("/:id",problemFetch);//fetch problem by id
problemRouter.get("/", getAllProblem);//fetch all problem
problemRouter.get("/user", solvedProblem);//fetch all problem solved by user

// fetch
// update
// delete 
