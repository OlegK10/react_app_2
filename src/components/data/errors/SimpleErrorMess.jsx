import React from 'react';
import classes from './simpleErrorMess.module.css'
const SimpleErrorMess = (props) => {
    return (
        <div className={classes.cont}>
            <div className={classes.tit}>Error </div>
            <div className={classes.mess}>
                {props.message.length !== 0 ? props.message : <>Error</>}
            </div>
            <button onClick={props.click} className={classes.close}>Confirm</button>
        </div>
    );
}

export default SimpleErrorMess;
