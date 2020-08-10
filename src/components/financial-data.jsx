import React from 'react'; 

function Financial(props) {
    var data = props.data;
    console.log("from component: ", props.data);
    return (
        <>
            <br/>Market Capitalization: {data["MarketCapitalization"]}
            <br/>P/E Ratio: {data["PERatio"]}
            <br/>Div Yield: {data["DividendYield"]}
            <br/> Profit Margin: {data["ProfitMargin"]}
            <br/> 52 Week High: {data["52WeekHigh"]}
            <br/> 52 Week Low: {data["52WeekLow"]}
        </>
    )
}

export default Financial;