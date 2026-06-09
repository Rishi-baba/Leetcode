import validator from "validator"

const validate = (data)=>{

  const mandatoryField = ['firstname', 'emailId', 'password']

  const isAllowed = mandatoryField.every((k)=>{Object.key(data).includes(k)})

  if(!isAllowed){
    throw new Error("Some fields are missing")
  }
  if(!validate.isEmail(data.emailId)){
    throw new Error("invalid email")
  }
  if(!validate.isStrongPassword(data.password)){
    throw new Error("week password")
  }

}
export default validate