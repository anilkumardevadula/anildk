import React, { useState } from "react";
import EditTask from "../modals/EditTask";

const TableView = ({ taskObj, deleteTask, updateListArray, index }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const updateTask = (obj) => {
    updateListArray(obj, index);
  };

  const handleDelete = () => {
    deleteTask();
  };

  return (
    <tbody className="text-center">
      <tr>
        <td>{taskObj.Projectname}</td>
        <td>{taskObj.Name}</td>
        <td>{taskObj.mobilenumber}</td>
        <td>{taskObj.Email}</td>
        <td>{taskObj.Projectname}</td>
        <td>{taskObj.startdate}</td>
        <td>{taskObj.enddate}</td>
        <td>{taskObj.Description}</td>
        <td>{taskObj.Status}</td>
        <td>
          <div className="d-flex justify-content-around ">
            <i className="far fa-edit " onClick={() => setModal(true)}></i>
            <i className="fas fa-trash-alt" onClick={handleDelete}></i>
          </div>
        </td>
      </tr>
      <EditTask
        modal={modal}
        toggle={toggle}
        updateTask={updateTask}
        taskObj={taskObj}
      />
    </tbody>
  );
};

export default TableView;
