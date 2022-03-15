import React from 'react'

const index = ({title,description,quantity,price}) => {
  return (
    <div style={{padding:"4rem",border:"solid 1px black" }}>
        <h3>{title}</h3>
        <p>{description}</p>
        <p>quantity : {quantity}</p>
        <h4>${price}</h4>
    </div>
  )
}

export default index