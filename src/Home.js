import React from "react";
import { checkStatus, json } from './utils.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons'
import Chart from 'chart.js';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fromCurrency: 'USD',
            toCurrency: 'EUR',
            baseRate: 1,
            convertedRate: '',
            rates: [],
            error: '', 
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
        this.handleSwap = this.handleSwap.bind(this);

        this.chartRef = React.createRef();
    }

    getHistoricalRates = (base, quote) => {
        const endDate = new Date().toISOString().split('T')[0];
        const startDate = new Date((new Date).getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
        fetch(`https://alt-exchange-rate.herokuapp.com/history?start_at=${startDate}&end_at=${endDate}&base=${base}&symbols=${quote}`)
          .then(checkStatus)
          .then(json)
          .then(data => {
            if (data.error) {
              throw new Error(data.error);
            }
            const chartLabels = Object.keys(data.rates);
            const chartData = Object.values(data.rates).map(rate => rate[quote]);
            const chartLabel = `${base}/${quote}`;
            this.buildChart(chartLabels, chartData, chartLabel);
          })
          .catch(error => console.error(error.message));
      }
      buildChart = (labels, data, label) => {
        const chartRef = this.chartRef.current.getContext("2d");
        if (typeof this.chart !== "undefined") {
          this.chart.destroy();
        }
        this.chart = new Chart(this.chartRef.current.getContext("2d"), {
          type: 'line',
          data: {
            labels,
            datasets: [
              {
                label: label,
                data,
                fill: false,
                tension: 0,
              }
            ]
          },
          options: {
            responsive: true,
          }
        })
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
        const { fromCurrency, toCurrency } = this.state;
        this.getHistoricalRates(fromCurrency, toCurrency);
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
            this.getHistoricalRates(e.target.value, this.state.toCurrency);
        }

        if (e.target.id === 'toCurrency') {
            this.setState({ toCurrency: e.target.value })
            this.getHistoricalRates(this.state.fromCurrency, e.target.value);
        }
    }

    handleSwap() {
        this.setState({ fromCurrency: this.state.toCurrency, toCurrency: this.state.fromCurrency }, this.fetchCurrency)
        this.getHistoricalRates(this.state.toCurrency, this.state.fromCurrency);


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
                <input type="text" id="convertedRate" defaultValue={convertedRate || rates[toCurrency]} disabled="disabled"  className="form-control"/>
            </div>

            </div>

            <canvas ref={this.chartRef}/>

            </div>
        )
    }
}

export default Home;