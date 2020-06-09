import React from 'react';

const Card = ({title, click}) => {
    return (
        <div onClick={click} className='card'>
            <h3>{title}</h3>
        </div>
    )
}

export default Card