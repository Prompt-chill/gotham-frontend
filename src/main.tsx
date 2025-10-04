import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App.tsx'
import Header from './components/Header/Header.tsx'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="app-container">
      <Header />
      <App />
    </div>
  </React.StrictMode>,
)
