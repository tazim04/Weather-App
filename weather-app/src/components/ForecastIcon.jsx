import rainyImg from '../assets/rainy.png'
import cloudyImg from '../assets/cloudy.png'
import snowyImg from '../assets/snowy.png'
import stormImg from '../assets/storm.png'
import sunnyImg from '../assets/sunny.png'
import atmosphereImg from '../assets/atmosphere.png'

function ForecastIcon({forecast}) {

    

    if (!forecast) {
        return null;
    }
    
    let main = forecast.weather[0].main;
    console.log("Main forecast: ", main);

    let img;

    switch (main) {
        case 'Thunderstorm':
            img = stormImg;
            break;
        case 'Drizzle':
            img = rainyImg;
            break;
        case 'Rain':
            img = rainyImg;
            break;
        case 'Snow':
            img = snowyImg;
            break;
        case 'Atmosphere':
            img = atmosphereImg;
            break;
        case 'Clear':
            img = sunnyImg;
            break;
        case 'Clouds':
            img = cloudyImg;
            break;
        default:
            break;
    }


    return (
      <div>
        {<img src={img} alt='Rainy' style={{width: '80px'}}></img>}
        
      </div>
    )

}

export default ForecastIcon;
