import React, { useState, useEffect } from 'react';
import classes from './flightList.module.css'
import sit_ico from './images/sit_ico.png'
import Reservation from '../reservation/Reservation/Reservation';
import { useSelector, useDispatch } from 'react-redux'

const FlightList = (props) => {

    //F%============================//
    const dispatch = useDispatch()
    const fullData = useSelector((state) => state.data);


    useEffect(() => {
        dispatch({ type: 'GET_DATA' }); 
      }, [dispatch]);
      
    //F%============================//
      const closeReservationPanel = () => {
        setIsReservatioPanelOpen(false)
      }

    const [currentData, setCurrentData] = useState(fullData)

    const [isReservatioPanelOpen, setIsReservatioPanelOpen] = useState(false)

    const [sortKey, setSortKey] = useState('time')

    const [idOfReserve, setIdOfReserve] = useState(0)


    function sort(a, b){
        switch (sortKey) {
            case '1':
                return new Date(a.departure) - new Date(b.departure)

            case '2':
                return  a.duration.slice(0,1) - b.duration.slice(0,1) 

            case '3':
                return  a.price - b.price

            default:
                return new Date(a.departure) - new Date(b.departure)

        }
      
    }

    const openReserPanel = (openrp, itemID) => {
        setIsReservatioPanelOpen(openrp)
        setIdOfReserve(itemID)
    }

    useEffect(() => {

        if (props.titleForSearch.length === 0) {
            filterDataByDate(fullData);
          } else {
            console.log('ratat');
          }
          


        if(props.searchFromSelected.length === 0 && props.searchToSelected.length === 0){

            if(props.titleForSearch.length === 0 || props.searchInpEmpty){
                filterDataByDate(fullData)
            }else{
                filterDataByDate(fullData.filter(item => item.from === props.titleForSearch))
            }

        }else if(props.searchFromSelected.length !== 0 && props.searchToSelected.length === 0){
                filterDataByDate(fullData.filter(item => item.from === props.searchFromSelected))
            }else if (props.searchFromSelected.length === 0 && props.searchToSelected.length !== 0){
                filterDataByDate(fullData.filter(item => item.to === props.searchToSelected))
        }else {
                filterDataByDate(fullData.filter(item => item.from === props.searchFromSelected && item.to === props.searchToSelected))
        }

        
        function filterDataByDate(data) {
            if(props.searchDate.length === 0){
                setCurrentData(data.filter(item => props.searchDate <= item.departure))
            }else{
                setCurrentData(data.filter(item => props.searchDate <= item.departure))
            }

            if(props.searchTime.length === 0){
            }else{
                setCurrentData(
                    data.filter((item) => {
                      return new Date(`${props.searchDate.length === 0 ? new Date().getDate() : props.searchDate} ${props.searchTime}:00`).getTime() <= new Date(item.departure).getTime();
                    })
                  );
            }

            
        }
        

        setSortKey(props.sort)


    }, [props.titleForSearch, 
        props.sort, 
        props.searchInpEmpty,
        props.searchFromSelected,
        props.searchToSelected,
        props.searchDate,
        props.searchTime
        ]);

    return (
        <div>
          
        <div className={classes.main}>
            <div className={classes.content}>
               
                <div className={classes.list}>
                    {currentData.length !== 0 ? currentData.sort((a,b) => {
                        return sort(a, b)
                    }).map((item, index) => (
                        <div key={index} onClick={()=>openReserPanel(true, item.id)} className={classes.list_item}>

                            <div className={classes.li_way_cont}>

                                <div className={classes.li_way_from_cont}>
                                    <div className={classes.li_way_from_tit}>{item.from}</div>
                                    <div className={classes.li_w_dateCont}>
                                        <div className={classes.li_wf_time}>{new Date(item.departure).getHours() +':'+`0${new Date(item.departure).getMinutes()}`.slice(-2)}</div>
                                        <div className={classes.li_wf_date}>{`${new Date(item.departure).getDate()}.${new Date(item.departure).getMonth()+1}.${new Date(item.departure).getFullYear()}`}</div>
                                    </div>
                                </div>
                                    <div className={classes.botar}></div>
                                <div className={classes.li_way_to_cont}>
                                    <div className={classes.li_way_to_tit}>{item.to}</div>
                                    <div className={classes.li_w_dateCont}>
                                        <div className={classes.li_wf_time}>{new Date(item.arrival).getHours() +':'+`0${new Date(item.departure).getMinutes()}`.slice(-2)}</div>
                                        <div className={classes.li_wf_date}>{`${new Date(item.arrival).getDate()}.${new Date(item.arrival).getMonth()+1}.${new Date(item.arrival).getFullYear()}`}</div>
                                    </div>
                                </div>

                            </div>

                            <div className={classes.li_info_cont}>

                                <div className={classes.li_info_top_cont}>
                                    <div className={classes.li_inf_i}>
                                        <div className={classes.li_info_dur_tit}>Duration</div>
                                        <div className={classes.li_info_dur_value}>{item.duration}</div>
                                    </div>

                                    <div className={classes.li_inf_i}>
                                        <div className={classes.li_info_price_tit}>Price</div>
                                        <div className={classes.li_info_price_value}>{item.price}</div>
                                    </div>
                                </div>

                                <div className={classes.li_info_bot_cont}>

                                    <div className={classes.li_inf_i}>
                                        <div className={classes.li_inf_i_seats_tit}>Seats :</div>

                                        <div className={classes.li_inf_i_cl}>
                                            <img src={sit_ico} className={classes.li_inf_sit_ico} alt="" />
                                            <div className={classes.li_inf_sit_type}>A</div>
                                        </div>

                                        <div className={classes.li_inf_sit_val}>
                                            {item.seats.filter(seat => seat.number.startsWith('A') && seat.available).length}
                                        </div>


                                            


                                    </div>

                                    <div className={classes.li_inf_i}>
                                        <div className={classes.li_inf_i_cl}>
                                            <img src={sit_ico} className={classes.li_inf_sit_ico} alt="" />
                                            <div className={classes.li_inf_sit_type}>B</div>
                                        </div>

                                        <div className={classes.li_inf_sit_val}>
                                            {item.seats.filter(seat => seat.number.startsWith('B') && seat.available).length}
                                        </div>
                                    </div>

                                </div>

                            </div>

                                
                            
                        </div>
                        
                    )) : <>Sorry, we couldn't find the connection you requested <br /> Check if date or time is correct</>}
                    {currentData.length !== fullData.length ? (<button 
                    className={classes.btn_allFlights}
                    onClick=
                        {()=>
                            setCurrentData(fullData)
                        }
                        > All flights </button>) : null}    

                </div>
                
            </div>

        </div>

        <Reservation 
        reserveId = {idOfReserve}
        isOpen = {isReservatioPanelOpen} 
        click={closeReservationPanel} />
        </div>
    );
}

export default FlightList;
