import React from 'react';
import './Forecast.css';

class Forecast extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            city: ''
        }
        this.setCity = this.setCity.bind(this);
        this.getForecast = this.getForecast.bind(this);
    }

    setCity(e) {
        this.setState({city: e.target.value})
    }

    getForecast(e) {
        e.preventDefault();
        const uriEncodedCity = encodeURIComponent(this.state.city);
        fetch(`https://community-open-weather-map.p.rapidapi.com/forecast?lang=ru&units=metric&q=${uriEncodedCity}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
                "x-rapidapi-key": process.env.REACT_APP_API_KEY
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    data: data
                })
                console.log(this.state.data)
            })
    }

    componentDidMount() {
        this.setState({data: this.state.data})
    }

    render() {
        return (
            <div className="forecast">
                <div className='search'>
                    <form onSubmit={this.getForecast}>
                        <input
                            type="text"
                            placeholder="Город"
                            maxLength="50"
                            value={this.state.city}
                            onChange={this.setCity}
                        />
                        <button className='submit' type="submit">Получить прогноз погоды</button>
                    </form>
                </div>
                <div className='days'>
                    <div className='today'>
                        <div className='card'>
                            <div>Температура: {(this.state.data.list) ? this.state.data.list[0].main.temp : ''} °C</div>
                            <div>Влажность: {(this.state.data.list) ? this.state.data.list[0].main.humidity : ''} %</div>
                            <div>Давление: {(this.state.data.list) ? this.state.data.list[0].main.pressure : ''} мм
                                рт.ст.
                            </div>
                            <div>{(this.state.data.list) ? this.state.data.list[0].weather[0].description : ''}</div>
                            <div>Ветер: {(this.state.data.list) ? this.state.data.list[0].wind.speed : ''} м/с</div>
                        </div>
                        <div id='city'>Сегодня</div>
                    </div>
                    <div className='tomorrow'>
                        <div className='card'>
                            <div>Температура: {(this.state.data.list) ? this.state.data.list[8].main.temp : ''} °C</div>
                            <div>Влажность: {(this.state.data.list) ? this.state.data.list[8].main.humidity : ''} %</div>
                            <div>Давление: {(this.state.data.list) ? this.state.data.list[8].main.pressure : ''} мм
                                рт.ст.
                            </div>
                            <div>{(this.state.data.list) ? this.state.data.list[8].weather[0].description : ''}</div>
                            <div>Ветер: {(this.state.data.list) ? this.state.data.list[8].wind.speed : ''} м/с</div>
                        </div>
                        <div id='city'>Завтра</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Forecast;