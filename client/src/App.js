// Packages
import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Loading from './Components/Loading.js'

// Context API
import { UserContext } from './userContext';
import { AuthContext } from './authContext';

// Page Components
import Trello from './Trello';
import Landing from './Landing';

// CSS Imports
import './App.css';
import './Components/Card.css';

function App( {history} ) {
  const [userId, setUserId] = useState("Default Value");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      const loggedIn = localStorage.getItem('rememberMe') === 'true';
      if (loggedIn){
        setUserId(localStorage.getItem('userId'));
        setAuthed(true);
      }    

      setLoading(false);
    },
    []);

  
     return (
        <React.Fragment>
          {loading ? (
            <Loading />
          ) : (
            <AuthContext.Provider value={{ authed, setAuthed }}>
              <UserContext.Provider value={{ userId, setUserId }}>
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route
                      path="/home"
                      element={authed ? <Trello /> : <Navigate to="/" replace />}
                    />
                  </Routes>
                </BrowserRouter>
              </UserContext.Provider>
            </AuthContext.Provider>
          )}
        </React.Fragment>
    )
}

export default App;