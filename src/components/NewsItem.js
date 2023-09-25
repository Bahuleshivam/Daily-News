import React from 'react';

const NewsItem = (props) => {

        let { title, description, imageurl, newsurl, date, source } = props;
        return (
            <div className='my-3' >
                <div className="card" >
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        position: 'absolute',
                        right: '0',
                        
                    }}>
                        <span className="badge rounded-pill bg-danger">{source}</span>
                    </div>
                    <img src={!imageurl ? "https://news.fintechnexus.com/wp-content/uploads/2015/05/Marketplace-Lending-News.jpg" : imageurl} className="card-img-top" alt="..." />
                    <div className="card-body" style={{color:props.mode === 'light' ? 'black' : 'white',backgroundColor:props.mode === 'dark' ? 'black' :'white'}}>
                        <h5 className="card-title">{title}  </h5>
                        <p className="card-text">{description}...</p>
                        <p className='card-text'><small className='' >{new Date(date).toGMTString()}</small></p>
                        <a rel='noreferrer' href={newsurl} target="_blank" className="btn btn-sm " style={{color:props.mode === 'light' ? 'white' : 'black',backgroundColor:props.mode === 'dark' ? 'white' :'black'}}>Read More</a>
                    </div>
                </div>
            </div>
        );
    
}

export default NewsItem;
