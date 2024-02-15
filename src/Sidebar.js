import React, {useState, useEffect} from 'react'
import './Sidebar.css'
import {Avatar, IconButton} from '@material-ui/core'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatIcon from '@material-ui/icons/Chat';
import SidebarChat from './SidebarChat';
import db from './firebase';
import {useStateValue} from './StateProvider';
import Tooltip from '@material-ui/core/Tooltip';


function Sidebar() {
    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot((snapshot)=>
            setRooms(
                snapshot.docs.map( (doc) =>
                    ({
                        id: doc.id,
                        data: doc.data(),
                    })
                )
            )
        );
        return()=>{
            unsubscribe();
        }
    }, [])

    const [{ user }, dispatch] = useStateValue();

    function myFunction() {
        var input, filter, a, i, cl;
        input = document.getElementById('myInput');
        
        if(input)
            filter = input.value.toUpperCase();

        cl = document.querySelectorAll('.sidebarChat')
       
        for (i = 1; i < cl.length; i++) 
        {
          a = cl[i].innerText;
          if (a.toUpperCase().startsWith(filter)) {
            cl[i].style.display = "";
          }
          else
          {
            cl[i].style.display = "none";
          }
        }
      }

      const createChat = () => {
        const roomName = prompt('Enter name for the chat room');
        if(roomName)
        {
            db.collection('rooms').add({
                name: roomName,
            })
        }
    };

    return (
        <div className='sidebar'>
            <div className='sidebar_header'>
                <Avatar src={user?.photoURL}/>
                <div className='sidebar_headerRight'>
                    <Tooltip title='Stories'>
                        <IconButton>
                            <DonutLargeIcon/> {/* for stories */}
                        </IconButton>
                    </Tooltip>
                    
                    <Tooltip title='New Room'>
                        <IconButton onClick={createChat}>
                            <ChatIcon/>    {/* for groups */}
                        </IconButton>
                    </Tooltip>
                    

                    <Tooltip title='More'>
                        <IconButton>
                            <MoreVertIcon/>  {/* for options */}
                        </IconButton>
                    </Tooltip>
                    
                </div>
            </div>
            <div className='sidebar_search'>
                <form>
                    <input placeholder='Search for a Chat Room' type = 'text' id='myInput' onChange={myFunction}/>
                    <button type='submit'>Send</button>
                </form>
            </div>

            <div className='sidebar_chats'>
                <SidebarChat addNewChat/>
                {rooms.map(room => (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name} />))}
            </div>
        </div>
    )
}

export default Sidebar
