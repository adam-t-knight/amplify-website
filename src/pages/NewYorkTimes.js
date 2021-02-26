import React, { useState, useEffect } from "react";
import { API, Auth } from 'aws-amplify';
import NewYorkTimesArticle from '../components/NewYorkTimesArticle';

class NewYorkTimes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            copyright: "",
            last_updated: null,
            num_results: 0,
            results: [],
            section: "",
            status: "",
            isLoading: true
        };
    }

    async componentDidMount() {
        const user = await Auth.currentAuthenticatedUser()
        const token = user.signInUserSession.idToken.jwtToken
        console.log({token})
  
        const requestInfo = {
            headers: {
                Authorization: token
            }
        }
  
        const data = await API.get('ExternalAPIs', '/GetNewYorkTimes', requestInfo)
  
        console.log({data});

        this.setState({
            copyright: data.copyright,
            last_updated: data.last_updated,
            num_results: data.num_results,
            results: data.results,
            section: data.section,
            status: data.status,
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
                <h2>Section: {this.state.section}</h2>
                <h2>Status: {this.state.status}</h2>
                <NewYorkTimesArticle articles={this.state.results} />
            </div>
        );
      }
}

export default NewYorkTimes;