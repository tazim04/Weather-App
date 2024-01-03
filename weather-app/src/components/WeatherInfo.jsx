import { useState, useEffect } from "react";
import axios from "axios";
import ForecastIcon from "./ForecastIcon";
import SearchBar from "./SearchBar.jsx";
import "./styles/WeatherInfo.css";
import { toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const openWeather_api_key = import.meta.env.VITE_REACT_APP_OPENWEATHER_API_KEY;
const ipstack_api_key = import.meta.env.VITE_REACT_APP_IPSTACK_API_KEY;

function WeatherInfo({ setSunsetTime, setMyLocation }) {

  const [city, setCity] = useState(null);
  const [ip, setIp] = useState("");
  const [temp, setTemp] = useState(null);
  const [feelsLike, setFeelsLike] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [description, setDescription] = useState(null);
  const [isMyLocation, setIsMyLocation] = useState(true);

  const invalidLocation_popup = (input) => toast.error('Invalid location given!\n'+input, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Flip,
    });;
  

  useEffect(() => {
    getMyLocation();
  }, [ip]);

  function capitalizeWords(string) {
    // since API call gives description in all lowercase, this method will capitilize the first letter of every word
    return string.replace(/\b\w/g, function (match) {
      return match.toUpperCase();
    });
  }

  const getIP = async () => {
    const response = await axios.get("https://api.ipify.org");
    console.log("axios response: ", response);
    setIp(response.data);
  };

  const getMyLocation = () => {
    setIsMyLocation(true);

    getIP();

    const url_weather =
      `http://api.openweathermap.org/data/2.5/forecast?lat=45.421532&lon=-75.697189&appid=${openWeather_api_key}&units=metric`;
    const url_geocode = `http://api.ipstack.com/${ip}?access_key=${ipstack_api_key}`;

    fetch(url_geocode)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        console.log("City from geocode api: " + data.city);
        setCity(data.city);
        setMyLocation(data.city);

      });

    fetch(url_weather)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let tempature = data.list[0].main.temp;
        let feelsLike = data.list[0].main.feels_like;
        let forecast = data.list[0];
        let description = data.list[0].weather[0].description;

        let sunsetTimestamp = data.city.sunset;
        let sunsetDate = new Date(sunsetTimestamp * 1000);
        let sunsetHours = sunsetDate.getHours();

        let timeZone = (data.city.timezone) / 3600;
        console.log("timeZone: " + timeZone);

        setTemp(tempature);
        setFeelsLike(feelsLike);
        setForecast(forecast);
        setDescription(capitalizeWords(description));
        setSunsetTime(sunsetHours);
        setTimeZone(timeZone);

        console.log(data);
      });
  };

  const setNewCity = async (location) => {
    let lat;
    let lon;

    if (location == "") {
      getMyLocation();
    }


    console.log("setNewCity: " + location);

    const url_weather = `http://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${openWeather_api_key}&units=metric`;
    fetch(url_weather)
      .then((response) => {
        return response.json();
      })
      .then((data) => {

        console.log(data);

        if (data.message == "city not found") {
          console.log("Invalid location!");
          invalidLocation_popup(location);

        } else {
          let tempature = data?.list[0].main.temp;
          let feelsLike = data?.list[0].main.feels_like;
          let forecast = data?.list[0];
          let description = data?.list[0].weather[0].description;
  
          let sunsetTimestamp = data.city.sunset;
          let sunsetDate = new Date(sunsetTimestamp * 1000);
          let sunsetHours = sunsetDate.getHours();

          let timeZone = (data.city.timezone) / 3600;
          console.log("timeZone: " + timeZone);
  
          setTemp(tempature);
          setFeelsLike(feelsLike);
          setForecast(forecast);
          setDescription(capitalizeWords(description));
          setSunsetTime(sunsetHours);
          setTimeZone(timeZone);
  
          // console.log("Temp: " + tempature);
          // console.log("Description: " + description);
  
          console.log(data);
          setCity(capitalizeWords(location));
          setIsMyLocation(false);
        }
      });
  };


  console.log("Entered Location: " + city);

  return (
    <div>
      <SearchBar setCity={setCity} setNewCity={setNewCity}/>
      <ForecastIcon forecast={forecast} />
      {city != null ? <h2>{city}</h2> : "Loading..."}

      {!isMyLocation ? <button type="button" className="btn btn-primary yourLocationButton" style={{color: 'white'}} onClick={getMyLocation}>Your Location Weather</button> : ""}

      {isMyLocation ? <p>Your Location</p> : ""}

      
      {temp != null ? (
        <h1 className="tempature">{Math.round(temp)}°C</h1>
      ) : (
        "Loading..."
      )}
      {feelsLike != null ? (
        <p className="feelsLike">Feels Like {Math.round(feelsLike)}°C</p>
      ) : (
        "Loading..."
      )}
      {description != null ? <p>{description}</p> : "Loading.."}
    </div>
  );
}

export default WeatherInfo;
