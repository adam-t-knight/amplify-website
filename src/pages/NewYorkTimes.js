import React, { useState, useEffect } from "react";
import { API, Auth } from 'aws-amplify';
import NewYorkTimesArticles from '../components/NewYorkTimesArticles';

class NewYorkTimes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            copyright: "",
            last_updated: null,
            num_results: 0,
            results: [],
            section: "",
            isLoading: true
        };
    }

    async componentDidMount() {
        const user = await Auth.currentAuthenticatedUser()
        const token = user.signInUserSession.idToken.jwtToken
  
        const requestInfo = {
            headers: {
                Authorization: token
            }
        }
  
        const data = await API.get('ExternalAPIs', '/GetNewYorkTimes', requestInfo)

        this.setState({
            copyright: data.copyright,
            last_updated: data.last_updated,
            num_results: data.num_results,
            results: data.results,
            section: data.section,
            isLoading: false
        });
    }

    render() {
        return this.state.isLoading ? (
            <div className="nytArticles">
                <h1>New York Times</h1>
                <h2>Loading! Please wait...</h2>
            </div>
        ) : (
            <div className="nytArticles">
                <h1>New York Times</h1>
                <h2>Copyright: {this.state.copyright}</h2>
                <h2>Last updated: {this.state.last_updated}</h2>
                <h2>Number of results: {this.state.num_results}</h2>
                <h2>News section: {this.state.section}</h2>
                <NewYorkTimesArticles articles={this.state.results} />
            </div>
        );
      }
}

export default NewYorkTimes;