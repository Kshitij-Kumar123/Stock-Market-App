import React from 'react'

export default function Overview ({ data }) {
    return (
        <>
        { Object.keys(data).length > 3 && 
        <div className="container">
            <div className="row">
                <div className="cols shadow-sm p-3 mb-5 bg-white rounded">
                    <br/> 
                    <h4 style={{color: "gray"}}> Market Summary: </h4>
                    <h3 style={{marginBottom: "-5%"}}> <br/> {data["Name"]} </h3>
                    
                    <br/> {data["Exchange"]}: {data["Symbol"]}
                    <br/> Sector: <span style={{color: "gray"}}> {data["Sector"]} </span>
                </div> 
            </div>
        </div>
        }
        </>
    )
}
