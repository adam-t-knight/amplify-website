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
        <div className="XkcdComic">
            <h1>XKCD Comic</h1>
            <div className="XkcdContainer">
                <h2>Loading! Please wait...</h2>
            </div>
        </div>
    ) : (
        <div className="XkcdComic">
            <h1>XKCD Comic</h1>
            <div className="XkcdContainer">
                <h2>Latest comic from <a href={xkcdComicUrl}>xkcd.com</a>:</h2>
                <table id="XkcdTable">
                    <thead>
                        <tr>
                            <th scope="col">
                                Category
                            </th>
                            <th scope="col">
                                Value
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                Number
                            </td>
                            <td>
                                {xkcdComicData.num}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Day
                            </td>
                            <td>
                                {xkcdComicData.day}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Month
                            </td>
                            <td>
                                {xkcdComicData.month}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Year
                            </td>
                            <td>
                                {xkcdComicData.year}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Title
                            </td>
                            <td>
                                {xkcdComicData.title}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Image
                            </td>
                            <td>
                                <img src={xkcdComicData.img} alt={xkcdComicData.alt} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Alt Text
                            </td>
                            <td>
                                {xkcdComicData.alt}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default XkcdComic;