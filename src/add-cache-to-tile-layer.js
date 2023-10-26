import L from "leaflet"
import 'tilelayer-canvas'
import { LRUCache } from 'lru-cache'


export function addCacheToTileLayer(layer, {size}){
    //const _removeTile = layer._removeTile.bind(layer)

    window.layer = layer
    
    const tileKeysToSave = new Map()

    const createTile = layer.createTile.bind(layer)
    
    const onDispose = (value ,key) => {
        if (tileKeysToSave.has(key)){
            tileKeysToSave.delete(key)
            return
        }
    }
    
    const cache = new LRUCache({
        max: 50,
        dispose: onDispose,
        updateAgeOnHas: true,
        ttl: 3000000000
    })

    layer.createTile = function(point, fn){
        const key = `${point.x}:${point.y}:${point.z}`

        if (cache.has(key)){
          const tile = cache.get(key)
          cache.delete(key)
          console.log('cache hit',key)
          tile.el.src = tile.el.src.split("?")[0] + "?" + new Date().getTime()
          return tile.el
        }
        const newTile =  createTile(point, fn)
        return newTile
    } 
      
    layer._removeTile = function(key) {
        const  tile = this._tiles[key];
        if (!tile) { return; }

        cache.set(key, tile)
        console.log(key, this._tiles[key].retain, layer._map._zoom)
        
        const mapZoomLevel = layer._map._zoom
        const tileZoomLevel = tile.coords.z 

        // remove 
        if (!tile.retain && (tileZoomLevel === mapZoomLevel || Math.abs(mapZoomLevel - tileZoomLevel)> 3)){
            L.GridLayer.prototype._removeTile.call(layer, key)
        }
    }

    window.cache = cache

    return layer
}