import React, { useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import ReactMapGl, { Marker, Popup } from 'react-map-gl'
import * as parkData from './_data/skates.json'


import './App.css';
import { useState } from 'react';


function App() {

  useEffect(() => {
    // MJS init
    M.AutoInit();
  });

  useEffect(() => {

    const listner = e => {
      if(e.key === 'Escape'){
        setSelectedPark(null)
      }
    }

    window.addEventListener('keydown', listner)

    return () => {
      window.removeEventListener('keydown', listner)
    }

    // eslint-disable-next-line
  },[])

  const [viewPort, setViewPort] = useState({
    latitude: 45.4211,
    longitude: -75.6903,
    width: "100vw",
    height: "100vh",
    zoom: 10
  })

  const [selectedPark, setSelectedPark] = useState(null)

  return (
    <div className="App">
      <ReactMapGl {...viewPort} mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} 
      onViewportChange={viewPort => setViewPort(viewPort)}
      mapStyle='mapbox://styles/inblack1967/ck8omk5xm3q4j1ioda783oxwj'
      >
        { parkData.features.map(p => (
          <Marker key={p.properties.PARK_ID} 
          latitude={p.geometry.coordinates[1]}
          longitude={p.geometry.coordinates[0]}
          >
            <button className="btn blue pulse" onClick={ e => {
              e.preventDefault()
              setSelectedPark(p)
            } }>
              <i className="material-icons">ac_unit</i>
            </button>
          </Marker>
        )) }
        { selectedPark && <Popup latitude={selectedPark.geometry.coordinates[1]} longitude={selectedPark.geometry.coordinates[0]} onClose={() => setSelectedPark(null)}>
          <div className="container">
          <h5>{selectedPark.properties.NAME}</h5>
          <p>{selectedPark.properties.DESCRIPTIO}</p>
          </div>
        </Popup> }
        </ReactMapGl>
    </div>
  );
}

export default App;
