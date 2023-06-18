import React, { useState, useEffect } from 'react';
import classes from './reservation.module.css'
import arr_1 from './images/arr_1.png'
import arr_2 from './images/arr_2.png'
import CheckReservation from '../Check/CheckReservation';
import { useSelector, useDispatch } from 'react-redux'
import SimpleErrorMess from '../../data/errors/SimpleErrorMess';

const Reservation = (props) => {

    const dispatch = useDispatch()
    const data = useSelector((state) => state.data.filter(item => item.id === props.reserveId));
    const reserveList = useSelector((state) => state.reservation);

    useEffect(() => {
        dispatch({ type: 'GET_RESERVE' });
      }, [dispatch]);
      

    const [arrOfReserve, setArrOfReserve] = useState([])

    const [openResPanel, setOpenResPanel] = useState(false);
    
    const [reserveForCheck, setReserveForCheck] = useState([]);

    const handleClick = (e, open) => {
        if (e.target.parentNode.parentNode !== null) {
          const names = Array.from(e.target.parentNode.parentNode.querySelectorAll('#reserveFormName'));
          const secondNames = Array.from(e.target.parentNode.parentNode.querySelectorAll('#reserveFormSecondName'));
          
          const allNamesFilled = names.every(element => element.value !== '');
          const allSecondNamesFilled = secondNames.every(element => element.value !== '');
      
          if (allNamesFilled && allSecondNamesFilled) {
            const objectReserve = [
                {id : props.reserveId,
                names : names.map(element => element.value),
                from : data[0].from,
                to : data[0].to,
                departure : data[0].departure,
                arrival : data[0].arrival,
                duration : data[0].duration,
                price : data[0].price,
                secondNames : secondNames.map(element => element.value),
                allNamesFilled : Array.from(allNamesFilled).map(element => element.value),
                allSecondNamesFilled : Array.from(allSecondNamesFilled).map(element => element.value),
                seats : arrOfReserve}
            ]
            setReserveForCheck(objectReserve)
            setOpenResPanel(open);
          } else {
            setShowErrorMess('fields with * are required')
          }
        } else {
            setOpenResPanel(open);
        }
      };
      
    const closeOpenPanel = (open) => {
        setOpenResPanel(false);
    }

    const[reservationPanelOpen, setReservationPaelOpen] = useState(true)
    const closeResPanel = (id) => {
        setArrOfReserve(prevState => prevState.filter(item => item.id !== props.reserveId));

        props.click()
    }

    const ClickChoseSeat = (e, idOfPlane, idOfReserve, nameOfReserve) => {
        const ele = e.currentTarget;
      
        if (ele.getAttribute('data-isClicked') === 'true') {
            ele.setAttribute('data-isClicked', 'false');
            ele.classList.add(classes.seat_select);

            setArrOfReserve(prevState => [
                ...prevState,
                {
                    id: idOfPlane,
                    reserveSeat: {
                        id: idOfReserve,
                        name: nameOfReserve,
                    }
                }
            ])


        } else {
            ele.setAttribute('data-isClicked', 'true');
            ele.classList.remove(classes.seat_select);

            setArrOfReserve(prevState => prevState.filter(item => item.reserveSeat.id !== idOfReserve));

            // dispatch({ 
            //     type: 'REMOVE_RESERVE', 
            //     idOfPlane : idOfPlane,
            //     idOfReserve : idOfReserve,
            // });

            console.log(reserveList)
        }

      };
      
      const [showErrorMess, setShowErrorMess] = useState('')

      const ShowErrorMess = (mess) => {
        setShowErrorMess(mess)
      }

      const hideMess = () => {
        setShowErrorMess('')
      }

    useEffect(() => {
        setReservationPaelOpen(props.isOpen);
    }, [props.isOpen]);

    return (
        <div>
       {showErrorMess ? <SimpleErrorMess click={hideMess} message={showErrorMess}/> :null}
        {reservationPanelOpen && data.length  ? (

        <div className={classes.main}>
            <div className={classes.content}> 
                
                <div className={classes.header}>
                    <div className={classes.mainTit}>Reservation</div>
                    <button onClick={closeResPanel} className={classes.close_btn}>X</button>
                </div>

                <div className={classes.cont}>
                    <div className={classes.info}>
                    
                        <div className={classes.info_cont}>
                            <div className={classes.ic_tit_cont}>
                                <div className={classes.ic_tit_vl}>From </div>
                                <div className={classes.ic_tit}>{data[0].from}</div>
                            </div>
                            <div className={classes.ic_dateCont}>
                                <div className={classes.ic_date}>{`${new Date(data[0].departure).getDate()}.${new Date(data[0].departure).getMonth()+1}.${new Date(data[0].departure).getFullYear()}`}</div>
                                <div className={classes.ic_time}>{new Date(data[0].departure).getHours() +':'+`0${new Date(data[0].departure).getMinutes()}`.slice(-2)}</div>
                            </div>
                        </div>
                        
                        <div className={classes.arrows}>
                            <img src={arr_2} className={classes.arrow_i} alt="" />
                            <img src={arr_1} className={classes.arrow_i} alt="" />
                        </div>

                        <div className={classes.info_cont}>
                            <div className={classes.ic_tit_cont}>
                                <div className={classes.ic_tit_vl}>To</div>
                                <div className={classes.ic_tit}> {data[0].to}</div>
                            </div>
                            <div className={classes.ic_dateCont}>
                                <div className={classes.ic_date}>{`${new Date(data[0].arrival).getDate()}.${new Date(data[0].arrival).getMonth()+1}.${new Date(data[0].arrival).getFullYear()}`}</div>
                                <div className={classes.ic_time}>{new Date(data[0].arrival).getHours() +':'+`0${new Date(data[0].arrival).getMinutes()}`.slice(-2)}</div>
                            </div>
                        </div>
                      
                    </div>

                    <div className={classes.cont_right}>

                        <div className={classes.addInfo}>

                            <div className={classes.AddInfo__cont}>
                                <div className={classes.ai_}>Duration</div>
                                <div className={classes.ai__val}>{data[0].duration}</div>
                            </div>

                            <div className={classes.AddInfo__cont}>
                                <div className={classes.ai_}>Price</div>
                                <div className={classes.ai__val}>{data[0].price}</div>
                            </div>

                        </div>
                        

                        <div className={classes.seats_containter}>
                            <div className={classes.seats_tit}>Reserve a seat</div>

                            <div className={classes.cont_seats}>

                                {data[0].seats ? data[0].seats.map(item => (
                                    <div 
                                    onClick={item.available ? (e)=>ClickChoseSeat(e, props.reserveId, item.id, item.number, false) : ()=> ShowErrorMess('The seat on the plane is occupied.')} 
                                    data-isclicked = {true} key={'seat'+item.id} 
                                    className={
                                        item.available && reserveList.reservations.filter(itemF => itemF.indexsOfReserves === props.reserveId && itemF.seatsReserved === item.id).length !== 0
                                        ? `${classes.seat} ${classes.seat_select}`:
                                        
                                        item.available ? classes.seat :
                                        `${classes.seat} ${classes.seat_disable}` 
                                            }
                                    > 
                                        <div className={classes.seat_val}> 
                                            {item.number} 
                                        </div>

                                    </div>
                                )) : null }

                            </div>

                        </div>


                    </div>

                </div>



            </div>

            {arrOfReserve.length === 0 ? null: (
                <div className={classes.complete_reserve_cont}>
                
                <div className={classes.cr_header_cont}>
                    <div className={classes.cr_header_tit}>Complete Reservation</div>
                </div>

                {arrOfReserve.filter(item => item.id === props.reserveId)
                .map(item => (
                <div className={classes.cr_forSe_list}>

                    <div className={classes.cr_forSe}>
                        <div className={classes.cr_forSe_tit}>For: {item.reserveSeat.name}</div>
                        <div className={classes.cr_form}>
                            
                            <div className={classes.crf_n}>
                                <div className={classes.crf__cont}>
                                    <div className={classes.crf__tit}>Name <span>*</span></div>
                                    <input id="reserveFormName" type="text" className={classes.crf__inp} name="" />
                                </div>

                                <div className={classes.crf__cont}>
                                    <div className={classes.crf__tit}>Second name <span>*</span></div>
                                    <input id="reserveFormSecondName" type="text" className={classes.crf__inp} name="" />
                                </div>
                            </div>

                            <div className={classes.crf_n}>
                                <div className={classes.crf__cont}>
                                    <div className={classes.crf__tit}>Tell:</div>
                                    <input id="reserveFormTell" type="text" className={classes.crf__inp} name="" />
                                </div>

                                <div className={classes.crf__cont}>
                                    <div className={classes.crf__tit}>Year of birth</div>
                                    <input id="reserveFormYoB" type="number" className={classes.crf__inp} name="" />
                                </div>
                            </div>

                        </div>
                    </div>
                    
                </div>
                ))}
               
                <div className={classes.cr_forSe_btnComplete}>
                    <button 
                    onClick={(e)=>handleClick(e,true)} 
                    className={classes.cr_forSe_btn}>
                        Done
                    </button>
                </div>
            </div>
           )}
            

        </div>
        
        ) : null }
        <CheckReservation  
        planeId = {props.reserveId}
        isOpen = {openResPanel} 
        reserve = {reserveForCheck}
        click = {closeOpenPanel}/>
      
        </div>
    );
}

export default Reservation;
