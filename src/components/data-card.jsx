import React, { Component, useState } from 'react';
import Graph from '././graph';

function DataCard (props) {
    var xValues = [];
    var yValues = [];
    var symbol = props.symbol;

    //Object.keys(symbol[dataObjectKey]).length >= 2
    if (Object.keys(symbol).length == 2) {
        var dataObjectKey = Object.keys(symbol)[1];
        //console.log(dataObjectKey);
        var open, high, low, close, volume; 
        var value = symbol[dataObjectKey][Object.keys(symbol[dataObjectKey])[0]];
        
        open = value["1. open"]; 
        high = value["2. high"];
        low = value["3. low"]; 
        close = value["4. close"];
        volume = value["5. volume"];

        //xValues = Object.keys(symbol[dataObjectKey]);
        var filteredObjects = [];
        var symbolEntries = Object.entries(symbol[dataObjectKey]);
    
        switch(dataObjectKey) {
            case "Time Series (60min)":
                filteredObjects = symbolEntries.slice(0, 60);
                break;
            case "Weekly Time Series":
                filteredObjects = symbolEntries.slice(0, 52);
                break;
            case "Monthly Time Series":
                filteredObjects = symbolEntries.slice(0, 60);
                break;
            case "Time Series (5min)":
                filteredObjects = symbolEntries;
                break;
            default:
                filteredObjects = [];
        }

        //console.log("filtered ", dataObjectKey, ": ", filteredObjects);

        for (let key in filteredObjects) {
            xValues.push(filteredObjects[`${key}`][0]);
            yValues.push(filteredObjects[`${key}`][1]["4. close"]);
        }    

        //console.log("x val: ", xValues);
        //console.log("y val: ", yValues);

        var currentClose = yValues[yValues.length-1]; 
        var previousClose = yValues[yValues.length-2]; 
        //console.log(previousClose, "    " + currentClose)

        var differencePercentage = (Math.round((previousClose-currentClose)/(previousClose)*100*10000))/10000; 
        console.log(differencePercentage);
    }

    return (
    <>
        <div className="col-xs-12 col-sm-10 col-md-8 col-lg-7" style={{margin: "0 auto"}}>
            <div className="shadow p-3 bg-white rounded"> 
                <div className="row p-3" >
                    <h4><span style={{color: "gray"}}> Market Summary: </span>{symbol["Meta Data"]["2. Symbol"].toUpperCase()}</h4>
                </div>
                <div className="row p-3">
                    <span><span className="display-4">{close}</span>&nbsp;&nbsp;{differencePercentage}</span>
                </div>
                <div className="row p-3">
                    <span style={{color: "gray"}}>High: &nbsp;</span> {high} &nbsp;&nbsp;
                    <span style={{color: "gray"}}>Low:  &nbsp;</span> {low} &nbsp;&nbsp;
                </div>
                <div className="row">
                    <ul className="nav">
                        <li className="nav-item">
                            <a className="nav-link active" href="#" onClick={props.onToday}>Today</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="#" onClick={props.onFiveDays}>5 Days</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="#" onClick={props.onYearly}>Yearly</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="#" onClick={props.onFiveYears}>5 Years</a>
                        </li>
                    </ul>
                </div> 
            </div>
        </div>
        <div className="col-xs-12 col-sm-10 col-md-8 col-lg-7 pt-1" style={{margin: "0 auto"}}>
            <div className="card h-100">
                <div className="card-body">
                    <Graph xValues={xValues} yValues={yValues} />
                </div>
            </div>
        </div>
    </>
    );
}

export default DataCard;
