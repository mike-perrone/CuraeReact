import React from 'react';

const Member = (props) => {
    return( <div>
        <p style={{color: 'white'}}>{props.knownAs}</p>
        <img src={props.photoUrl} alt={props.knownAs}></img>
    </div>)
}

export default Member;