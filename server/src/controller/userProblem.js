import { getLanguageById, submitBatch } from "../utils/problemUtil";

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

      const submissions = visibleTestCases.map(({ input, output }) => ({
      source_code: completeCode,
      language_id: languageId,
      stdin: input,
      expected_output: output,
    }));

    const submitResult = await submitBatch(submissions)
    
    }


  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};