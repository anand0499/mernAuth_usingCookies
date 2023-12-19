import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const history=useNavigate()
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    // setInputs({
    //   ...inputs,[name]:value
    // })
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  const sendRequest = async () => {
    const payload = {
      email: inputs.email,
      password: inputs.password,
    };
    const res =await axios
      .post("http://www.localhost:8080/auth/login", payload)
      .catch((err) => {
        console.log(err);
      });
      const data=await res?.data;
      return data;
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    sendRequest().then(()=>history("/users"))
    setInputs({
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <Box
          marginLeft={"auto"}
          marginRight={"auto"}
          width={300}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="h4">Login</Typography>
          <TextField
            type="email"
            name="email"
            value={inputs.email}
            variant="outlined"
            placeholder="Email"
            margin="normal"
            onChange={handleOnChange}
          />
          <TextField
            type="password"
            name="password"
            value={inputs.password}
            variant="outlined"
            placeholder="Password"
            margin="normal"
            onChange={handleOnChange}
          />
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Box>
      </form>
    </div>
  );

}

export default Login