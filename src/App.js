import logo from './logo.svg';
//import { useState } from 'react';
import React, {useState} from 'react'; 
import { supabase } from './supabaseClient';
import './App.css';


function radiationExample() {
  const [myRadiation, setRadiationExample] = useState([]);
  async function getRadiation() {
    let { data: radiation} = await supabase
     .from('radiation')
     .select('*')
    setRadiationExample(radiation);
  }
  getRadiation();
  
  return (
    <table className="radiation-example">
      {
        myRadiation.map(portion => (
          <tr>
            <td>{portion.month}</td>
            <td>{portion.peaksunlight}</td>
          </tr>
        ))
      }
    </table>
  )
}


function OrderButton() {
  const [count, setCount] = useState(0);
  function doMagic() {
    setCount(count + 1);
  }
  return (
    <div>
      <h3>Click here to place an order!</h3>
      <button onClick={doMagic}>Order {count}</button>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <radiationExample/>
        <OrderButton/>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Solar Calculator
        </a>
      </header>
    </div>
  );
}

export default App;
