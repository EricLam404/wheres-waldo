import React, { useState, useEffect } from 'react';

function Timer(){
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
          setSeconds(seconds => seconds + 1);
        }, 1000);
    
        return () => clearInterval(interval);
    }, []);
    
    return(
        <div className='timer'>
            Time: {seconds} seconds
        </div>
    );
}

export default Timer;