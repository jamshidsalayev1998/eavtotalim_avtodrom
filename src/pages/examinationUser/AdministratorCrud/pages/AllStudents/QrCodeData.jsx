import React, {useContext,useEffect} from "react";
import MainContext from "../../../../../Context/MainContext";
const QrCodeData = () => {
const {hasLayout, setHasLayout} = useContext(MainContext)
    useEffect(() => {
        setHasLayout(false)
    })
    return (
        <>
            <div >
                <div className={''} style={{wordBreak:'break-all',maxWidth:'250px'}} >
                    <p style={{zIndex:100,fontWeight:"600",fontFamily:"Algerian"}}><b>F.I.O:</b> Jamshid</p>
                    {/*<p><b>Pasport:</b> {selectedStudent?.student_passport}</p>*/}
                    {/*<p><b>Kelish*/}
                    {/*    vaqti:</b> {selectedStudent?.access_start_date} {selectedStudent?.access_start_time}*/}
                    {/*</p>*/}
                    {/*<p><b>Tel:</b> {selectedStudent?.student_phone}</p>*/}

                    {/* <p><b>Test topshirish*/}
                    {/*    holati:</b> {selectedStudent?.type == 'resubmit' ?*/}
                    {/*    'Qayta topshirish' :*/}
                    {/*   'Birinchi marta'}</p>*/}
                </div>
                {/*<div className={''}>*/}
                {/*    <img src={src} style={{position:'relative',width:'200px',alignItems:'center'}}   alt=""/>*/}
                {/*    </div>*/}
            </div>
        </>
    );
};

export default (QrCodeData);
