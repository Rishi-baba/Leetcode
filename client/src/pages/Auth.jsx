import { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";

const Auth = () => {
  const [islogin, setislogin] = useState(true);

  return (
    <>
      {islogin ? <Login /> : <Signup />}

      <button
        onClick={() => setislogin(!islogin)}
        className="fixed bottom-5 right-5 bg-black text-white px-4 py-2 rounded"
      >
        Switch
      </button>
    </>
  );
};

export default Auth;