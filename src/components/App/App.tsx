import './App.css'
import Feed from '../Feed/Feed.js'
import MapOverlay from '../MapOverlay/MapOverlay.js'

function App() {

  return (
    <>
    <div className="appMount">
      <MapOverlay />
      <Feed />
    </div>
    </>
  )
}

export default App
