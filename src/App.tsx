import React from 'react';
import { Line } from "react-chartjs-2";
import logo from './logo.svg';
import './App.css';
import { fetchData, Result } from './data'
import { ResultTable } from './Table'

const data = {
  labels: [],
  datasets: [
    {
      label: 'News sentiment',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: []
    }
  ]
}

interface GraphData {
  labels: string[],
  datasets: {label: string, data: number[]}[]
}

interface AppState {
  graphData: GraphData
  results: Result[]
  selectedResult: Result | null
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props)
    this.state = { graphData: data, results: [], selectedResult: null }
    this.selectDay = this.selectDay.bind(this)
  }

  async componentDidMount() {
    const results = await fetchData()
    console.log(results)
    const labels = results.map(result => result.date.toLocaleDateString())
    const data = results.map(result => result.sentiment.score)
    this.setState((prev) => {
      prev.graphData.labels = labels
      prev.graphData.datasets[0].data = data
      return { graphData: prev.graphData, results, selectedResult: results[0] }
    })
  }

  selectDay(element: any) {
    console.log(element)
  }

  render() {
    const { selectedResult } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Line data={data} getElementAtEvent={element => this.selectDay(element)} />
          { selectedResult && ResultTable(selectedResult) }
        </header>
      </div>
    )
  }
}

export default App;
