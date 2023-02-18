import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState(0);

  async function getMessage() {
    try {
      const {data} = await axios.get('/api');
      setMessage(data.res);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getMessage();
  }, []);

  return (
    <div>
      {message}
    </div>
  );
}

export default App;
