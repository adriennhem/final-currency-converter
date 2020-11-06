import React from 'react';
import { checkStatus, json } from './utils.js';
import CurrencyFlag from 'react-currency-flags';
import { css } from "@emotion/core";
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
        
    }


    fetchCurrency() {
        console.log(this.state.baseCurrency);
        fetch(`https://alt-exchange-rate.herokuapp.com/latest?base=${this.state.baseCurrency}`)
            .then(checkStatus)
            .then(json)
            .then((data) => {
                this.setState({ rates: data.rates, error: '' });
            })
            .catch(function(err) {
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
        console.log(e);
        this.setState({ baseCurrency: e }, this.fetchCurrency);
    }

    render() {
        const { baseCurrency, rates, error, loading } = this.state;

        return (
            <div className="container pt-5">
                <h2 className="mb-5">Foreign exchange rates</h2>
                {loading ?  
                    <>
                    <ClipLoader
                        size={50}
                        color={"#123abc"}
                        loading={this.state.loading}
                        /> 

                    </>
                    :  
                    <>
                    <label htmlFor="baseCurrency" className="mr-2">Select a currency</label>
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
                            
                            const latestRates = Object.keys(rates).map(function(key) {
                                if (baseCurrency !== key) {
                                    return (
                                        <tr key={key}>
                                            <th scope="row">
                                                    <CurrencyFlag className="mr-3" currency={key} width={25} />
                                                {key}
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