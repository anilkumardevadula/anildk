import React, { useEffect, useState } from "react";
import CreateTask from "../modals/CreateTask";
import TableView from "./TableView";

const TodoList = () => {
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [activeTodolist, setActive] = useState(null);

  useEffect(() => {
    let arr = localStorage.getItem("taskList");

    if (arr) {
      let obj = JSON.parse(arr);
      setTaskList(obj);
      setActive(obj);
    }
  }, []);

  const deleteTask = (index) => {
    let tempList = taskList;
    tempList.splice(index, 1);
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(tempList);
    setActive(tempList);
    window.location.reload();
  };

  const updateListArray = (obj, index) => {
    let tempList = taskList;
    tempList[index] = obj;
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(tempList);
    setActive(tempList);
    window.location.reload();
  };

  const toggle = () => {
    setModal(!modal);
  };

  const saveTask = (taskObj) => {
    let tempList = taskList;
    tempList.push(taskObj);
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(taskList);
    setActive(taskList);

    setModal(false);
  };

  const showTasksBasedOnStatus = (status) => {
    const inProgresList =
      activeTodolist &&
      activeTodolist.length > 0 &&
      activeTodolist.filter((e) => e.Status === status);
    if (status === "all") {
      setTaskList(activeTodolist);
    } else {
      setTaskList(inProgresList);
    }
  };
  return (
    <>
      <div className="header text-center">
        <h3>Todo List</h3>
        <button className=" mt-2" onClick={() => setModal(true)}>
          Create Task
        </button>
      </div>
      <div className="d-flex justify-content-around p-2">
        <button
          className="btn btn-primary"
          onClick={() => showTasksBasedOnStatus("all")}
        >
          All
        </button>
        <button
          className="btn btn-primary"
          onClick={() => showTasksBasedOnStatus("progress")}
        >
          In Progress
        </button>
        <button
          className="btn btn-success"
          onClick={() => showTasksBasedOnStatus("completed")}
        >
          Completed
        </button>
        <button
          className="btn btn-danger"
          onClick={() => showTasksBasedOnStatus("uncompleted")}
        >
          Uncompleted
        </button>
      </div>
      <div className="task-container mt-5">
        <table class="table table-bordered">
          <thead>
            <tr className="text-center ">
              <th scope="col">Project Name</th>
              <th scope="col">Name</th>
              <th scope="col">Mobile Number</th>
              <th scope="col">E-Mail</th>
              <th scope="col">Project Name</th>
              <th scope="col">Start Date</th>
              <th scope="col">End Date</th>
              <th scope="col">Description</th>
              <th scope="col">Project Status</th>
              <th scope="col">ActionIteams</th>
            </tr>
          </thead>
          {taskList &&
            taskList.map((obj, index) => (
              <TableView
                key={index}
                taskObj={obj}
                index={index}
                deleteTask={deleteTask}
                updateListArray={updateListArray}
              />
            ))}
        </table>
      </div>
      <CreateTask toggle={toggle} modal={modal} save={saveTask} />
    </>
  );
};

export default TodoList;
