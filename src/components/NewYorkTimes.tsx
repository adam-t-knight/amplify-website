import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import NewYorkTimesArticles from './NewYorkTimesArticles';
import '../assets/css/NewYorkTimes.css';

const initialResults = {
  status: '',
  copyright: '',
  section: '',
  lastUpdated: '',
  numResults: '',
  results: [],
};

type NytResults = {
  status: string;
  copyright: string;
  section: string;
  lastUpdated: string;
  numResults: string;
  results: Array<Article>;
};

type Multimedia = {
  url: string;
  format: string;
  height: number;
  width: number;
  type: string;
  subtype: string;
  caption: string;
  copyright: string;
};

type Article = {
  section: string;
  subsection: string;
  title: string;
  abstract: string;
  url: string;
  uri: string;
  itemType: string;
  updatedDate: string;
  createdDate: string;
  publishedDate: string;
  materialTypeFacet: string;
  kicker: string;
  desFacet: Array<string>;
  orgFacet: Array<string>;
  perFacet: Array<string>;
  geoFacet: Array<string>;
  multimedia: Multimedia;
  shortUrl: string;
};

/**
 * Main New York Times component. Fetches the articles which are then displayed by the NewYorkTimesArticles subcomponent.
 */
function NewYorkTimes() {
  const [nytData, setNytData] = useState<NytResults>(initialResults);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Fetches the New York Times articles
   */
  const getNewYorkTimesWithFetch = async () => {
    const data = await API.get(
      'ExternalAPIs',
      '/GetNewYorkTimes',
      '',
    );
    setNytData(data);
    setIsLoading(false);
  };

  /**
   * Fetches on change
   */
  useEffect(() => {
    getNewYorkTimesWithFetch();
  }, []);

  return (
    <div id="NewYorkTimes">
      <h2>New York Times</h2>
      {isLoading ? (
        <div className="nytContainer">
          <h3>Loading! Please wait...</h3>
        </div>
      ) : (
        <div className="nytContainer">
          <h3>Current Top Stories</h3>
          <NewYorkTimesArticles articles={nytData.results} />
        </div>
      )}
    </div>
  );
}

export default NewYorkTimes;
