import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './components/marker';
import Flat from './components/flat';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      flats: [],
      allFlats: [],
      selectedFlat: null,
      search: ""
    };
  }

  componentDidMount() {
    fetch("https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/flats.json")
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      this.setState({
        flats: data
      })
    })
  }

  selectFlat = (flat) => {
    this.setState({
      selectedFlat: flat
    });
  }

  handleSearch = (event) => {
    this.setState({
      search: event.target.value,
      flats: this.state.allFlats.filter((flat) => new RegExp(event.target.value, "i").exec(flat.name))
    })
  }

  
  render() {

    let center = {
      lat: 48.8566, lng: 2.3522
    };

    if (this.state.selectedFlat) {
      center = { lat: this.state.selectedFlat.lat, lng: this.state.selectedFlat.lng }
    }

  return (
    <div className="app">
      <div className="main">
        <div className="search">
          <input type="text" placeholder="Search..." value={this.state.search}
            onChange={this.handleSearch} />
        </div>
        <div className="flats">
          {this.state.flats.map((flat) => {
            return <Flat flat={flat} 
            selectFlat={this.selectFlat} />
          })}
        </div>
      </div>
      <div className="map">
        <GoogleMapReact
          center={center}
          zoom={11}>

          {this.state.flats.map((flat) => {
            return <Marker {...flat} selected={flat === this.state.selectedFlat} />
          })}

        </GoogleMapReact>
      </div>
    </div>
  );
        }
}

export default App;
