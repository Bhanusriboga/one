import React from 'react'
import { useHistory } from 'react-router-dom'

function Destination() {
  const navigator = useHistory()
  return (
    <div className="destination-cont d-flex flex-column justify-content-between align-items-center" data-testid="destination-component">
      <h4 className='choose-us'>Perfect destination to discover your soulmate</h4>
      <p style={{ textAlign: "center", width: "85vw", fontWeight: '400',fontSize:"19px",lineHeight:"30px"}}> From detailed profiles that capture the essence of who you are to sophisticated matching algorithms that consider compatibility on multiple levels, we ensure that every interaction is purposeful and promising. With a community of like-minded individuals all on a quest for love, our platform fosters genuine connections that have the potential to blossom into something beautiful.</p>
      <div className='begin mt-2 mb-2' onClick={() => navigator.push("/signup")}>
        Let’s Begin
      </div>
    </div>
  )
}

export default Destination