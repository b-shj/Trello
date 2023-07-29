// Packages
import React, {useState, useEffect, useContext} from 'react';
import { v4 as uuidv4 } from 'uuid';

// Context API
import { UserContext } from './userContext';
import { AuthContext } from './authContext';

// Child Components
import Navbar from './Components/Navbar';
import Card from './Components/Card';

// CSS Imports
import './App.css';
import './Components/Card.css';

const BASE_URL = 'https://trelloservice.onrender.com/';


function Trello({ }) {
  const [cards, setCards] = useState([]);

  const [tasks, setTasks] = useState([]);

  const {userId, setUserId} = useContext(UserContext);
  const {authed, setAuthed} = useContext(AuthContext);

  // Cards Call
  useEffect(() => {
    fetch(`${BASE_URL}/cards/${userId}`)
    .then(res => res.json())
    .then(data => {
      setCards([...cards, ...data]);
    })
    }, 
  []);

  // Tasks Call
  useEffect(() => {
    fetch(`${BASE_URL}/tasks/${userId}`)
    .then(res => res.json())
    .then(data => {
      setTasks([...tasks, ...data]);
      })
    }, 
  []);

  // ------ CARD'S STATE ------
  // Update Card Title && Update State
  const updateCardTitle = (cardId, newName) => {
    let edit = cards.slice();
    edit.forEach(currCard => {
      if (currCard.cardId === cardId){
        currCard.cardTitle = newName;
      }
    })
    setCards(edit);

    fetch(`${BASE_URL}/cards/${cardId}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cardTitle: newName
      })
    });
  }

  const addCard = () => {
    let nextCard = {
      cardTitle : `New Card (Update)`,
      cardId : uuidv4(),
    };

    setCards([...cards, nextCard]);

    fetch(`${BASE_URL}/cards`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cardId: nextCard.cardId,
        cardTitle: nextCard.cardTitle,
        user_id : userId
      })
    });
  }

  const deleteCard = (cardId) => {
    setTasks(tasks.filter(currTask => currTask.parentId !== cardId));
    setCards(cards.filter(currCard => currCard.cardId !== cardId));

    fetch(`${BASE_URL}/cards/${cardId}`, {
      method: 'DELETE'
      });
  }
  
  // ------ TASK'S STATE ------
  const updateTaskTitle = (taskId, newName) => {
    let edit = tasks.slice();
    edit.forEach(currTask => {
      if (currTask.taskId === taskId){
        currTask.taskTitle = newName
      }
    })
    setTasks(edit);

    fetch(`${BASE_URL}/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        taskTitle: newName
      })
    });
  }

  // Add Task to Card & Update State
  const addTask = (parentCardId, addedTitle) => {
    const newTask = {
        taskId : uuidv4(),
        taskTitle : addedTitle,
        completed: false,
        parentId : parentCardId,
      };

      setTasks([...tasks, newTask]);

      fetch(`${BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask)
      });
  }

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(currTask => currTask.taskId !== taskId));

    fetch(`${BASE_URL}/tasks/${taskId}`, {
      method: 'DELETE'
      });
  }

  const strikeTask = (taskId) => {
    let edit = tasks.slice();
    edit.forEach(currTask => {
      if (currTask.taskId === taskId){
        let isStruck = currTask.completed;
        currTask.completed = !isStruck;

        fetch(`${BASE_URL}/tasks/completed/${taskId}`, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }, 
          body: JSON.stringify({
            completed: currTask.completed
          })
        });
      }
    })
    setTasks(edit);

  }

  // **** UI ****
  return (
    <>
    <Navbar /> 
    <div className="contain">
      {/* CARDS */}
      {cards.map(currCard => (
        <Card
          key={currCard.cardId}

          cardTitle={currCard.cardTitle}
          taskList={tasks.filter(curr => curr.parentId === currCard.cardId)}
          cardId={currCard.cardId}

          // Card Functions
          updateCardTitle={updateCardTitle}
          deleteCard={deleteCard}

          // Task Functions
          updateTaskTitle={updateTaskTitle}
          addTask={addTask}
          deleteTask={deleteTask}
          strikeTask={strikeTask}
          

        />
      ))}

      {/* NEW CARD */}
      <button className="new-list" onClick={() => addCard()}>+</button>
      <div className="padding-div"></div>
      {/* TEMP - DELETE */}
      {/* <button onClick={() => {
        console.table(cards)
        }}>See Cards</button>
      <button onClick={() => {
        console.table(tasks)
        }}>See Tasks</button> */}
    </div>
    </>
  );
}

export default Trello;