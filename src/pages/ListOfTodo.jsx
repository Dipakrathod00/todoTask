import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
export default function ListOfTodo() {
  // let listOfTodo = []
  const [toggle, setToggle] = useState(false);
  const [localData, setLocalData] = useState([]);
  const [todoId, setTodoId] = useState(1);
  const [updatedId, setUpdatedId] = useState("");
  const formik = useFormik({
    initialValues: {
      name: "",
      priorityLevel: "",
      dueDate: "",
      status: "not started",
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      priorityLevel: yup.string().required("priority level required"),
      dueDate: yup.date().required("Date is required"),
    }),
    onSubmit: (value) => {
      console.log(localData);
      if (localData != null || localData != undefined) {
        let isPresent = localData.find((item) => item.id === updatedId);
        console.log(updatedId);
        console.log(value);
        if (isPresent) {
          localData.map(
            (item) =>
              item.id == updatedId &&
              localStorage.setItem(
                "listData",
                JSON.stringify([{ ...value, id: todoId }])
              )
          );
        } else {
          localStorage.setItem(
            "listData",
            JSON.stringify([...localData, { ...value, id: todoId }])
          );
          setTodoId((pre) => pre + 1);
        }
        // setTodoId((pre) => pre + 1);
      } else {
        localStorage.setItem(
          "listData",
          JSON.stringify([{ ...value, id: todoId }])
        );
        setTodoId((pre) => pre + 1);
      }
      setToggle((pre) => !pre);
    },
  });

  const handleDelete = (deleteId) => {
    let data = localData.filter((item) => item.id !== deleteId);
    localStorage.setItem("listData", JSON.stringify(data));
    setToggle((pre) => !pre);
  };

  const handleUpdateData = (todoUpdatedId) => {
    setUpdatedId(todoUpdatedId);
    let data = localData.find((item) => item.id == todoUpdatedId);

    formik.values.name = data.name;
    formik.values.priorityLevel = data.priorityLevel;
    formik.values.dueDate = data.dueDate;
    formik.values.status = data.status;

    setToggle((pre) => !pre);
  };

  const handleUpdateList = () => {
    // let data =
  };
  useEffect(() => {
    setLocalData(JSON.parse(localStorage.getItem("listData")));
  }, [toggle]);
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-6 offset-lg-3">
          <form action="" onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="">Name</label>
              <input
                type="text"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="please enter task Name"
                className="form-control mt-1"
              />
              <p>
                {formik.touched.name && formik.errors.name && (
                  <span className="text-danger">{formik.errors.name}</span>
                )}{" "}
              </p>
            </div>

            <div>
              <label htmlFor="" className="mt-3">
                Select Priority Level{" "}
              </label>
              <select
                name="priorityLevel"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id=""
                className="form-control mt-1"
              >
                <option value="" selected>
                  Choose Level
                </option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <p>
                {formik.touched.priorityLevel &&
                  formik.errors.priorityLevel && (
                    <span className="text-danger">
                      {formik.errors.priorityLevel}
                    </span>
                  )}{" "}
              </p>
            </div>
            <div>
              <label htmlFor="" className="mt-3">
                due Date{" "}
              </label>
              <input
                type="date"
                name="dueDate"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="form-control mt-1"
              />
              <p>
                {formik.touched.dueDate && formik.errors.dueDate && (
                  <span className="text-danger">{formik.errors.dueDate}</span>
                )}{" "}
              </p>
            </div>

            <button className="btn btn-info mt-4" type="submit">
              Submit Task
            </button>
          </form>
        </div>
      </div>

      {localData?.length > 0 && (
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>Sr.No</th>
              <th>Name</th>
              <th>Priority Level</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {localData?.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.priorityLevel}</td>
                <td>{item.dueDate}</td>
                <td>{item.status}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={(e) => handleDelete(item.id)}
                  >
                    Delete
                  </button>{" "}
                  <button
                    className="btn btn-primary"
                    data-bs-target="#updateTask"
                    data-bs-toggle="modal"
                    onClick={() => handleUpdateData(item.id)}
                  >
                    update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div
        class="modal fade"
        data-backdrop="static"
        data-keyboard="false"
        tabindex="-1"
        id="updateTask"
        aria-labelledby="staticBackdrop"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                Update Task
              </h5>
              <button
                type="button"
                class="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form action="" onSubmit={formik.handleSubmit}>
                <div>
                  <label htmlFor="">Name</label>
                  <input
                    type="text"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    placeholder="please enter task Name"
                    className="form-control mt-1"
                  />
                  <p>
                    {formik.touched.name && formik.errors.name && (
                      <span className="text-danger">{formik.errors.name}</span>
                    )}{" "}
                  </p>
                </div>

                <div>
                  <label htmlFor="" className="mt-3">
                    Select Priority Level{" "}
                  </label>
                  <select
                    name="priorityLevel"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.priorityLevel}
                    id=""
                    className="form-control mt-1"
                  >
                    <option value="" selected>
                      Choose Level
                    </option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                  <p>
                    {formik.touched.priorityLevel &&
                      formik.errors.priorityLevel && (
                        <span className="text-danger">
                          {formik.errors.priorityLevel}
                        </span>
                      )}{" "}
                  </p>
                </div>
                <div>
                  <label htmlFor="" className="mt-3">
                    due Date{" "}
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dueDate}
                    className="form-control mt-1"
                  />
                  <p>
                    {formik.touched.dueDate && formik.errors.dueDate && (
                      <span className="text-danger">
                        {formik.errors.dueDate}
                      </span>
                    )}{" "}
                  </p>
                </div>
                <div>
                  <label htmlFor="" className="mt-3">
                    Status{" "}
                  </label>
                  <select
                    name="status"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.status}
                    id=""
                    className="form-control mt-1"
                  >
                    {/* <option value="" selected>
                      Choose Status
                    </option> */}
                    <option value="not Started">not Started</option>
                    <option value="in Progress">in progress</option>
                    <option value="completed">completed</option>
                  </select>
                  {/* <p>
                    {formik.touched.priorityLevel &&
                      formik.errors.priorityLevel && (
                        <span className="text-danger">
                          {formik.errors.priorityLevel}
                        </span>
                      )}{" "}
                  </p> */}
                </div>
                <button
                  className="btn btn-info mt-4"
                  onChange={() => handleUpdateList()}
                  type="submit"
                  data-bs-dismiss="modal"
                >
                  Update Task
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
