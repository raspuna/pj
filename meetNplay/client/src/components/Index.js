import React from 'react'
import LogIn from './LogIn'
import { Link } from 'react-router-dom'

function Index() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div>
        <h1>Meet N Play</h1>
        <LogIn />
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>

  )
}

export default Index