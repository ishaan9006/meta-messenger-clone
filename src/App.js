import { useEffect, useState } from 'react';
import './App.css';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import Message from './Message';
import db from './Firebase/firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import FlipMove from "react-flip-move";

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [userName, setUsername] = useState('');


  useEffect(() => {
    db.collection('messages').onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})));
    })
  }, []);


  useEffect(() => {
    setUsername(prompt('Please enter your name!'));
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    db.collection('messages').add({
      message: input,
      username: userName,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp() 
    })
    setInput('');
  }
  return (
    <div className="App">
      <h1>{userName}</h1>

      <form>
        <FormControl>
          <InputLabel>Enter Message</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)} />
          <Button disabled={!input} variant='contained' color='primary' type='submit' onClick={sendMessage}>Send Message</Button>
        </FormControl>
      </form>

      <FlipMove>
        {
          messages.map(({id, message}) => (
            <Message key={id} username={userName} message={message}/>
          ))
        } 
      </FlipMove>

        


    </div>
  );
}

export default App;
