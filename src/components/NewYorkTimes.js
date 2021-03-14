import React, { useState, useEffect } from "react";
import { API } from 'aws-amplify';
import NewYorkTimesArticles from './NewYorkTimesArticles';
import moment from "moment-timezone";
import '../assets/css/NewYorkTimes.css';

function NewYorkTimes() {
    const [nytData, setNytData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getNewYorkTimesWithFetch();
    }, []);

    const getNewYorkTimesWithFetch = async () => {
        const data = await API.get('ExternalAPIs', '/GetNewYorkTimes', '');
        setNytData(data);
        setIsLoading(false);
    };

    return (
        <div id="NewYorkTimes">
            <h2>New York Times</h2>
            {isLoading ? (
                <div className="nytContainer">
                    <h3>Loading! Please wait...</h3>
                </div>
            ) : (
                <div className="nytContainer">
                    <h3>Last updated {moment(nytData.last_updated).tz("America/New_York").format('MM-DD-YYYY HH:mm').toString()}</h3>
                    <h3>{nytData.num_results} results</h3>
                    <NewYorkTimesArticles articles={nytData.results} />
                </div>
            )}
        </div>
    );
}

export default NewYorkTimes;