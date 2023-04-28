import logo from './logo.svg';
//import { useState } from 'react';
import React, {useState} from 'react'; 
import { supabase } from './supabaseClient';
import './App.css';


function RadiationExample() {
  const [myRadiation, setMyRadiation] = useState([]);
  async function getRadiation() {
    let { data: radiation} = await supabase
     .from('radiation')
     .select('*')
    setMyRadiation(radiation);
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

function UserInput(){
  const [username, setName] = useState('');
  const [location, setLocation] = useState('');


const submissionForm = (e) => {
  e.preventDefault();
}

return (
  <form onSubmit = {submissionForm}>
    <label>Name: </label>
    <input type="text" value={username} onChange={(e) => setName(e.target.value)} />
    <label>Area Code: </label>
    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />

    <button type="submit">Submit for Weather Results</button>
  </form>
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
        <RadiationExample />
        <p><UserInput /></p>
        <OrderButton />
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
