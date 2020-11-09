import React from "react";
import { checkStatus, json } from './utils.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fromCurrency: 'USD',
            toCurrency: 'EUR',
            baseRate: 1,
            convertedRate: null,
            rates: [],
            error: '', 
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
        this.handleSwap = this.handleSwap.bind(this);
    }

    fetchCurrency() {
        fetch(`https://alt-exchange-rate.herokuapp.com/latest?base=${this.state.fromCurrency}`)
            .then(checkStatus)
            .then(json)
            .then((data) => {
                this.setState({ rates: data.rates, error: '' });
            })
            .catch((err) => {
                this.setState({ error: err.message})
                console.log(err);
            });
    }

    componentDidMount() {
        this.fetchCurrency();
    }

    handleChange(e) {
            const toRate = this.state.rates[this.state.toCurrency];
            const newValue = e.target.value * toRate;
            this.setState({ convertedRate: Number(newValue), baseRate: Number(e.target.value) })  
    }

    handleCurrencyChange(e) {
        if (e.target.id === 'fromCurrency') {
            this.setState({ fromCurrency: e.target.value }, this.fetchCurrency)
            const toRate = this.state.rates[this.state.toCurrency];
            const newValue = e.target.value * toRate;
            this.setState({ convertedRate: Number(newValue) })
        }

        if (e.target.id === 'toCurrency') {
            this.setState({ toCurrency: Number(e.target.value) })
        }
    }

    handleSwap() {
        this.setState({ fromCurrency: this.state.toCurrency, toCurrency: this.state.fromCurrency }, this.fetchCurrency)

        setTimeout(() => console.log(this.state), 500)

    }

    render() {
        const { fromCurrency, toCurrency, rates, error, convertedRate, baseRate } = this.state;

        return (
            <div className="container pt-5">
            <h2 className="mb-4">Convert</h2>

            <div className="convert">

            <div className="form-group">
                <select name="fromCurrency" id="fromCurrency" value={fromCurrency} onChange={event => this.handleCurrencyChange(event)}  className="form-control">
                    {(() => {
                        if (error) {
                            return error;
                        }
                        const currenciesList = Object.keys(rates).map(function(key) {
                            return <option key={key} value={key}>{key}</option>
                        })
                        return currenciesList;
                    })()}
                </select>
                <input type="text" value={baseRate} id="baseRate" onChange={(e) => {this.handleChange(e)}} className="form-control"/>
            </div>

            <button onClick={(e) => this.handleSwap(e)}>
                <FontAwesomeIcon icon={faExchangeAlt} /> 
            </button>

            <div className="form-group mt-3">
                <select name="toCurrency" id="toCurrency" value={toCurrency} onChange={event => this.handleCurrencyChange(event)} className="form-control">
                    {(() => {
                        if (error) {
                            return error;
                        }
                        const currenciesList = Object.keys(rates).map(function(key) {
                            return <option key={key} value={key}>{key}</option>
                        })
                        return currenciesList;
                    })()}
                </select>
                <input type="text" id="convertedRate" value={convertedRate !== null ? convertedRate : rates[toCurrency] } disabled="disabled"  className="form-control"/>
            </div>

            </div>

            </div>
        )
    }
}

export default Home;