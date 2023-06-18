import React, { useState, useEffect } from 'react';
import classes from './checkreservation.module.css'
import arr from './images/arr_1.png'
import user from './images/i_user.png'
import { useSelector, useDispatch } from 'react-redux'

const CheckReservation = (props) => {
    const [isPanelCheckReserveOpen, setIsPanelCheckReserveOpen] = useState(props.isOpen)
    const [reserve, setReserve] = useState([]) 

    const data = useSelector((state) => state.data.filter(item => item.id === props.planeId));
 
    const dispatch = useDispatch()

    const handlePanelClose = () => {
        props.click(false)
    }

    useEffect(() => {
        setIsPanelCheckReserveOpen(props.isOpen);
        setReserve(props.reserve[0])
      }, [props.isOpen, props.reserve]);


      const handleConfirmClick = () => {
        props.click(false)
        dispatch({ 
            type: 'SET_RESERVE', 
            reserve:{
                indexsOfReserves: props.planeId,
                reserve : reserve
            }
            });
      }

    return (
        <div>
        {isPanelCheckReserveOpen ? (

        <div  className={classes.main}>
            <div className={classes.content}>
                <div className={classes.header}>
                    <div className={classes.mainTit}>Check your reservation</div>
                    <button onClick={handlePanelClose} className={classes.close}>X</button>
                </div>

                <div className={classes.listOfRes}>
            {reserve.length !== 0 ? (

                    <div className={classes.lor_i}>

                        <div className={classes.lor_i_way}>

                            <div className={classes.lor_info}>
                                <div className={classes.lor_i_tit}>{data[0].from}</div>
                                <div className={classes.lor_i_dateCont}>
                                    <div className={classes.lor_i_time}>{new Date(data[0].departure).getHours() +':'+`0${new Date(data[0].departure).getMinutes()}`.slice(-2)}</div>
                                    <div className={classes.lor_i_date}>{`${new Date(data[0].departure).getDate()}.${new Date(data[0].departure).getMonth()+1}.${new Date(data[0].departure).getFullYear()}`}</div>
                                </div>
                            </div>

                            <img className={classes.arr_img} alt="" src={arr} />

                            <div className={classes.lor_info}>
                                <div className={classes.lor_i_tit}>{data[0].to}</div>
                                <div className={classes.lor_i_dateCont}>
                                    <div className={classes.lor_i_time}>{new Date(data[0].arrival).getHours() +':'+`0${new Date(data[0].arrival).getMinutes()}`.slice(-2)}</div>
                                    <div className={classes.lor_i_date}>{`${new Date(data[0].arrival).getDate()}.${new Date(data[0].arrival).getMonth()+1}.${new Date(data[0].arrival).getFullYear()}`}</div>
                                </div>
                            </div>

                        </div>

                        <div className={classes.lor_i_ni}>
                            <div className={classes.lor_i_countOfpassangers}>
                                <div className={classes.lor_i_cofVal}>{reserve.seats.length}</div>
                                <img src={user} className={classes.lor_i_userImg} alt="" />
                            </div>
                            <div className={classes.lor_i_ni_dur}>{data[0].duration}</div>
                            <div className={classes.lor_i_ni_price}>{data[0].price} $</div>
                        </div>

                    </div>
            ):null}
                    
                </div>
                <button onClick={handleConfirmClick} className={classes.confBottom}>Confirm</button>
            </div>
        </div>

        ) : null}
        </div>
    );
}

export default CheckReservation;
