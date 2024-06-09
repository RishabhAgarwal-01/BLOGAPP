import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Label, TextInput, Alert, Spinner } from "flowbite-react";
import { signInStart, signInFailure, signInSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

function SignIn() {
  const [formData, setFormData] = useState({}); //state storing the formData as an object
  const dispatach = useDispatch();
  const {loading, error:errorMessage} = useSelector(state=> state.user);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() }); //we will update the formData by making it a keyvalue pair whichever input is calling the handleChange will give it's id and value
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      dispatach(signInFailure("please fill out all fields"));
    }
    try {
      dispatach(signInStart()); //store reducer action

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json(); //awaiting res from the server side it will return either "Signup sucessful" or an object {sucess:false, statusCode: statusCode, message:message} from server side if any error occur
      if (data.success === false) {
        dispatach(signInFailure(data.message)); //store reducer handling the error or failure 
      }

      if (res.ok) {
        dispatach(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      //handling client side error while doing signup submit
       //if res not okay or some client side error like no internet happen then
      //after error message is displyed again make the loading false to stop rendering the loading effect and render the submit button again
      signInFailure(error.message);
    }
  };

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
            This is a personal project. You can sign in with your email and
            password Or with Google.
          </p>
        </div>

        {/*div for the right side showing the signup form*/}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="your password" />
              <TextInput
                type="password"
                placeholder="********"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="greenToBlue"
              type="submit"
              disabled={loading}
            >
              {loading ? <Spinner size="sm" /> : "SignIn"}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign-Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignIn;
