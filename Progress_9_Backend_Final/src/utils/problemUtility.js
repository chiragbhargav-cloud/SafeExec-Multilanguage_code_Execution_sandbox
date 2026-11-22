const axios = require('axios');


const getLanguageById = (lang)=>{
    if (typeof lang !== 'string') {
        throw new Error("Invalid language");
    }
    const language = {
        "c": 48,
        "cpp": 54,
        "c++": 54,
        "csharp": 51,
        "java": 62,
        "javascript": 63,
        "python": 71,
        "python3": 71,
        "go": 60,
        "rust": 73,
        "typescript": 74,
        "kotlin": 78
    };


    const languageId = language[lang.toLowerCase()];
    if (!languageId) {
        throw new Error("Unsupported language");
    }
    return languageId;
}


const submitBatch = async (submissions)=>{
  if (!Array.isArray(submissions) || submissions.length === 0) {
    throw new Error("No submissions provided");
  }

const options = {
  method: 'POST',
  url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
  params: {
    base64_encoded: 'false'
  },
  headers: {
    'x-rapidapi-key': process.env.RAPIDAPI_KEY,
    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
    'Content-Type': 'application/json'
  },
  data: {
    submissions
  }
};

async function fetchData() {
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        throw error;
    }
}

 return await fetchData();

}

const waiting = (timer) => {
    return new Promise(resolve => {
        setTimeout(resolve, timer);
    });
};

// ["db54881d-bcf5-4c7b-a2e3-d33fe7e25de7","ecc52a9b-ea80-4a00-ad50-4ab6cc3bb2a1","1b35ec3b-5776-48ef-b646-d5522bdeb2cc"]

const submitToken = async(resultToken)=>{
 if (!Array.isArray(resultToken) || resultToken.length === 0) {
   throw new Error("No submission tokens provided");
 }

const options = {
  method: 'GET',
  url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
  params: {
    tokens: resultToken.join(","),
    base64_encoded: 'false',
    fields: '*'
  },
  headers: {
    'x-rapidapi-key': process.env.RAPIDAPI_KEY,
    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
  }
};

async function fetchData() {
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        throw error;
    }
}


 let attempts = 0;
 const maxAttempts = 30;

 while(attempts < maxAttempts){

 const result =  await fetchData();

  const IsResultObtained =  result.submissions.every((r)=>r.status_id>2);

  if(IsResultObtained)
    return result.submissions;

  
  await waiting(1000);
  attempts++;
}

 throw new Error("Judge0 timed out");
}


module.exports = {getLanguageById,submitBatch,submitToken};








// 


