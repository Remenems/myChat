import './InfoBar.css'
import React from 'react';

const closeIcon = "https://img.icons8.com/plumpy/24/000000/macos-close.png"
const onlineIcon = "https://img.icons8.com/color/48/000000/green-lantern.png"

const InfoBar = ({room}) => (
    <div className="infoBar">
        <div className="leftInnerContainer">
            <img className="onlineIcon" src={onlineIcon} alt="Online"/>
            <h3>{room}</h3>
        </div>
        <div className="rightInnerContainer">
            <a href="/"><img src={closeIcon} alt="Close"></img></a>
        </div>
    </div>
)

export default InfoBar;