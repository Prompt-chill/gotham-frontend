import './NavBar.css'

function NavBar() {

  return (
    <>
    <div className="navbarContainer">
        <button className='navbarButton'>
            <div className="navbarButtonContent">
              <img src="../../../favicon.png" width="50px" height="50px"/>
            </div>
        </button>
        <button className='navbarButton'>TODO</button>
    </div>
    </>
  )
}

export default NavBar
