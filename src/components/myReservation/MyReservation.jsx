import React, { useEffect } from 'react';
import classes from './myreservation.module.css'

import {useSelector, useDispatch} from 'react-redux'

const MyReservation = (props) => {

    //F%============================//
    const dispatch = useDispatch()
    const reserveData = useSelector((state) => state.reservation);


    useEffect(() => {

    console.log(reserveData)

    dispatch({ type: 'GET_DATA' }); 
        dispatch({ type: 'GET_RESERVE' }); 
    }, [dispatch]);
    
    //F%============================//

    return (
        <div className={classes.main}>
            <div className={classes.content}>

                <div className={classes.header}>
                    <div className={classes.tit}>My Reservations</div>
                    <button onClick={()=>props.click(false)} className={classes.close}>X</button>
                </div>
                <div className={classes.ul}>

                {reserveData.countOfReserve !== 0 ? reserveData.reservations.map(item => (
                    <div className={classes.list}>
                    <div className={classes.li_cont}>
                        <div className={classes.li}>
                            <div className={classes.li_tit}>Plane ID {item.indexsOfReserves}</div>
                        </div>
                        <div className={classes.li}>
                            <div className={classes.li_tit}>Persons {item.reserve.seats.length}</div>
                        </div>
                        
                        <div className={classes.li}>
                            <div className={classes.li_tit_names}>Second Names :
                            {item.reserve.secondNames.join(', ')}

                            </div>
                        </div>
                        <div className={classes.li}>
                            <div className={classes.li_tit}>From {item.reserve.from}</div>
                            <div className={classes.li_from_date}>Departure </div>
                        </div>
                        <div className={classes.li}>
                            <div className={classes.li_tit}>To {item.reserve.to}</div>
                            <div className={classes.li_from_date}>Arrival </div>
                        </div>
                        <div className={classes.li}>
                            <div className={classes.li_tit}>Price {item.reserve.price}</div>
                        </div>
                        <div className={classes.li}>
                            <div className={classes.li_tit}>Duration {item.reserve.duration}</div>
                        </div>
                    </div>
                    <button onClick={()=> {
                        dispatch({type : 'REMOVE_RESERVE', idOfPlane : item.indexsOfReserves})
                    }} className={classes.delete}>Delete</button>
                    </div>
                )) : null}
                  
                    
                </div>

            </div>
        </div>
    );
}

export default MyReservation;
