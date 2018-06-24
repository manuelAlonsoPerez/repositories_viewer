import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reposFetchData } from '../actions/repositories';
import RepoTable from './repo-table';

import '../styles/MainPage.css';

class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: 'https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&per_page=100'
        }
    }

    componentDidMount() {
        this.props.fetchData(this.state.url);
    }

    render() {
        return (
            <div className='mainPage-container'>
                <header className='mainpage-header'>
                    <h1 className='mainpage-title'>TOP JS REPOSITORIES </h1>
                </header>
                <p className='mainpage-description'>This is a list with the top 100 JS repositories at gitHub</p>
                <RepoTable />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(reposFetchData(url)),
    };
};

export default connect(null, mapDispatchToProps)(MainPage);

