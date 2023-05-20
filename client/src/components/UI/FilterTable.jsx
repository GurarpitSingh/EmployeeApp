import React, { useState, useEffect } from "react";
import axios from "axios";
import EditModal from "./EditModal";
import { ToastContainer } from "react-toastify";

const FilterTable = (props) => {
  const [data, setData] = useState([]);

  let fetchFn = () => {
    axios
      .get("http://localhost:3000/employees")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchFn();
  }, []);
  useEffect(() => {
    fetchFn();
  }, [props.data]);

  const sortEmployees = (e) => {
    // alert(e.target.value);
    axios
      .get(`http://localhost:3000/employees/filter/${e.target.value}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="overflow-x-auto w-full ">
        <h1 className="text-5xl font-bold mb-8">Employee Table</h1>

        <table className="table w-full ">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>
                Employee Name
                <select
                  name=""
                  className="bg-transparent text-gray-700 pl-4"
                  onChange={sortEmployees}
                >
                  <option value=""></option>
                  <option value="A-Z">A-Z</option>
                  <option value="Z-A">Z-A</option>
                </select>
              </th>
              <th>
                Department
                <select
                  name=""
                  className="bg-transparent text-gray-700 pl-4"
                  onChange={sortEmployees}
                >
                  <option value=""></option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                </select>
              </th>
              <th>
                Salary
                <select
                  name=""
                  className="bg-transparent text-gray-700 pl-4"
                  onChange={sortEmployees}
                >
                  <option value=""></option>
                  <option value="HighToLow">High to low</option>
                  <option value="LowToHigh">Low to high</option>
                </select>
              </th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data
              ? data.map((employee, key) => {
                  return (
                    <tr key={key}>
                      <th>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </th>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                key={key}
                                src={
                                  "https://source.unsplash.com/200x200/?person"
                                }
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{employee.name}</div>
                            <div className="text-sm opacity-50">India</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        {employee.department.split(",")
                          ? employee.department.split(",").map((word, key) => {
                              return (
                                <span
                                  key={key}
                                  className="badge badge-accent badge-md"
                                >
                                  {word}
                                </span>
                              );
                            })
                          : employee.department}

                        <br />
                        <span className="badge badge-ghost badge-sm">
                          Employee
                        </span>
                      </td>
                      <td>{employee.salary}</td>
                      <th>
                        <label
                          className="btn btn-ghost btn-xs"
                          htmlFor={employee._id}
                        >
                          <box-icon name="edit-alt" color="gray"></box-icon>
                        </label>
                        <EditModal data={employee} triggerChange={fetchFn} />
                        <ToastContainer />
                      </th>
                    </tr>
                  );
                })
              : null}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th>Employee Name</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Edit</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default FilterTable;
