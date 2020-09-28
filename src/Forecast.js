import React from 'react';

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
        fetch(`https://community-open-weather-map.p.rapidapi.com/weather?lang=ru&units=metric&q=${uriEncodedCity}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
                "x-rapidapi-key": "926a7c02a3msha1dbb41886930d3p13535ejsn800e78e46440"
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
            <div className="container">
                <div className='search'>
                    <form onSubmit={this.getForecast}>
                        <input
                            type="text"
                            placeholder="Enter City"
                            maxLength="50"
                            value={this.state.city}
                            onChange={this.setCity}
                        />
                        <button type="submit">Get Forecast</button>
                    </form>
                </div>
                <div>
                    <div className='card'>
                        <div>Температура: {(this.state.data.main) ? this.state.data.main.temp : ''} °C</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Forecast;