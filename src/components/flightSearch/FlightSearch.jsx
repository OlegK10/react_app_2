import React, {useEffect, useState} from 'react';
import classes from './flightsearch.module.css'
import FS_FromTo from './FS_fromTo/FS_FromTo';
import FS_Date from './FS_date/FS_Date';
import FSSearch from './FS_search/FS_Search';
import FS_Sort from './FS_sort/FS_Sort';
import FlightList from '../flightList/FlightList';
import MyReservation from '../myReservation/MyReservation';
import { useSelector, useDispatch } from 'react-redux'

const FlightSearch = () => {
    const reserveList = useSelector((state) => state.reservation);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({ type: 'GET_RESERVE' });
      }, [dispatch]);
      
    const [openMyResPanel, setOpenMyResPanel] = useState(false);
    const openMyReservePanel = open => {
        setOpenMyResPanel(open)
    }

    const [titleOfSearchToList, setTitleOfSearchToList] = useState('')
    const [typeOfSort, setTypeOfSort] = useState('')

    const[searchInpEmpy, setSearchInpEmpy] = useState(false)

    const handleSearchListClick = (titleOfSearch) => {
        setTitleOfSearchToList(titleOfSearch)
    }

    const handleSortChange = (typeOfSort) => {
        setTypeOfSort(typeOfSort)
    }


    const [selectedFromTarget, setSelectedFromTarget] = useState('')
    const [selectedToTarget, setSelectedToTarget] = useState('')

    const setFromTargetFun = (val) => {
        setSelectedFromTarget(val)
    }

    const setToTargetFun = (val) => {
        setSelectedToTarget(val)
    }

    const [dateOfFiltr, setDateOfFilter] = useState('')
    const [timeOfFiltr, setTimeOfFilter] = useState('')

    const setDate = (val) => {
        setDateOfFilter(val)
    }

    const setTime = (val) => {
        setTimeOfFilter(val)
    }

    return (
    <>
    <div className={classes.main}>
        <div className={classes.container}>
            <div className={classes.fullCont}>
            <button onClick={()=>openMyReservePanel(true)} className={classes.btnMyReserve}>My reservations : {reserveList.countOfReserve}</button>

                <div className={classes.content}>
                    <div className={classes.lcont}>
                        <FS_FromTo 
                        from = {(val)=>setFromTargetFun(val)} to = {(val)=>setToTargetFun(val)} />
                    </div>

                    <div className={classes.rcont}>
                        <FS_Date time = {(val)=>setTime(val)} date={(val)=>setDate(val)} />
                    </div>
                    
                </div>

                <div className={classes.bot_cont}>
                    <FSSearch  
                        isEmpty = {(isTrue)=>setSearchInpEmpy(isTrue)} c
                        click = {handleSearchListClick}
                        from = {(from)=>setFromTargetFun(from)}
                        to = {(to)=>setToTargetFun(to)} 
                     />

                    <FS_Sort    change = {handleSortChange} />
                </div>
 
            </div>

        </div>
    </div>

        <FlightList 
        searchDate = {dateOfFiltr}
        searchTime = {timeOfFiltr}
        searchFromSelected = {selectedFromTarget}
        searchToSelected = {selectedToTarget}
        searchInpEmpty = {searchInpEmpy}
        titleForSearch = {titleOfSearchToList}  
        titleForSearchFun = {handleSearchListClick}
        sort = {typeOfSort}
         />

        {openMyResPanel ? (
        <MyReservation click = {openMyReservePanel} />
      ): null}

    </>
    );
}

export default FlightSearch;
