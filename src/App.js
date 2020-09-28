import React from 'react';
import './App.css';
import Forecast from './Forecast';

class App extends React.Component {

    render() {
        return (
            <div className="container">
                <header></header>
                <main>
                <h1>Погода</h1>
                    <Forecast />
                </main>
                <footer></footer>
            </div>
        );
    }
}

export default App;
