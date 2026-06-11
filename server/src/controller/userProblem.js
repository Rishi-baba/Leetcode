import Problem from "../model/problem.js";
import { getLanguageById, submitBatch, submitToken } from "../utils/problemUtil.js";

export const createProblem = async (req, res) => {
  try {
    const {
      title,
      description,
      difficulty,
      tags,
      visibleTestCases,
      hiddenTestCases,
      startCode,
      referenceSolution,
      problemCreator,
    } = req.body;

    
    for(const {language,completeCode} of referenceSolution){

      const languageId = getLanguageById(language)

      const submissions = visibleTestCases.map(( testCases ) => ({
        source_code: completeCode,
        language_id: languageId,
        stdin: testCases.input,
        expected_output: testCases.output,
    }));

    const submitResult = await submitBatch(submissions)

    const resultToken = submitResult.map((value)=>value.token)

    const testResult = await submitToken(resultToken)

    for(const test of testResult){
      console.log(test.status_id);
      
      if(test.status_id!=3){
      return res.status(400).send("error occured")
      }
    }

    }

    //storing in db
    const userProblem = await Problem.create({
      ...req.body,
      problemCreator: res.result._id
    })

    res.status(201).send("problem saved successfully")

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};