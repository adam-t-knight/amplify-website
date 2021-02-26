import React, { useState, useEffect } from "react";
import { API, Auth } from 'aws-amplify';
import NewYorkTimesArticles from '../components/NewYorkTimesArticles';

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

    return isLoading ? (
        <div className="nytArticles">
            <h1>New York Times</h1>
            <h2>Loading! Please wait...</h2>
        </div>
    ) : (
        <div className="nytArticles">
            <h1>New York Times</h1>
            <h2>Copyright: {nytData.copyright}</h2>
            <h2>Last updated: {nytData.last_updated}</h2>
            <h2>Number of results: {nytData.num_results}</h2>
            <h2>News section: {nytData.section}</h2>
            <NewYorkTimesArticles articles={nytData.results} />
        </div>
    );
}

export default NewYorkTimes;