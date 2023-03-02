import { useState } from 'react';
import './App.css';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import Message from './Message';


function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = (event) => {
    event.preventDefault();
    setMessages([...messages, input]);
    setInput('');
  }
  return (
    <div className="App">
      <h1>Hello!!!</h1>


      <FormControl>
        <InputLabel>Enter Message</InputLabel>
        <Input value={input} onChange={event => setInput(event.target.value)} />
        <Button disabled={!input} variant='contained' color='primary' type='submit' onClick={sendMessage}>Send Message</Button>
      </FormControl>



     

      {/* Messages */}

      {
        messages.map(message => (
          <Message text={message}/>
        ))
      }

    </div>
  );
}

export default App;
