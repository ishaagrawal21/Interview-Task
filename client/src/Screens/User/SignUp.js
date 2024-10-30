import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Joi from "joi";
import { Grid, Typography } from "@mui/material";
import apiHelper from "../../Common/ApiHelper";
import { useNavigate } from "react-router-dom";
import Path from "../../Common/Path";

const SignUp = ({ Auth, setAuth }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().min(5).required(),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const { error } = schema.validate(formData, { abortEarly: false });
      if (error) {
        const errorObj = error.details.reduce(
          (acc, curr) => ({ ...acc, [curr.path[0]]: curr.message }),
          {}
        );
        setErrors(errorObj);
      } else {
        setErrors({});
        const result = await apiHelper.signup(formData);

        if (result.data.user) {
          navigate(Path.product);
          setAuth(true);
        }
      }
    } catch (error) {
      setAuth(false);
      alert(error.response.data.message);
      if (error.response && error.response.data) {
        if (
          error.response.status === 400 &&
          error.response.data.message === "Validation Error"
        ) {
          return;
        }
      }
    }
  };

  return (
    <Grid sx={{ display: "flex", justifyContent: "center" }}>
      <Grid width={"500px"} mt={5}>
        <Typography>Sign Up</Typography>
        <TextField
          label="Username"
          name="username"
          fullWidth
          margin="dense"
          error={!!errors.username}
          helperText={errors.username}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          fullWidth
          margin="dense"
          error={!!errors.email}
          helperText={errors.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="dense"
          error={!!errors.password}
          helperText={errors.password}
          onChange={handleChange}
        />
        <Button onClick={handleSubmit} variant="contained" fullWidth>
          Signup
        </Button>
      </Grid>
    </Grid>
  );
};

export default SignUp;
