import React, { useState, useEffect }from 'react';
import classes from './fromto.module.css'
import { useSelector, useDispatch } from 'react-redux';

const FS_FromTo = (props) => {

    
    //F%============================//
    const dispatch = useDispatch()
    const data = useSelector((state) => state.data);


    useEffect(() => {
        dispatch({ type: 'GET_DATA' }); 
      }, [dispatch]);
      
    //F%============================//

    const [targetFromInp, setTargetFromInp] = useState('')
    const [targetToInp, setTargetToInp] = useState('')

    const handleInputFromChange = (e) =>{
        setTargetFromInp(e.target.value.toLowerCase())
    }

    const handleInputToChange = (e) =>{
        setTargetToInp(e.target.value.toLowerCase())
    }

    return (
        <div className={`${classes.lc_content} ${classes.container_content}`}>

            <div className={classes.lc_startCont}>
                <div className={classes.lcs_tit}>From :</div>
                <div className={classes.search_inp_cont}>
                    <input id='fromInpTop' onChange={handleInputFromChange} type="text" placeholder='London...' className={classes.lcs_inp} />

                    {targetFromInp ? (
                    <div className={classes.searchResultList}>
                        {data
                        .filter(item => item.from.toLowerCase().startsWith(targetFromInp))
                        .map(item => (
                            <li key={item.id} 

                            onClick={
                                ()=>{
                                    document.getElementById('fromInpTop').value = item.from
                                    setTargetFromInp(' ')
                                    props.from(item.from)
                                    }
                            } 
                            
                            className={classes.search_li}>{item.from}</li>  
                        ))}
                    </div>

                    ) : ''}
                       
                </div>
            </div>

            <div className={classes.lc_finishCont}>
                <div className={classes.lcs_tit}>To :</div>

                <div className={classes.search_inp_cont}>
                    <input id='toInpTop' onChange={handleInputToChange} type="text" placeholder='Prague...' className={classes.lcs_inp} />

                    {targetToInp ? (
                        <div className={classes.searchResultList}>
                            {data
                            .filter(item => item.to.toLowerCase().startsWith(targetToInp))
                            .map(item => (
                                <li key={item.id} onClick={
                                    ()=>{
                                        document.getElementById('toInpTop').value = item.to
                                        setTargetToInp(' ')
                                        props.to(item.to)
                                    }
                                } 
                                className={classes.search_li}>{item.to}</li>  
                            ))}
                        </div>
                    ) : ' '}

                </div>

            </div>

    </div>
    );
}

export default FS_FromTo;
