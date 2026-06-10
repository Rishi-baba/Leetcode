import axios from "axios"

export const submitBatch = async(req,res){

  


}

export const getLanguageById = (lang) => {
  const language = {
    "c++": 105,
    "java": 91,
    "javascript": 102
  };

  return language[lang];
};