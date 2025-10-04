import './Feed.css'

function Feed() {
  return (
    <div className='FeedContainer'>
      <div className='FeedHeader'>
        <h2>Feed</h2>
      </div>
      <div className='FeedContent'>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className='FeedItem'>
            <h3>Alert {i + 1}</h3>
            <p>Description</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Feed