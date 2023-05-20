import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import FilterTable from "./UI/FilterTable";
import axios from "axios";

const Dashboard = () => {
  const [employee, setEmployee] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");

  const [reloadTrigger, setReloadTrigger] = useState("");

  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  const handleSubmit = (e) => {
    axios
      .post("http://localhost:3000/employees/create", {
        name: employee,
        department: department,
        salary: salary,
      })
      .then((res) => {
        toast.success("Employee Registered Successfully!");
        setReloadTrigger(res.data.name);
      })
      .catch((err) => {
        alert("Please Fill out all the fields!");
        console.log(err);
      });
  };

  return (
    <div>
      <div className="flex">
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Create New Employee!</h1>
              <p className="py-6">
                Please fill in the details for new employee. This registration
                will be stored in EmployeeTable in database.
              </p>
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Employee</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Employee Name"
                    className="input input-bordered"
                    onChange={(e) => setEmployee(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Department</span>
                  </label>
                  <textarea
                    type="text"
                    placeholder="Department (Frontend, Backend)"
                    className="input input-bordered pt-3"
                    onChange={(e) => setDepartment(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Salary</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Salary (in INR)"
                    className="input input-bordered"
                    onChange={(e) => setSalary(e.target.value)}
                  />
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary" onClick={handleSubmit}>
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-12 justify-center">
        <FilterTable data={reloadTrigger} />
      </div>
    </div>
  );
};

export default Dashboard;
