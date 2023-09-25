import React, { useEffect, useState } from 'react';

import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";




const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);



    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://gnews.io/api/v4/top-headlines?category=${props.category}&lang=en&country=${props.country}&max=10&apikey=8748ff2a1cb2de0f44848e042110342c&page=${page}&pageSize=${props.pageSize}`
        // const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json()
        props.setProgress(50);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `DailyNews - ${capitalizeFirstLetter(props.category)}`;
        updateNews()
        // eslint-disable-next-line


    }, []);


    const fetchMoreData = async () => {
        const url = `https://gnews.io/api/v4/top-headlines?category=${props.category}&lang=en&country=${props.country}&max=10&apikey=8748ff2a1cb2de0f44848e042110342c&page=${page}&pageSize=${props.pageSize}`
        setPage(page + 1)
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)


    };

        const [dateTime, setDateTime] = useState(new Date());
        // console.log(dateTime)
        useEffect(() => {
            const interval = setInterval(() => {
                setDateTime(new Date());

            }, 1000);

            return () => clearInterval(interval);

        }, [])
    


    return (
        <>
            <h1 style={{ margin: '35px 35px', marginTop: '90px', color: props.mode === 'light' ? 'black' : 'white' }}>DailyNews - Top {capitalizeFirstLetter(props.category)} Headlines  <span style={{marginLeft: "20px"}}>{dateTime.toLocaleString()} </span> </h1>
            
            {loading && <Spinner />}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container"  >

                    <div className="row">
                        {articles.map((element, idx) => {
                            return <div className="col-md-4" key={idx}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageurl={element.image} newsurl={element.url} date={element.publishedAt} source={element.source.name} mode={props.mode} />
                                {/* <NewsItem imageurl={element.image} title={element.title ? element.title : ""} newsurl={element.url} author={element.author} date={element.publishedAt} author={element.author} source={element.source.name} mode={props.mode} /> */}
                            </div>
                        })}

                    </div>
                </div>

            </InfiniteScroll>

        </>
    );

}


News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: "general",
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News;
 