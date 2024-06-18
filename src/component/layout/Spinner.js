import React, { Fragment } from 'react'
import spinner from '../../Spinner@1x-1.0s-200px-200px.gif'
export default function Spinner() {
  return (
    <div>
      <Fragment>
        <img src={spinner}
        style={{width:'200px',margin:'auto',display:'block'}}
        alt='Loading...' />
      </Fragment>
    </div>
  )
}
