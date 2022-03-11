import React from 'react'
import {Spinner} from 'react-bootstrap'
const Loader = () => {
    return (
        <div>
            <Spinner animation="border" role="status" className='py-3' style={{height:"100px",width:"100px",display:"block",margin:"auto"}}>
  <span className="visually-hidden">Loading...</span>
</Spinner>
        </div>
    )
}

export default Loader
