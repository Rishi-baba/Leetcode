import Problem from "../model/problem.js";
import submission from "../model/submission.js";
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

export const problemUpdate= async(req,res)=>{

  try {
    const  _id  = req.params.id
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

    if(!_id){
      return res.status(400).send("id not found")
    }


    
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
    } 
    const newProblem = await Problem.findByIdAndUpdate(_id, {...req.body}, {runValidators:true, returnDocument: "after"})

    res.status(200).send(newProblem)


  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }

}

export const deleteProblem = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id)
      return res.status(400).send("ID is Missing");

    const deletedProblem = await Problem.findByIdAndDelete(id);

    if (!deletedProblem)
      return res.status(404).send("Problem is Missing");

    res.status(200).send("Successfully Deleted");
  } catch (error) {
    console.error(error);

    res.status(500).send("Something went wrong");
  }
};

export const getProblemById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id)
      return res.status(400).send("ID is Missing");

    const getProblem = await Problem.findById(id).select("_id title description difficulty tags visibleTestCases startCode referenceSolution");

    if (!getProblem)
      return res.status(404).send("Problem is Missing");

    res.status(200).send(getProblem);
  } catch (err) {
    console.error(err);

    res.status(500).send("Something went wrong");
  }
};
export const getAllProblem = async (req, res) => {
  try {
    const getProblem = await Problem.find({}).select("_id title difficulty tags ");

    if (getProblem.length===0)
      return res.status(404).send("Problem is Missing");

    res.status(200).send(getProblem);
  } catch (err) {
    console.error(err);

    res.status(500).send("Something went wrong");
  }
};
export const getsubmittedProblem =async (req,res)=>{

  try {
    const userId = res.result._id
    const problemId = req.params.pid

    const ans = await submission.find(({userId,problemId}))

    if(ans.length==0){
      res.ststus(200).send("no submission")
    }

    res.ststus(200).send(ans)
  } catch (error) {
    res.ststus(500).send("internl error", error)
  }
  
}