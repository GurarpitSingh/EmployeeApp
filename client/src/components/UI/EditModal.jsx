import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "boxicons";

const EditModal = (props) => {
  const [employee, setEmployee] = useState(props.data.name);
  const [department, setDepartment] = useState(props.data.department);
  const [salary, setSalary] = useState(props.data.salary);

  const editEmployee = (e) => {
    // alert(e.target.dataset.id)
    axios
      .post(`http://localhost:3000/employees/update/${e.target.dataset.id}`, {
        name: employee,
        department: department,
        salary: salary,
      })
      .then((res) => {
        props.triggerChange();
        toast.success("Employee Updated Successfully!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteEmployee = (e) => {
    axios
      .post(`http://localhost:3000/employees/delete/${e.target.dataset.id}`)
      .then((res) => {
        props.triggerChange();
        toast.success("Employee Deleted Successfully!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <input type="checkbox" id={props.data._id} className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="flex justify-between ">
            <h3 className="font-bold text-2xl">Edit Details</h3>
            <label
              data-id={props.data._id}
              htmlFor={props.data._id}
              onClick={deleteEmployee}
              className="btn bg-red-900 border-0 hover:bg-red-700"
            >
              <box-icon
                data-id={props.data._id}
                name="trash"
                color="white"
              ></box-icon>
            </label>
          </div>
          <div className="flex justify-start w-full px-0">
            <div className="card min-w-full max-w-sm bg-base-100">
              <div className="card-body px-0 py-8">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Employee</span>
                  </label>
                  <input
                    type="text"
                    value={employee}
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
                    value={department}
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
                    value={salary}
                    placeholder="Salary"
                    className="input input-bordered"
                    onChange={(e) => setSalary(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="modal-action">
            <label
              htmlFor={props.data._id}
              data-id={props.data._id}
              onClick={editEmployee}
              className="btn"
            >
              save
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
