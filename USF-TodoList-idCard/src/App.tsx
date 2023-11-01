// Importing the CSS file
import "./styles.css";
// Importing necessary dependencies from React
import React, { useEffect, useState } from "react";

// Main component
export default function App() {
  /*
    API Call Task: 
    #1. Create an interface for API call here
  */

  /*
    API Call Task: 
    #2. Fetch data from "https://randomuser.me/api/"
    #3. Create a type-safe display for the user's information
    #4. Add a loading state & catch errors when fetching data
    #5. Display a contact card with user info
  */

  /* 
    Todo List Task:
    #1. Create functions to add/remove tasks based on user input
    #2. Prevent the user from adding empty tasks & duplicate tasks
    #3. Add a checkbox that creates a strikethrough when checked
    #4. Add any extra style to style.css
  */

  // Initial tasks for the to-do list
  let initial: string[] = [
    "Don't allow empty tasks",
    "Add strikethrough style to checked-off tasks",
    "Don't allow duplicate tasks",
    "Give it some style ✨",
    "Let users delete tasks"
  ];

  // State for managing the tasks in the to-do list
  const [tasks, setTasks] = useState<string[]>(initial);
  // State for managing the user input for adding tasks
  const [taskInput, setTaskInput] = useState<string>("");

  // Function to add tasks based on user input
  const addTask = () => {
    // Prevent adding empty tasks
    if (taskInput.trim() === "") {
      alert("Tasks cannot be empty!");
      return;
    }

    // Check for any duplicates
    if (tasks.includes(taskInput)) {
      alert("Task already exists!");
      return;
    }

    // Add the user's input as a task
    setTasks((prevTasks) => [...prevTasks, taskInput]);
    // Clear the input field
    setTaskInput("");
  };

  // State to track completed tasks
  const [completedTasks, setCompletedTasks] = useState<boolean[]>(
    Array(initial.length).fill(false)
  );

  // Function to remove a task
  const removeTask = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  // Function to handle checkbox click and mark tasks as completed
  const handleCheckboxClick = (index: number) => {
    const updatedCompletedTasks = [...completedTasks];
    updatedCompletedTasks[index] = !completedTasks[index];
    setCompletedTasks(updatedCompletedTasks);
  };

  // API FETCHING
  const [userData, setUserData] = useState(null);

  // Fetch user data from an API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/");
        const data = await response.json();

        // Extract relevant user information
        const user = {
          title: data.results[0].name.title,
          firstName: data.results[0].name.first,
          lastName: data.results[0].name.last,
          phone: data.results[0].phone,
          email: data.results[0].email,
          age: data.results[0].dob.age,
          personalPic: data.results[0].picture.large
        };

        // Set the user data to be displayed
        setUserData(user);
      } catch (err) {
        // Log an error if there's an issue with the API call
        console.error("Error fetching API: ", err);
      }
    };

    // Fetch data when the component mounts
    fetchData();
  }, []);

  // JSX to render the component
  return (
    <div className="App">
      {/* University logo */}
      <img
        className="bullLogo"
        src="https://1000logos.net/wp-content/uploads/2022/07/University-of-South-Florida-Logo.png"
      />
      {/* Title for the to-do list */}
      <div className="titleFront">
        <h1>Task 1: TODO List</h1>
        <h2>
          <i>Here is what you need to do:</i>
        </h2>
      </div>

      {/* To-do list */}
      <ul className="checkbox-list">
        {tasks.map((item, index) => (
          <li key={index}>
            {/* Checkbox to mark tasks completed */}
            <div
              className={`list-item ${
                completedTasks[index] ? "completed" : " "
              }`}
            >
              <input
                type="checkbox"
                id={`task${index}`}
                checked={completedTasks[index]}
                onChange={() => handleCheckboxClick(index)}
              />

              {/* Label for the task, includes the task text and a delete button */}
              <label htmlFor={`task${index}`}>
                {" "}
                {item}
                {/* Delete button */}
                <button
                  onClick={() => removeTask(index)}
                  className="delete-button"
                >
                  X
                </button>
              </label>
            </div>
          </li>
        ))}
        {/* Input field for user input */}
        <input
          className="add-task-input"
          type="text"
          placeholder="Enter a task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />

        {/* Button to add tasks */}
        <button className="add-task" onClick={addTask}>
          Add Task
        </button>
      </ul>

      {/* API Call */}
      <div className="API-call">
        <div className="titleFront">
          <h1>Task 2: API Call</h1>
        </div>
        {/* Container for the contact card */}
        <div className="container">
          {/* Card to display user information */}
          <div className="card">
            {/* Check if user data is available */}
            {userData ? (
              <>
                <ul>
                  <h2 className="contact">Contact Card</h2>
                  <ul>
                    <p>Title: {userData.title}</p>
                    <p>First Name: {userData.firstName}</p>
                    <p>Last Name: {userData.lastName}</p>
                  </ul>

                  <ul>
                    <p>Phone: {userData.phone}</p>
                    <p>Email: {userData.email}</p>
                    <p>Age: {userData.age}</p>
                  </ul>
                </ul>
                {/* User profile picture */}
                <img
                  className="profilePic"
                  src={userData.personalPic}
                  alt="UserProfilePicture"
                />
              </>
            ) : (
              <p>loading </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
