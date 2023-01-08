import React, { Component } from 'react';

const Like = props => { 
    
    let classes = "fa fa-heart";
    // if liked is false then we are going to append this postfix "-o" to this class
    if(!props.liked) classes += "-o";
    return (
        <i onClick={props.likedMovies} style={{ cursor : 'pointer' }} className={classes} aria-hidden="true"></i>
    );
    
}
 
export default Like;