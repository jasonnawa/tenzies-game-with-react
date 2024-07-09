import React from "react";
import "./index.css"
import Die from "./components/Die";
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {

  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
}
  
  function allNewDice(){
    const randomArray = []
    for (let i=0; i<10 ; i++){
       randomArray.push(generateNewDie())
    }
    return randomArray
  }

  const [dice, setDice] = React.useState(allNewDice())
  function rollDice() {
    setDice(oldDice => oldDice.map(die => die.isHeld === true? die: generateNewDie()
    ))
    
}
 
      
  function holdDice(id){
  
    setDice( oldDice => oldDice.map(die=>{
      return die.id === id?{...die, isHeld : !die.isHeld}:die
    }))
  

}


const [tenzies, setTenzies] = React.useState(false)
React.useEffect(() => {
  const allHeld = dice.every(die => die.isHeld)
  const firstValue = dice[0].value
  const allSameValue = dice.every(die => die.value === firstValue)
  if (allHeld && allSameValue) {
      setTenzies(true)
  }
}, [dice])


  function newGame(){
    setDice(oldDice => oldDice.map(die =>  generateNewDie()))
    setTenzies(false)
  }
  const diceElements = dice.map(die=> <Die key = {die.id} value = {die.value} isHeld = {die.isHeld} id= {die.id} holdDice = {() => holdDice(die.id)} /> )

    


  return (
    
    <main>
      {tenzies && <Confetti />}
  <h1>Tenzies</h1>
  <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls. </p>
    <div className="dieContainer">
    {diceElements}
    
    </div>
    <button className="reRollButton" onClick = { tenzies? newGame : rollDice }>{tenzies? "New Game" : "Roll"}</button>
    </main>
    

  );
}

export default App;
