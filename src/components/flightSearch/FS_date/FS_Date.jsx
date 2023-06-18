import React, {useEffect, useState} from 'react';
import classes from './fs_date.module.css'

const FS_Date = (props) => {

    const [time, setTime] = useState('00:00');
    const [date, setDate] = useState('0000-00-00');
  
    useEffect(() => {
        let currentDate = new Date();
        let nextHour = new Date(currentDate.getTime() + 60 * 60 * 1000);
    
        let formattedTime = `${('0' + nextHour.getHours()).slice(-2)}:00`;
        let formattedDate = `${currentDate.getFullYear()}-${('0' + (currentDate.getMonth() + 1)).slice(-2)}-${('0' + currentDate.getDate()).slice(-2)}`;
    
        setTime(formattedTime);
        setDate(formattedDate);
    }, []);
    const handleDateChange = (event) => {
      setDate(event.target.value);
      props.date(event.target.value)
    };
  
    const handleTimeChange = (event) => {
      setTime(event.target.value);
      props.time(event.target.value)
    };


    return (
             <div className={`${classes.rc_content} ${classes.container_content}`}>

                <div className={classes.rc_dateCont}>
                    <div className={classes.rcs_tit}>Departure date</div>
                    <div className={classes.rcs_dateInpsConst}>
                        <input onChange={handleDateChange} type="date" value={date} className={`${classes.rcs_inp} ${classes.rcs_inp_date}`} />
                    </div>
                </div>

                <div className={classes.rc_timeCont}>
                    <div className={classes.rcs_tit}>Departure time</div>
                    <div className={classes.rcs_timeInpsConst}>
                        <input onChange={handleTimeChange} type="time" value={time} className={`${classes.rcs_inp} ${classes.rcs_inp_time}`} />
                    </div>
                </div>

            </div>
    );
}

export default FS_Date;
