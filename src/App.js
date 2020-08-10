import React, { useState, useEffect } from 'react';
//import Graph from './components/graph';
import DataCard from "./components/data-card";
import News from "./components/news";
import Financial from './components/financial-data';
import StartPage from './components/startpage';
//import { useSpring, animated } from 'react-spring';
import './App.css';


const API = {
  key: "73151823131744a78d7da16875ca87e3", 
  base: "https://www.alphavantage.co/query?" 
}

const news_api = "73151823131744a78d7da16875ca87e3";

function App() {
  const [symbol, setSymbol] = useState({}); 
  const [functionKeyword, setFunctionKeyword] = useState('');
  const [query, setQuery] = useState(''); 
  const [news, setNews] = useState({});
  // to be removed
  const [financialData, setFinancialData] = useState({});
  const [queryForData, setQueryForData] = useState('');
  // keep this tho
  const [indexOfFirst, setIndexOfFirst] = useState(0); 
  const [indexOfLast, setIndexOfLast] = useState(3);

  useEffect(() => {
    /// useRef reccommended
    var errorMessage, previousSymbolState;
    previousSymbolState = symbol;

    fetch(`${API.base}function=${functionKeyword}&apikey=${API.key}`)
    .then(res => res.json())
    .then(result => {
      console.log(result);
      if (Object.keys(result).length === 1) {
        errorMessage = "API calls exceeded";
        console.log(errorMessage);
      } 
      console.log(result);
        setSymbol(result);
    })
  
  }, [functionKeyword])

  useEffect(() => {
    
    fetch(`http://newsapi.org/v2/everything?q=${query}&apiKey=${news_api}`)
    .then(res => res.json())
    .then(result => {
      setNews(result); //JSON.stringify(result))
      console.log("news: ", result);
    }) 

    /*
    fetch(`${API.base}function=OVERVIEW&symbol=${query}&apikey=${API.key}`)
    .then(res => res.json())
    .then(result => {
      console.log("financial data: ", result);
      setFinancialData(result);
    })
    */
  }, [queryForData])

  function handleSearch(e) {
    if (e.key === "Enter") {
      setFunctionKeyword(`TIME_SERIES_INTRADAY&interval=5min&symbol=${query}`);
      setQueryForData(query);
    }
  }
  if (news != undefined && news.status === "ok") {
    //var indexOfLast = currentPage * postsPerPage;
    //var indexOfFirst = indexOfLast - postsPerPage;
    var currentPosts = news.articles.slice(indexOfFirst, indexOfLast);
  }

  function handleNext() {
    let prevState = indexOfFirst; 
    let nextState = indexOfLast;
    setIndexOfFirst(prevState+3);
    setIndexOfLast(nextState+3);
  }

  function handlePrevious() {
    let prevState = indexOfFirst; 
    let nextState = indexOfLast;
    setIndexOfFirst(prevState-3);
    setIndexOfLast(nextState-3);
  }

  //const fadeIn = useSpring({opacity: 1, from: {opacity: 0}})

  return (   
    <div className="container">
      <div className="row">
        <input 
          type="text"
          style={{margin: "0 auto", marginTop:"5%" }}
          className="col-xs-9 col-sm-7 col-md-5 col-lg-3 form-control"
          placeholder="Enter Symbol"
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => handleSearch(e)}
        />
      </div>
      
        {Object.keys(symbol).length > 1 ? 
        <>
          <div className="row justify-content-md-center"> 
            <DataCard symbol={symbol} 
              onToday={() => setFunctionKeyword(`TIME_SERIES_INTRADAY&interval=5min&symbol=${query}`)}
              onFiveDays={() => setFunctionKeyword(`TIME_SERIES_INTRADAY&interval=60min&symbol=${query}`)}
              onYearly={() => setFunctionKeyword(`TIME_SERIES_WEEKLY&symbol=${query}`)}
              onFiveYears={() => setFunctionKeyword(`TIME_SERIES_MONTHLY&symbol=${query}`)}
            />
          </div> 
          
          {(news !== undefined && news.status === "ok") ?
            (<div>
              <div className="row">
                <News news={currentPosts} />
              </div>
              <div className="row" style={{margin:"0 auto"}}>
                <div className="card-group col-xs-12 col-sm-10 col-md-8 col-lg-6" style={{margin: "0 auto"}}>
                  {indexOfFirst !== 0 && <button className="btn btn-primary" onClick={handlePrevious} style={{textAlign:"left"}}>Previous</button>}
                  <button className="btn btn-primary" onClick={handleNext} style={{textAlign: "right"}}>Next</button>
                </div>
              </div>
            </div>
            ) : ('')
          }

        </>
        : <StartPage />}
    </div>
  );
}

export default App;