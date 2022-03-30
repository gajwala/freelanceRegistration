import React, { useEffect, useState } from "react";
import "./form.css";
import "react-toastify/dist/ReactToastify.css";
import bgImg from "../assets/admin.jpeg";
import axios from "axios";
import { baseURL } from "../App";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

const ConfigForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    id: "",
  });

  useEffect(() => {
    axios
      .get(`${baseURL}/user/config`)
      .then((res) => {
        let { firstName, lastName, dob, gender, _id } = res.data.result[0];
        setFormData((prev) => ({
          ...prev,
          firstName,
          lastName,
          dob,
          gender,
          id: _id,
        }));
      })
      .catch((err) => {
        toast.error(err.message, {
          autoClose: 2000,
        });
      });
  }, []);
  const saveData = () => {
    axios
      .post(`${baseURL}/user/config`, formData)
      .then((res) => {
        console.log(res);
        toast.success("data saved successfully", {
          autoClose: 2000,
        });
      })
      .catch((err) => {
        toast.error(err.message, {
          autoClose: 2000,
        });
      });
  };

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <section>
      <div className="register">
        <div className="col-1">
          <h2>Admin Config</h2>
          <span>Please add fields to display on registration page.</span>

          <form
            id="form"
            className="flex flex-col"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              onChange={handleChange}
              name="firstName"
              placeholder="firstName"
              value={formData.firstName}
            />
            <input
              type="text"
              name="lastName"
              onChange={handleChange}
              placeholder="lastName"
              value={formData.lastName}
            />
            <select
              name="gender"
              id="gender"
              onChange={handleChange}
              className="gender"
              value={formData.gender}
            >
              <option value="select">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <input
              type="date"
              id="dob"
              name="dob"
              onChange={handleChange}
              value={formData.dob}
            />
            <button className="btn" onClick={saveData}>
              Sign In
            </button>
          </form>
          <NavLink to="/">Go Back</NavLink>
        </div>
        <div className="col-2">
          <img src={bgImg} alt="myimage" />
        </div>
      </div>
    </section>
  );
};

export default ConfigForm;
