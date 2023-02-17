import React, { useState, useEffect } from 'react';

function Timer({timer}){
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        if(timer){
            const interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
          
            return () => clearInterval(interval);
        }
    }, [timer]);
    
    return(
        <div className='timer'>
            Time: {seconds} seconds
        </div>
    );
}

export default Timer;