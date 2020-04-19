import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import './App.css'
import { fetchData, Result } from './data'
import { ResultTable } from './Table'
import { DatePicker } from './DatePicker'

import CircularProgress from '@material-ui/core/CircularProgress'

const dataSetProperties = {
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
}

interface GraphData {
    labels: string[]
    datasets: { label: string; data: number[] }[]
}

const App = () => {
    const [results, setResults] = useState(null as Result[] | null)
    const [selectedIndex, setSelectedIndex] = useState(null as number | null)
    const [graphData, setGraphData] = useState({ labels: [], datasets: [] } as GraphData)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const selectDate = (element: any) => {
        if (element.length === 0) {
            return
        }
        const index = element[0]._index
        setSelectedIndex(index)
    }

    useEffect(() => {
        ;(async () => {
            const results = await fetchData(selectedDate)
            const labels = results.map(result => result.date.toLocaleDateString())
            const data = results.map(result => result.sentiment.score)
            setResults(results)
            setGraphData({ labels, datasets: [{ ...dataSetProperties, data }] })
        })()
    }, [selectedDate])

    const selectedResult = results && selectedIndex !== null ? results[selectedIndex] : null
    return (
        <div className="App App-header">
            <header>Financial News</header>
            {results ? (
                <div className="graph">
                    <DatePicker selectedDate={selectedDate} updateDate={setSelectedDate} />
                    <Line data={graphData} getElementAtEvent={element => selectDate(element)} />
                </div>
            ) : (
                <CircularProgress className="loader" />
            )}
            <div className="table">
                <ResultTable result={selectedResult} />
            </div>
        </div>
    )
}

export default App
