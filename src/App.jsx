import { useEffect, useRef, useState } from 'react'

const ICONS = [
  { id: 'home', emoji: '🏠', label: 'Home' },
  { id: 'home-mom', emoji: '🏡', label: "Mom's home" },
  { id: 'home-dad', emoji: '🏘️', label: "Dad's home" },
  { id: 'grandma', emoji: '👵', label: 'Grandma' },
  { id: 'grandpa', emoji: '👴', label: 'Grandpa' },
  { id: 'family', emoji: '👨‍👩‍👧', label: 'Family' },
  { id: 'friend', emoji: '🧒', label: 'Friend' },
  { id: 'school', emoji: '🏫', label: 'School' },
  { id: 'kindergarten', emoji: '🎒', label: 'Kindergarten' },
  { id: 'park', emoji: '🌳', label: 'Park' },
  { id: 'playground', emoji: '🛝', label: 'Playground' },
  { id: 'zoo', emoji: '🦁', label: 'Zoo' },
  { id: 'food', emoji: '🍕', label: 'Restaurant' },
  { id: 'cafe', emoji: '☕', label: 'Cafe' },
  { id: 'shop', emoji: '🛒', label: 'Shop' },
  { id: 'doctor', emoji: '🏥', label: 'Doctor' },
  { id: 'church', emoji: '⛪', label: 'Church' },
  { id: 'library', emoji: '📚', label: 'Library' },
  { id: 'sports', emoji: '⚽', label: 'Sports' },
  { id: 'pool', emoji: '🏊', label: 'Pool' },
  { id: 'museum', emoji: '🏛️', label: 'Museum' },
  { id: 'metro', emoji: '🚇', label: 'Metro' },
  { id: 'bus', emoji: '🚌', label: 'Bus stop' },
]

export default function App() {
  const mapContainer = useRef(null)
  const selectedRef = useRef(ICONS[0])
  const [selected, setSelected] = useState(ICONS[0])

  function choose(icon) {
    selectedRef.current = icon
    setSelected(icon)
  }

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

      const el = document.createElement('div')
      el.textContent = selectedRef.current.emoji
      el.style.fontSize = '36px'
      el.style.cursor = 'pointer'

      new maplibregl.Marker({ element: el })
        .setLngLat(e.lngLat)
        .setPopup(new maplibregl.Popup({ offset: 20 }).setText(name))
        .addTo(map)
        .togglePopup()
    })

    return () => map.remove()
  }, [])

  return (
    <>
      <div ref={mapContainer} style={{ width: '100vw', height: '100vh' }} />
      <div
        style={{
          position: 'absolute',
          top: 12,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexWrap: 'wrap',
          maxWidth: '90vw',
          gap: 2,
          background: 'white',
          padding: 8,
          borderRadius: 12,
          boxShadow: '0 2px px rgba(0,0,0,0.25)',
        }}
      >
        {ICONS.map((icon) => (
          <button
            key={icon.id}
            onClick={() => choose(icon)}
            title={icon.label}
            style={{
              fontSize: 22,
              padding: '2px 4px',
              borderRadius: 8,
              cursor: 'pointer',
              border: selected.id === icon.id ? '2px solid #e8590c' : '2px solid transparent',
              background: selected.id === icon.id ? '#fff4e6' : 'white',
            }}
          >
            {icon.emoji}
          </button>
        ))}
      </div>
    </>
  )
}