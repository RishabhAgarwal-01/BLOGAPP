import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Label, TextInput, Alert, Spinner } from "flowbite-react";
import OAuth from "../components/OAuth.jsx";

 
function Signup() {
  const [formData, setFormData] = useState({}); //state storing the formData as an object
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() }); //we will update the formData by making it a keyvalue pair whichever input is calling the handleChange will give it's id and value
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      //cleaning previous stored errors if any and setting the Loading state true every time the submit happen and stop rendering the submit button till res is get.
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json(); //awaiting res from the server side it will return either "Signup sucessful" or an object {sucess:false, statusCode: statusCode, message:message} from server side if any error occur
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
     
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      //handling client side error while doing signup submit
      setErrorMessage(error.message);
      //if res not okay or some client side error like no internet happen then
      //after error message is displyed again make the loading false to stop rendering the loading effect and render the submit button again
      setLoading(false);
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
            This is a personal project. You can sign up with your email and
            password Or with Google.
          </p>
        </div>

        {/*div for the right side showing the signup form*/}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="your username" />
              <TextInput
                type="text"
                placeholder="username"
                id="username"
                onChange={handleChange}
              />
            </div>
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
                placeholder="password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="greenToBlue"
              type="submit"
              disabled={loading}
            >
              {loading ? <Spinner size="sm" /> : "SignUp"}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign-In
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

export default Signup;
