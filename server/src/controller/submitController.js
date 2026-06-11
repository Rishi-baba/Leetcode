import Problem from "../model/problem.js"
import submission from "../model/submission.js"
import { getLanguageById, submitBatch, submitToken } from "../utils/problemUtil.js"


export const submitCode = async(req,res)=>{

  try {
    const userId = res.result._id
  const problemId = req.params.id 

  const {code, language } = req.body

  if(!userId|| !problemId || !code || !language){
    return res.status(400).send("some fields are missing");
  }

  const problem = await Problem.findById(problemId)


  const submittedResult = await submission.create({
    userId,
    problemId,
    code,
    language,
    testCasesPassed: 0,
    status: "pending",
    testCasesTotal:problem.hiddenTestCases.length
  });


  const languageId = getLanguageById(language)

  const submissions = problem.hiddenTestCases.map(( testCases ) => ({
    source_code: code,
    language_id: languageId,
    stdin: testCases.input,
    expected_output: testCases.output,
  }));

  const submitResult = await submitBatch(submissions)
  const resultToken = submitResult.map((value)=>value.token)
  const testResult = await submitToken(resultToken)

  let testCasesPassed = 0
  let runtime = 0;
  let memory = 0;
  let status = "accepted";
  let errorMessage = "";

  for (const test of testResult) {
    if (test.status_id === 3) {
      testCasesPassed++;
      runtime = runtime + parseFloat(test.time);
      memory = Math.max(memory, test.memory);
    } else {
      if (test.status_id === 4) {
        status = "error";
        errorMessage = test.stderr;
      } else {
        status = "wrong";
        errorMessage = test.stderr;
      }
    }
  }
    // Store the result in Database in Submission

  submittedResult.status = status;
  submittedResult.testCasesPassed = testCasesPassed;
  submittedResult.errorMessage = errorMessage;
  submittedResult.runtime = runtime;
  submittedResult.memory = memory;

  await submittedResult.save();
  res.status(201).send(submittedResult)

  } catch (error) {
    res.status(500).send("internal server error" + error)
  }

  

}