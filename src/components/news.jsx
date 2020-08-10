import React, {} from 'react'

function News(props) {
    var news = props.news;
    
    return (
    <div className="card-group col-xs-12 col-sm-10 col-md-8 col-lg-7" style={{margin: "0 auto"}}>
    {news.map(data => (
        <div className="card" key={news.indexOf(data)}>
            <img className="card-img-top" src={data.urlToImage} alt="headline"></img>
            <div className="card-body">
                <a href={data.url}><h6 className="card-title">{data.title}</h6></a>
            </div>
            <div className="card-footer">
                <small className="text-muted">{data.source.name}</small>
            </div>
        </div>
    ))}
    </div>
    )
}
export default News; 