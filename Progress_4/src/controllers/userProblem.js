const {getLanguageById,submitBatch} = require("../utils/problemUtility");
const Problem = require("../models/problem");


const createProblem = async (req,res)=>{

    try{
        if (!req.body || !Array.isArray(req.body.visibleTestCases) || !Array.isArray(req.body.referenceSolution)) {
            return res.status(400).json({error: 'visibleTestCases and referenceSolution must be arrays'});
        }

        const {
            title, description, difficulty, tags,
            visibleTestCases, hiddenTestCases, startCode,
            referenceSolution
        } = req.body;

        for (const {language, completeCode} of referenceSolution) {
            const languageId = getLanguageById(language);
            const submissions = visibleTestCases.map(({input, output}) => ({
                source_code: completeCode,
                language_id: languageId,
                stdin: input,
                expected_output: output
            }));

            await submitBatch(submissions);
        }

        const problem = await Problem.create({
            title,
            description,
            difficulty,
            tags,
            visibleTestCases,
            hiddenTestCases,
            startCode,
            referenceSolution,
            problemCreator: req.result._id
        });
        res.status(201).json(problem);
    }
    catch(err){
        const status = err.statusCode || (err.name === 'ValidationError' || err.name === 'CastError' ? 400 : 500);
        res.status(status).json({error: err.message});
    }
}

const updateProblem = async (req,res)=>{
    try {
        const {problemCreator, ...updates} = req.body;
        const problem = await Problem.findByIdAndUpdate(
            req.params.id,
            updates,
            {new: true, runValidators: true}
        );
        if (!problem) {
            return res.status(404).json({error: 'Problem not found'});
        }
        res.status(200).json(problem);
    }
    catch(err) {
        const status = err.name === 'ValidationError' || err.name === 'CastError' ? 400 : 500;
        res.status(status).json({error: err.message});
    }
}

const deleteProblem = async (req,res)=>{
    try {
        const problem = await Problem.findByIdAndDelete(req.params.id);
        if (!problem) {
            return res.status(404).json({error: 'Problem not found'});
        }
        res.status(200).json({message: 'Problem deleted'});
    }
    catch(err) {
        const status = err.name === 'CastError' ? 400 : 500;
        res.status(status).json({error: err.message});
    }
}

const getProblemById = async (req,res)=>{
    try {
        const problem = await Problem.findById(req.params.id)
            .select('-hiddenTestCases -referenceSolution');
        if (!problem) {
            return res.status(404).json({error: 'Problem not found'});
        }
        res.status(200).json(problem);
    }
    catch(err) {
        const status = err.name === 'CastError' ? 400 : 500;
        res.status(status).json({error: err.message});
    }
}

const getAllProblem = async (req,res)=>{
    try {
        const problems = await Problem.find()
            .select('-hiddenTestCases -referenceSolution');
        res.status(200).json(problems);
    }
    catch(err) {
        res.status(500).json({error: err.message});
    }
}

const solvedAllProblembyUser = async (req,res)=>{
    try {
        const problems = await Problem.find({_id: {$in: req.result.problemSolved}})
            .select('-hiddenTestCases -referenceSolution');
        res.status(200).json(problems);
    }
    catch(err) {
        res.status(500).json({error: err.message});
    }
}

module.exports = {
    createProblem,
    updateProblem,
    deleteProblem,
    getProblemById,
    getAllProblem,
    solvedAllProblembyUser
};