import { useState, useEffect } from "react";
import { API } from 'aws-amplify';
import '../assets/css/XkcdComic.css';

const xkcdComicUrl = "https://xkcd.com/info.0.json";

function XkcdComic() {
    const [xkcdComicData, setXkcdComicData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getXkcdComicWithFetch();
    }, []);

    const getXkcdComicWithFetch = async () => {
        const data = await API.get('ExternalAPIs', '/GetXkcdComic', '');
        setXkcdComicData(data);
        setIsLoading(false);
    };

    return isLoading ? (
        <div>
            <h1>XKCD Comic</h1>
            <h2>Loading! Please wait...</h2>
        </div>
    ) : (
        <div>
            <h1>XKCD Comic</h1>
            <h2>Latest XKCD comic from {xkcdComicUrl}:</h2>
            <table id="XkcdTable">
                <thead>
                    <tr>
                        <th>
                            Number
                        </th>
                        <th>
                            Day
                        </th>
                        <th>
                            Month
                        </th>
                        <th>
                            Year
                        </th>
                        <th>
                            Title
                        </th>
                        <th>
                            Image
                        </th>
                        <th>
                            Alt Text
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {xkcdComicData.num}
                        </td>
                        <td>
                            {xkcdComicData.day}
                        </td>
                        <td>
                            {xkcdComicData.month}
                        </td>
                        <td>
                            {xkcdComicData.year}
                        </td>
                        <td>
                            {xkcdComicData.title}
                        </td>
                        <td>
                            <img src={xkcdComicData.img} alt={xkcdComicData.alt} />
                        </td>
                        <td>
                            {xkcdComicData.alt}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default XkcdComic;