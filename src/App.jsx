import { useEffect, useRef } from 'react'

export default function App() {
  const mapContainer = useRef(null)

  useEffect(() => {
    const maplibregl = window.maplibregl
    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://tiles.openfreemap.org/styles/liberty',
      center: [44.8271, 41.7151], // [longitude, latitude]
      zoom: 12,
    })

    map.on('click', (e) => {
      const name = prompt('Name this place:')
      if (!name) return
      new maplibregl.Marker()
        .setLngLat(e.lngLat)
        .setPopup(new maplibregl.Popup().setText(name))
        .addTo(map)
        .togglePopup()
    })

    return () => map.remove()
  }, [])

  return <div ref={mapContainer} style={{ width: '100vw', height: '100vh' }} />
}