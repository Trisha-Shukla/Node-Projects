import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate=useNavigate();


  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const formdata = new FormData(e.target);
      const finalData = Object.fromEntries(formdata.entries());
      const response = await axios.post("http://localhost:8080/api/user/login", finalData,{withCredentials:true});
      if (response.status === 200) {
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      // setMessage(error);
    }
  }

  return (
    <>
      

      <h2>Log in to your account</h2>

      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Enter your Username"
          
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default Login;