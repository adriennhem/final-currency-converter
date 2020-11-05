import React from 'react';
import { checkStatus, json } from './utils.js';

class ExchangeRates extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            baseCurrency: 'USD',
            rates: [],
            error: ''
        };

        this.handleChange = this.handleChange.bind(this);
        
    }

    componentDidMount() {
        fetch(`https://alt-exchange-rate.herokuapp.com/latest?base=${this.state.baseCurrency}`)
            .then(checkStatus)
            .then(json)
            .then((data) => {
                this.setState({ rates: data.rates, error: '' });
                console.log(data.rates);
            })
            .catch(function(err) {
                this.setState({ error: err.message})
                console.log(err);
            });
    }

    handleChange() {
        // do nothing for now
    }

    render() {
        const { baseCurrency, rates, error } = this.state;

        return (
            <div>
            <h2>Exchange Rates</h2>
            <select name="baseCurrency" id="baseCurrency">
                {(() => {
                    if (error) {
                        return error;
                    }
                    const currenciesList = Object.keys(rates).map(function(key) {
                        if (baseCurrency === key) {
                            return <option key={key} value={key} selected='selected'>{key}</option>
                        }

                        return <option key={key} value={key}>{key}</option>
                    })
                    return currenciesList;
                })()}
            </select>
            
                {(() => {
                if (error) {
                    return error;
                }
                
                const myRates = Object.keys(rates).map(function(key) {
                    return <p key={key}>{key }{rates[key]}</p>
                });

                return myRates;
                })()}
            </div>
        )
    }
    
}

export default ExchangeRates;