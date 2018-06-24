import React, { Component } from 'react';
import { connect } from 'react-redux';
import loading_icon from '../assets/loading.webp';

import '../styles/RepoTable.css';

class RepoTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startIndex: 0,
            reposPerTable: 20,
            reposToRender: []
        }
        this.sliceRepos = this.sliceRepos.bind(this);
        this.showPrevious = this.showPrevious.bind(this);
        this.showNext = this.showNext.bind(this);
        this.renderRepos = this.renderRepos.bind(this);
    }

    sliceRepos() {
        let reposToShow = this.props.repos.slice(this.state.startIndex, this.state.startIndex + 20);
        this.setState({
            reposToRender: reposToShow
        });
    }

    showPrevious() {
        let index = this.state.startIndex;
        if (index > 0) {
            this.setState({
                startIndex: index - 20
            })
        }
    }

    showNext() {
        let index = this.state.startIndex;
        if (index < 80) {
            this.setState({
                startIndex: index + 20
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.repos !== this.props.repos || prevState.startIndex !== this.state.startIndex) {
            this.sliceRepos();
        }
    }

    renderRepos() {
        return (
            this.state.reposToRender.map((repo) => {
                return (
                    <tr key={repo.id}>
                        <td className='repo-cell repo-cell-icon' width='50px'>
                            <img
                                src={repo.owner.avatar_url}
                                alt={repo.full_name}
                                width='30px'
                                height='30px'
                                style={{ marginLeft: '10px', marginRight: '10px' }} />
                        </td>
                        <td className='repo-cell repo-cell-name'> {repo.full_name} </td>
                        <td className='repo-cell repo-cell-url' width='40px'>
                            <a href={repo.html_url} target='_blank'> url </a>
                        </td>
                        <td className='repo-cell repo-cell-stats'> {repo.stargazers_count} </td>
                        <td className='repo-cell repo-cell-stats'> {repo.forks_count} </td>
                        <td className='repo-cell repo-cell-stats'> {repo.open_issues_count} </td>
                        <td className='repo-cell repo-cell-description'> {repo.description} </td>
                    </tr >
                );
            })
        );
    }

    render() {
        if (this.props.hasError) {
            return (
                <p className='error-text'>Sorry! There was an error loading the items</p>
            )
        }
        if (this.props.isLoading) {
            return (
                <div>
                    <img src={loading_icon} alt='loading' width='85px' height='85px' />
                    <p className='loading-text'>Loading…</p>
                </div>
            )
        }
        return (
            <div className='repos-main-container'>
                <table className='table-container' cellSpacing='0'>
                    <thead className='table-header'>
                        <tr>
                            <th className='header-cell'></th>
                            <th className='header-cell'>Name</th>
                            <th className='header-cell'>Url</th>
                            <th className='header-cell'>Stars</th>
                            <th className='header-cell'>Forks</th>
                            <th className='header-cell'>Issues</th>
                            <th className='header-cell'>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRepos()}
                    </tbody>
                </table>
                <div className='main-buttons-container'>
                    <button
                        className='buttons'
                        onClick={this.showPrevious}>
                        Previous
                    </button>
                    <div className='indexes'>
                        {this.state.startIndex + 1} / {this.state.startIndex + 20}
                    </div>
                    <button
                        className='buttons'
                        onClick={this.showNext}>
                        Next
                    </button>
                </div>
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        repos: state.repos,
        hasError: state.reposHaveError,
        isLoading: state.reposAreLoading
    };
};

export default connect(mapStateToProps, null)(RepoTable);