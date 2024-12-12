import { useState } from "react";
import axios from "axios";

function Register() {
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const formdata = new FormData(e.target);
      const finalData = Object.fromEntries(formdata.entries());
      const response = await axios.post("http://localhost:8080/api/user/register", finalData);
      if (response.status === 201) setMessage(response.data.message);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {message && <h3>{message}</h3>}
      <h2>Sign Up</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Enter your Name" autoFocus />
        <br />
        <input type="email" name="email" placeholder="Enter your Email" />
        <br />
        <input type="text" name="phone" placeholder="Enter your Phone" />
        <br />
        <input type="text" name="userName" placeholder="Pick a Username" />
        <br />
        <input type="password" name="password" placeholder="Choose a strong password" />
        <br />
        <button type="submit">Register</button>
      </form>
    </>
  );
}

export default Register;
