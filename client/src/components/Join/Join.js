import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Join.css'


const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');


    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">MyChat</h1>
                <h2 className="subtitle">made by Remenems</h2>
                <div><input placeholder = "Name" className= "joinInput" type='text' onChange={(event) => setName(event.target.value)}/></div>
                <div><input placeholder = "Room" className= "joinInput mt-20" type='text' onChange={(event) => setRoom(event.target.value)}/></div>
                <Link 
                    onClick = {event => (!name || !room)? event.preventDefault() : null}
                    to={'/chat?name='+name+'&room='+room}
                >
                    <button className="button mt-20" type="submit">Sign In</button>
                </Link>
                <a href="https://github.com/Remenems/myChat" className="linkToCode">source code</a>
            </div>
        </div>
    )
}

export default Join;