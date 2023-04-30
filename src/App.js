import logo from './logo.svg';
//import { useState } from 'react';
import React, { useState } from 'react'; 
import { supabase } from './supabaseClient';
import axios from 'axios';
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

/*function AttemptFour() {
  const [weather, setWeather] = useState({})
  const [location, setLocation] = useState('')
  const url = 'https://developer.nrel.gov/api/solar/solar_resource/v1.json';

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setWeather(response.weather)
        console.log(response.weather)
      })
      setLocation('')
    }
  }

  return (
    < div className="solarDataApp">
      <div className="inputBox">
        <input 
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Please insert area code'
          type="text"/>
      </div>

    </div>

  )
}
/*


/*function locationForm() {
  const [location, setLocation] = useState('');
  const afterSubmit = (e) => {
    e.preventDefault();

  }
}

function Nrel(){
  const [location, setLocation] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const apiUrl = `https://developer.nrel.gov/api/solar/solar_resource/v1.json';


    axios.get(apiUrl, {
      params: {
        api_key: 'D8gR01Rx7RTEftnzzqfpIGWaPq27AeMyUHl184Qu',
        location: '${location}',
        fuel_type: 'ELEC',
        access: 'public'
      }
    })
       .then(response => {
       // Handle the API response
      })
      .catch(error => {
        console.error(error);
      // Handle any errors
      });

}; }
*/

/*
function NRELdata(){
  const [radiationData, setRadiationData] = useState(null); //ChatGPT was used to form "null" in this line ???
  const [location, setLocation] = useState('');
  const nrelApiKey = 'D8gR01Rx7RTEftnzzqfpIGWaPq27AeMyUHl184Qu';
  const nrelApiUrl = `https://developer.nrel.gov/api/solar/solar_resource/v1.json?api_key=${nrelApiKey}&zip=${location}`; //ChatGPT showed how to add location into this constant (via zip parameter) to incorporate user input from my form

  useEffect(() => {
    fetch(nrelApiUrl)
      .then(response => response.json())
      .then(data => setRadiationData(data))
      .catch(error => console.log(error));
  }, [nrelApiUrl]);

  // chatGPT was used for the following constant, using handleSubmit to update location based on user input
  const handleSubmit = (event) => {
    event.preventDefault();
    setLocation(event.target.location.value);  
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your Area Code:
          <input type="text" name="location"/>
        </label>
        <button type="submit">Submit for Weather Results</button>
      </form>

      {radiationData ? (
        <div>
          <h2>Solar Radiation</h2>
          <p>Latitiude: {radiationData.inputs.latitude}</p>
          <p>Longitutde: {radiationData.inputs.longitude}</p>
          <p>Average Solar Radiation per Day: {radiationData.outputs.avg_dni.annual} kWh/m²/day</p>
        </div>
      ) : (
        <p>Loading radiation data...</p>
      )}
    </div>
  );
} */

// FINAL ATTEMPT WEATHER DASHBOARD

/*
function WeatherDashboard() {
  // function to get area code data
  function MyForm() {
    const [areaCode, setAreaCode] = useState('');
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // handle form submission here
    };
    return (
      <form>
        <label>Area Code:</label>
        <input type="text" value={areaCode} onChange={(e) => setAreaCode(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    );
  }
  // start of weather dashboard 
  const [weatherData, setWeatherData] = useState(null); //this must say null, empty array doesn't work
  const apiKey = 'D8gR01Rx7RTEftnzzqfpIGWaPq27AeMyUHl184Qu';
  const apiUrl = `https://developer.nrel.gov/api/solar/solar_resource/v1.json?api_key=${apiKey}&lat=40&lon=-105`;

  useEffect(() => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setWeatherData(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      {weatherData ? (
        <div>
          <h2>Solar Radiation Data</h2>
          <p>Latitude: {weatherData.inputs.latitude}</p>
          <p>Longitude: {weatherData.inputs.longitude}</p>
          <p>Solar Radiation: {weatherData.outputs.avg_dni.annual} kWh/m²/day</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
}
*/

/*
const SolarRadiationDashboard = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [monthlyAverages, setMonthlyAverages] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.get(
      'https://developer.nrel.gov/api/solar/solar_resource/v1.json',
      {
        params: {
          api_key: 'D8gR01Rx7RTEftnzzqfpIGWaPq27AeMyUHl184Qu',
          lat: latitude,
          lon: longitude,
        },
      }
    );
    const monthlyData = response.data.results.reduce((acc, hourlyData) => {
      const month = new Date(hourlyData.date_time).getMonth();
      if (!acc[month]) {
        acc[month] = {
          total: 0,
          count: 0,
        };
      }
      acc[month].total += hourlyData['ghi'];
      acc[month].count += 1;
      return acc;
    }, {});
    const monthlyAverages = Object.keys(monthlyData).map((month) => ({
      month: new Date(0, month).toLocaleString('default', { month: 'long' }),
      average: monthlyData[month].total / monthlyData[month].count,
    }));
    setMonthlyAverages(monthlyAverages);
  };

  return (
    <div>
      <h1>Solar Radiation Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Latitude:
          <input
            type="number"
            step="0.0001"
            value={latitude}
            onChange={(event) => setLatitude(event.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Longitude:
          <input
            type="number"
            step="0.0001"
            value={longitude}
            onChange={(event) => setLongitude(event.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      {monthlyAverages.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>Average Solar Radiation (kWh/m^2/day)</th>
            </tr>
          </thead>
          <tbody>
            {monthlyAverages.map(({ month, average }) => (
              <tr key={month}>
                <td>{month}</td>
                <td>{average.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
*/


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
        <OrderButton />
        <SolarRadiationDashboard />
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
