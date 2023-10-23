import WeatherForm from "../components/WeatherForm";

const WeatherContainer = ({weather, selectCity, selectDays}) => {


    let localTime = weather.location.localtime   

    let localTimeEpoch = weather.location.localtime_epoch   

    let cityName = weather.location.name  

    let cityTemperature = weather.current.temp_c  

    let cityTemperatureDaily = []

    cityTemperatureDaily = weather.forecast.forecastday.map((day) => (
        <div key={day.date}>
            {day.hour
                .filter((time) => time.time_epoch >= localTimeEpoch - 3600)
                .map((time) => {
                    const dateTime = new Date(time.time);

                    const formattedDate = dateTime.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

                    const formattedTime = dateTime.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: true })
                    
                    const dateFirstLetterUpperCase = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)

                    return (
                    <div key={time.time_epoch}>
                        Day: {dateFirstLetterUpperCase} <br/>
                        Time: {formattedTime} <br/>
                        Temp: {time.temp_c} °C
                    </div>
                    )
                })
            }  
        </div>
    ));

    return (  
        <>
            <WeatherForm selectCity={selectCity} selectDays={selectDays}/>
            <p>City: {cityName}</p>
            <p>Local time: {localTime}</p>
            <p>Current temperature: {cityTemperature} celcius</p>
            <div>{cityTemperatureDaily}</div>
        </>
    );
}

export default WeatherContainer;