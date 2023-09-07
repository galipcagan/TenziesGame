import React from 'react'
import Die from './Die'
import {nanoid} from "nanoid"
import Confetti from "react-confetti"


export default function App() {

  const [diceArray, setDiceArray] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false);
  const [totRolls, setTotRolls] = React.useState(1);

  React.useEffect( () =>{
    setTenzies(diceArray.every(x=> x.isHeld && diceArray[0].value == x.value))
  },[diceArray])

  function allNewDice(){
    const newDiceArr = []
    for(let i=0; i<10; i++)
    {
      newDiceArr.push({
        value: Math.floor(Math.random() * (6) + 1),
        isHeld:false,
        id:nanoid()
      });
    }
    return newDiceArr  
  }
  function holdDice(id){
    setDiceArray(prev =>prev.map(x=>({
        ...x,
        isHeld: x.id ===id ?!x.isHeld :x.isHeld
      })
    ))
  }



  const diceElements = diceArray.map(die => 
  <Die 
    key={die.id}
    id={die.id}
    value={die.value} 
    isHeld={die.isHeld}
    holdDice={holdDice} />)

  function rollDice(){
    if(!tenzies){    
      setDiceArray(prev => prev.map(dice=> ({
        ...dice,
        id: dice.isHeld ? dice.id :nanoid(),
        value: dice.isHeld ? dice.value : Math.floor(Math.random() * (6) + 1),
      })))
      setTotRolls(prev=>prev+1)
    }
    else{
      setTotRolls(1)
      setDiceArray(allNewDice())
    }
  } 
  
  return (
    <main>
      {tenzies &&  <Confetti/>}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>      
      <div className="container">
        {diceElements}
      </div>
      <h2>Total rolls:{totRolls}</h2>
      <button className="button-roll" onClick={rollDice}>{tenzies? "New Game": "Roll Dice"}</button>
    </main>
  )
}
