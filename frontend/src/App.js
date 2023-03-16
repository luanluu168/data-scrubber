import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import DisplayMessage from './DisplayMessage';

function App() {
  const [message, setMessage] = useState(0);

  async function getMessage() {
    try {
      const {data} = await axios.get('/api');
      setMessage(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getMessage();
  }, []);

  return (
    <div>
      {message && <DisplayMessage message={message} setMessage={setMessage}/>}
    </div>
  );
}

export default App;
