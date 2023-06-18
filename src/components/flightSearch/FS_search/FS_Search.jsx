import React, { useState, useEffect } from 'react';
import classes from './fsSearch.module.css'
import searchIco from './search.png'
import arrow_down from './arrow_down.png'
import { useSelector, useDispatch } from 'react-redux';

const FSSearch = (props) => {
    const data = useSelector((state) => state.data);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({ type: 'GET_DATA' });
      }, [dispatch]);
      
    const [searchInp, setSearchInp] = useState('');
    const [inputInFocus, setInputInFocus] = useState(false);

    const handleSearchInputChange = (e) =>{
        setSearchInp(e.target.value)
        if(e.target.value.length === 0){
            props.isEmpty(true)
        }else{
            props.isEmpty(false)
        }
    }

    const handleClickListItem = (from, to) => {
        setSearchInp('')
        props.from(from)
        props.to(to)
    };
   

    function returnSearch() {
        const filteredItems = data.filter(item => item.from.toLowerCase().startsWith(searchInp.toLowerCase()) || item.to.toLowerCase().startsWith(searchInp.toLowerCase()));
        
        return (
            <ul id="listWithSearchResultGlobal" className={classes.bc_searchResultList}>
                <button onClick={()=>{setInputInFocus(false)}} className={classes.close}>Close</button>
                {filteredItems.map(item => (
                    <li key={item.id} onClick={(from, to)=>handleClickListItem(item.from, item.to)} className={classes.bc_searchResultItem}>
                        <div className={`${classes.bc_SRI_tit} ${classes.bc_SRI_from}`}>{item.from}
                            <div className={classes.bc_time}>{item.departure.split('T')[1].slice(0, -3)} {item.departure.split('T')[0].replace(/-/g, '.')}</div>
                        </div>
                        <img src={arrow_down} className={classes.bc_SRI_arr} alt="" />
                        <div className={`${classes.bc_SRI_tit} ${classes.bc_SRI_to}`}>{item.to}</div>
                    </li>
                ))}
            </ul>
        );
    }
    

    return (
    <>

        <div className={classes.bc_searchInpCont}>

            <input 
            onFocus={()=>setInputInFocus(true)}
            onChange={handleSearchInputChange} 
            type="text" name="" id="" 
            className={classes.searchInp} 
            placeholder='Departure or Arrivals?...' 
            /> 

            <img src={searchIco} alt="" />

            {searchInp.length !== 0  && inputInFocus? (
                    returnSearch()
            ) : ''}
            
        </div>

    </>
    );
}

export default FSSearch;
