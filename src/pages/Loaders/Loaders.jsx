import React from 'react';
import { WaveLoading } from 'react-loadingg';



export const PageChangeLoader = () => {

    return (
        <div className="page-content w-100 d-flex align-items-center justify-content-center" style={{ height: "80vh" }}>
            <WaveLoading />
        </div>
    )
}

export const DataLoader = () => {
    return (
        <div style={{ height: "53vh", backgroundColor: "#FFFFFF", marginBottom: "20px" }}>
            <div className="d-flex justify-content-center align-items-center h-100">
                <i className="bx bx-loader bx-spin font-size-25 align-middle text-success mr-2" style={{ fontSize: "40px" }} />
            </div>
        </div>
    )
}
