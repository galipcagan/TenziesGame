import React from "react"

export default function Die(prop){
    return(
        <div
         
        className={prop.isHeld?"die-face die-selected" :"die-face"} 
        onClick={()=>prop.holdDice(prop.id)}>
            <h2 className="die-num">{prop.value}</h2>
            </div>
    )
}