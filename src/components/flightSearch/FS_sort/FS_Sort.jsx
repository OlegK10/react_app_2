import React from 'react';
import classes from './sort.module.css'
const FS_Sort = (props) => {

    const changeSort = (e) => {
        props.change(e.target.value)
    }

    return (

        <div className={classes.bc_sortCont}>
            <div className={classes.bcs_tit}>Sort by</div>

            <select onChange={changeSort} name="" id="" className={classes.bcs_select}>
                <option value="1">Departure</option>
                <option value="2">Duration</option>
                <option value="3">Price</option>
            </select>
        </div> 
    );
}

export default FS_Sort;
