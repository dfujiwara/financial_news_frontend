import React from 'react';
import logo from './logo.svg';
import './App.css';

const url = "https://us-central1-df-side-projects.cloudfunctions.net/news-rss-http"

class App extends React.Component<{}> {
  async componentDidMount() {
    try {
      const response = await fetch(url)
      console.log(response)
    } catch(e) {
      console.log(`error happened: ${e}`)
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
            Hello world! YYOY!!!
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    )
  }
}

export default App;
