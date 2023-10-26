import logo from './logo.svg';
import './App.css';
import L from "leaflet"
import 'tilelayer-canvas'
import { useRef } from 'react';
import { useEffect } from 'react';
import { LRUCache } from 'lru-cache'
import {addCacheToTileLayer} from './add-cache-to-tile-layer'


let map;
let tile;

let cache2;

const cache = new Map()
function App() {
const mapRef = useRef()
useEffect(() => {
  if (!map){
    map = L.map('map').setView([51.505, -0.09], 13);
    tile = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
  
  tile = addCacheToTileLayer(tile, {size: 500})
  //const createTile = tile.createTile.bind(tile)
  //const _removeTile = tile._removeTile.bind(tile)



  // const notToRemove = new Map()
  // window.notToRemove = notToRemove
  // cache2 = new LRUCache({
  //   max: 100,
  //   dispose: (value,key) => {
  //     //_removeTile(key)
  //     if (notToRemove.has(key)){
  //       notToRemove.delete(key)
  //       console.log('dispose', key, tile._map._zoom)
  //       return
  //     }
  //     console.log(key, tile._map._zoom)
  //     if (key.split(':')[2] === tile._map._zoom){
  //       return
  //     }
  //     console.log(tile.map._z)
  //     tile._map.once("zoomend", () => L.GridLayer.prototype._removeTile.call(tile, key))
  //     L.GridLayer.prototype._removeTile.call(tile, key)
  //   },
  //   updateAgeOnHas: true,
  //   ttl: 3000000000
  // })

  // window.cache2 = cache2

  // tile.createTile = function(point, fn){
    
  //   const key = `${point.x}:${point.y}:${point.z}`
  //   if (cache2.has(key)){
  //     const tile = cache2.get(key)
  //     notToRemove.set(key, key)
  //     cache2.delete(key)
  //     console.log('cache hit',key)
  //     return tile
  //   }
  //   const newTile =  createTile(point, fn)
  //   return newTile
  // } 
  //   window.map = map
  //   window.tile = tile
  
  // tile._removeTile = function(key) {
  //   const  tile = this._tiles[key];
	// 	if (!tile) { return; }
  //   cache2.set(key, tile)

  //   // Cancels any pending http requests associated with the tile
	// 	//tile.el.setAttribute('src', L.Util.emptyImageUrl);
  //   //_removeTile(...args)
  // }
}
 }, [])
  return (
    <div className="App">
      <div id='map' ref={mapRef}></div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
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
  );
}

export default App;
