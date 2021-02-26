import React, { useState, useEffect } from "react";
import { API, Auth } from 'aws-amplify';
import '../assets/css/XkcdComic.css';

const xkcdComicUrl = "https://xkcd.com/info.0.json";

class XkcdComic extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            xkcdComicData: [],
            isLoading: true
        };
    }

    async componentDidMount() {
/*         const user = await Auth.currentAuthenticatedUser()
        const token = user.signInUserSession.idToken.jwtToken
        console.log({token})
  
        const requestInfo = {
            headers: {
                Authorization: token
            }
        }
  
        const data = await API.get('ExternalAPIs', '/GetXkcdComic', requestInfo) */

        const data = await API.get('ExternalAPIs', '/GetXkcdComic', '');

        this.setState({
            xkcdComicData: data,
            isLoading: false
        });
    }

    render() {
        return this.state.isLoading ? (
            <div className="XkcdComic">
                <h1>XKCD Comic</h1>
                <h2>Loading! Please wait...</h2>
            </div>
        ) : (
            <div className="XkcdComic">
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
                                {this.state.xkcdComicData.num}
                            </td>
                            <td>
                                {this.state.xkcdComicData.day}
                            </td>
                            <td>
                                {this.state.xkcdComicData.month}
                            </td>
                            <td>
                                {this.state.xkcdComicData.year}
                            </td>
                            <td>
                                {this.state.xkcdComicData.title}
                            </td>
                            <td>
                                <img src={this.state.xkcdComicData.img} alt={this.state.xkcdComicData.alt} />
                            </td>
                            <td>
                                {this.state.xkcdComicData.alt}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
      }
}

export default XkcdComic;