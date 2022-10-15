import React, {useEffect, useState} from "react"
import {Progress} from 'antd';


const TimeBarCircle = ({time, procent}) => {
    const [percent, setpercent] = useState(100);
    const diff = time / 100;

    useEffect(() => {
        if (percent > 0) {
            setTimeout(() => {
                setpercent(percent - 1);
                console.log("foiz", time);
                console.log('kamaydi')
            }, diff * 1000);
        } else if (percent === 0) {
            window.clearTimeout(percent);
        }
    }, [percent]);


    return (
        // <Progress
        //     type="circle"
        //     strokeColor={{
        //         "0%": "#ff7875",
        //         "80%": "#95de64",
        //         "100%": "#95de64",
        //     }}
        //     width={100}
        //     format={percent => ``}
        //     percent={percent}
        // />
        <></>
    )
}
export default TimeBarCircle