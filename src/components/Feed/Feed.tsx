import './Feed.css'

function Feed() {
  return (
    <div className='feedContainer'> 
      <div className='feedContent'>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className='feedItem'>
            <h3>Alert {i + 1}</h3>
            <p>Description</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Feed