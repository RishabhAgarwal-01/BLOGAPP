import React from "react";
import { Link } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";

function Signup() {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/*left side div showing the logo*/}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg">
              Rishabh's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is a personal project. You can sign up with your email and
            password Or with Google.
          </p>
        </div>

        {/*div for the right side showing the signup form*/}
        <div className="flex-1">
           <form className="flex flex-col gap-4">
              <div>
                <Label value="your username" />
                <TextInput type="text" placeholder="username" id="username" />
              </div>
              <div>
                <Label value="your email" />
                <TextInput type="text" placeholder="name@company.com" id="email" />
              </div>
              <div>
                <Label value="your password" />
                <TextInput type="text" placeholder="password" id="password" />
              </div>
              <Button gradientDuoTone='greenToBlue' type="submit">
                SignUp
              </Button>
           </form>
           <div className="flex gap-2 text-sm mt-5">
             <span>Have an account?</span>
             <Link to="/sign-in" className="text-blue-500">
                Sign-In
             </Link>
           </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
