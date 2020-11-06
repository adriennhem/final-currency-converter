import React from 'react';
import { checkStatus, json } from './utils.js';
import CurrencyFlag from 'react-currency-flags';
import ClipLoader from "react-spinners/ClipLoader";

class ExchangeRates extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            baseCurrency: 'USD',
            rates: [],
            error: '',
            loading: true
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        
    }


    fetchCurrency() {
        fetch(`https://alt-exchange-rate.herokuapp.com/latest?base=${this.state.baseCurrency}`)
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
            setTimeout(() => {
                this.setState({ loading: false });
            }, 300) 
            
    }

    handleChange(e) {
        this.setState({ baseCurrency: e }, this.fetchCurrency);
    }

    handleClick(currency) {
        this.setState({ baseCurrency: currency }, this.fetchCurrency);
    }

    render() {
        const { baseCurrency, rates, error, loading } = this.state;

        return (
            <div className="container pt-5">
                <h2 className="mb-3">Foreign exchange rates</h2>
                {loading ?  
                    <>
                    <ClipLoader
                        size={50}
                        color={"#123abc"}
                        loading={loading}
                        /> 

                    </>
                    :  
                    <>
                    <label htmlFor="baseCurrency" className="mr-2">You are viewing rates for</label>
                    <select name="baseCurrency" id="baseCurrency" value={baseCurrency} onChange={event => this.handleChange(event.target.value)}>
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
        
                    <table className="table table-bordered mt-5">
                        <thead>
                            <tr>
                            <th scope="col">Currency</th>
                            <th scope="col">Latest Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(() => {
                            if (error) {
                                return error;   
                            }
                            
                            const latestRates = Object.keys(rates).map((key) => {
                                if (baseCurrency !== key) {
                                    return (
                                        <tr key={key}>
                                            <th scope="row">
                                                    <CurrencyFlag className="mr-3" currency={key} width={25} />
                                                    <button onClick={() => {this.handleClick(key)}}>{key}</button>
                                            </th>
                                            <td>{rates[key]}</td>
                                        </tr>
                                    )
                                }
                            });
        
                            return latestRates;
                            })()}
                        </tbody>
                    </table> 
                    </>
                }
            </div>
        )
    }
}

export default ExchangeRates;