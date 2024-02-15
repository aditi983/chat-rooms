import React, {useEffect, useState} from 'react' 
import './SidebarChat.css'
import {Avatar} from '@material-ui/core';
import db from './firebase';
import {Link} from 'react-router-dom';

function SidebarChat({id, name, addNewChat}) {
    /*const [seed, setSeed] = useState('');
    useEffect(() => {
        setSeed(Math.floor(Math.random()*1000));
    }, [])*/
    const [messages, setMessages] = useState('')

    useEffect(() => {
        if(id) {
            db.collection('rooms')
              .doc(id)
              .collection('messages')
              .orderBy('timestamp', 'desc')
              .onSnapshot((snapshot)=>
              setMessages(snapshot.docs.map((doc)=>doc.data())))
        }
        
    }, [id])

    const createChat = () => {
        const roomName = prompt('Enter name for the chat room');
        if(roomName)
        {
            db.collection('rooms').add({
                name: roomName,
            })
        }
    };
    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className='sidebarChat'>
                <Avatar src = {`https://avatars.dicebear.com/api/human/${id}.svg`}/>
                <div className='sidebarChat_info'>
                    <h3>{name}</h3>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    ) : (
        <div onClick={createChat} className='sidebarChat'>
            <button><h3>Create New Chat Room</h3></button>
                       
        </div>
    );
}

export default SidebarChat

