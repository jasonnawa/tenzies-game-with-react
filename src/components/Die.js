import React from "react";


export default function Die(props){
    const styles = {
        backgroundColor : props.isHeld? "#59E391": "white"
    }
    
    return(
        <div className="box" style={styles} onClick={props.holdDice} >
            <p className="bold">{props.value}</p>
        </div>
    )
}