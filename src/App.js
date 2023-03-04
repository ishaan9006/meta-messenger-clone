import { useEffect, useState } from 'react';
import './App.css';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import Message from './Message';
import db from './Firebase/firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import FlipMove from "react-flip-move";
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@material-ui/core';

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
      <img src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w-100&h=100"/>
      <h1>{userName}</h1>

      <form className="app_form">
        <FormControl>
          <InputLabel>Enter Message</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)} />

          <IconButton disabled={!input} variant='contained' color='primary' type='submit' onClick={sendMessage}>
            <SendIcon />
          </IconButton>

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
