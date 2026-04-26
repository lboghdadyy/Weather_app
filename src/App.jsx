import { use, useState } from 'react'
import { useEffect } from 'react';
import './App.css'
import { WiDaySunny } from 'react-icons/wi';
// import { WiCloudyGusts } from "react-icons/wi";
import { LuWind } from 'react-icons/lu';
import { FiMoon } from 'react-icons/fi';
import { CiTempHigh } from 'react-icons/ci';


// import { CitySelect, CountrySelect} from "react-country-state-city";
// import "react-country-state-city/dist/react-country-state-city.css";

export default function App() {
  const [currentCity, setCurrentCity] = useState('FQUIH BEN SALAH');
  const [country, setcountry] = useState('MOROCCO');
  const [timeindex, setTimeindex] = useState(0);
  const [data, setdata] = useState();
  const lwaqt = new Date();
  let hour = lwaqt.getHours();
  const [Minutes, setminutes] = useState(lwaqt.getMinutes());
  let day = lwaqt.getDay();

  useEffect(() => {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=32.3388&longitude=-6.353&hourly=temperature_2m,wind_speed_10m,cloudcover")
  .then((res) => res.json()).then((b) => setdata(b))
  }, [currentCity]);
  if (!data)
    {
      return (
        <>
          <div className="loadingpage">
            tsna t7wa ...
          </div>
        </>
    )
  }
  else
  {
    console.log(data);
      const l  = data.hourly.time;
      let index = 0;
      for (index = 0; index < l.length; index++)
      {
        const obj = new Date(l[index]);
        if (day == obj.getDay())
        {
          if (hour == obj.getHours())
            break ;
        }
      }
      console.log(data);
      const object = new Date(l[index]);
      let cpm;
      hour > 7 && hour < 19 ? cpm = "day" : cpm = "night";
      let background_class;
      cpm == "day" ? background_class = "Day" : background_class = "Night";
      let icon;
      cpm == "day" ? icon =   <WiDaySunny size={60} />: icon = <FiMoon size={60}/>;
      return (
      <>
        <div className="the-actual-app">
          <div className={background_class}>
            <div className="topDiv">

            </div>
            <div className="temperature">
               {icon}{cpm.toLocaleUpperCase()}<br />
              {data.hourly.temperature_2m[index]} °C<br></br>
              {lwaqt.getHours()}:{lwaqt.getMinutes()} 
            </div>
          </div>
          <div className="sidediv">
            <div className="title side">
              <span>
                WeatherApp
              </span>
              <br />
              <span id="credit">
                made by 
                <a href="https://github.com/lboghdadyy">
                  Lboghdady
                </a>
              </span>
            </div>
            <div className="tempertature">
              <div className="ti-div">
                        <div className="ti">
                          Min Temp
                        </div>
                        <div className="t">
                          {data.hourly.temperature_2m[index] + 32 } °F
                        </div>
              </div>
              <div className="ti-div">
                        <div className="ti">
                          Max Temp
                        </div>

                        <div className="t">
                          100
                        </div>

              </div>

              <div className="ti-div">
                    <div className="ti">
                      feel like
                    </div>
                    <div className="t">
                      10
                    </div>


              </div>
            </div>
            <div className="side side1">
              <h2>WIND</h2>
              <div className="wind-speed">
                <div className="icon-side1">
                  <LuWind size={25 } color='white'/>
                </div>
                <div id="speed">
                    {data.hourly.wind_speed_10m[index]} mph
                </div>
              </div>
              <div className="second-stats">
                <div className="icon-temp">
                  <CiTempHigh size={25 } color='white'/>
                    {data.hourly.wind_speed_10m[index]} mph
                </div>
                <div id="speed">
                </div>
                <div id="clouds">
                    {data.hourly.cloudcover[index]}%
                </div>
              </div>
            </div>
            <div className="side side2"></div>
            <div className="side side3"></div>
          </div>
        </div>
      </>
    )
  }
}

