const languageIds = {
    "assembly (nasm 2.14.02)": 45,
    "bash (5.0.0)": 46,
    "basic (fbc 1.07.1)": 47,
    "c (gcc 7.4.0)": 48,
    "c (gcc 8.3.0)": 49,
    "c (gcc 9.2.0)": 50,
    "c++ (gcc 7.4.0)": 52,
    "c++ (gcc 8.3.0)": 53,
    "c++ (gcc 9.2.0)": 54,
    "c# (mono 6.6.0.161)": 51,
    "common lisp (sbcl 2.0.0)": 55,
    "d (dmd 2.089.1)": 56,
    "elixir (1.9.4)": 57,
    "erlang (otp 22.2)": 58,
    "executable": 44,
    "fortran (gfortran 9.2.0)": 59,
    "go (1.13.5)": 60,
    "haskell (ghc 8.8.1)": 61,
    "java (openjdk 13.0.1)": 62,
    "javascript (node.js 12.14.0)": 63,
    "lua (5.3.5)": 64,
    "ocaml (4.09.0)": 65,
    "octave (5.1.0)": 66,
    "pascal (fpc 3.0.4)": 67,
    "php (7.4.1)": 68,
    "plain text": 43,
    "prolog (gnu prolog 1.4.5)": 69,
    "python (2.7.17)": 70,
    "python (3.8.1)": 71,
    "ruby (2.7.0)": 72,
    "rust (1.40.0)": 73,
    "typescript (3.7.4)": 74,
    "c": 48,
    "cpp": 52,
    "c++": 52,
    "csharp": 51,
    "java": 62,
    "javascript": 63,
    "js": 63,
    "python": 71,
    "python3": 71,
    "go": 60,
    "rust": 73,
    "typescript": 74
};

const getLanguageById = (lang)=>{
    if (typeof lang !== 'string') {
        throw Object.assign(new Error('Language must be a string'), {statusCode: 400});
    }

    const languageId = languageIds[lang.trim().toLowerCase()];
    if (!languageId) {
        throw Object.assign(new Error(`Unsupported language: ${lang}`), {statusCode: 400});
    }
    return languageId;
}


const submitBatch = async (submissions)=>{
    const apiKey = process.env.RAPIDAPI_KEY;
    if (!apiKey) {
        throw new Error('Missing RAPIDAPI_KEY. Add your rotated Judge0 key to Progress_4/.env.');
    }
    let response;
    try {
        response = await fetch('https://judge0-ce.p.rapidapi.com/submissions/batch?base64_encoded=false', {
            method: 'POST',
            headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({submissions})
        });
    }
    catch (error) {
        throw Object.assign(new Error('Judge0 API request failed', {cause: error}), {statusCode: 502});
    }
    if (!response.ok) {
        throw Object.assign(new Error(`Judge0 API request failed with status ${response.status}`), {statusCode: 502});
    }
    return response.json();
}


module.exports = {getLanguageById,submitBatch};








// 


