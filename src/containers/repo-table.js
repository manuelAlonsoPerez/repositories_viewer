import React, { Component } from 'react';
import { connect } from 'react-redux';

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
        this.renderRepos = this.renderRepos.bind(this);
        this.showPrevious = this.showPrevious.bind(this);
        this.showNext = this.showNext.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.repos !== this.props.repos) {
            this.sliceRepos();
        }
        if (prevState.startIndex !== this.state.startIndex) {
            this.sliceRepos();
        }
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

    renderRepos() {
        return (
            this.state.reposToRender.map((repo) => {
                return (
                    <tr key={repo.id}>
                        <th className='repo-cell'>
                            <img src={repo.owner.avatar_url} alt={repo.full_name} width='25px' height='25px' />
                        </th>
                        <th className='repo-cell'>{repo.full_name}</th>
                        <th className='repo-cell' width='50px'>
                            <a href={repo.html_url} target='_blank'>url</a>
                        </th>
                        <th className='repo-cell' >{repo.stargazers_count}</th>
                        <th className='repo-cell'>{repo.forks_count}</th>
                        <th className='repo-cell'>{repo.open_issues_count}</th>
                        <th className='repo-cell repo-cell-description'>{repo.description}</th>
                    </tr >
                );
            })
        );
    }

    render() {
        if (this.props.hasError) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (this.props.isLoading) {
            return <p style={{ textAlign: 'center' }}>Loading…</p>;
        }

        if (!this.props.repos) {
            return (
                <div> loading...</div>
            );
        }

        return (
            <div className='main-container'>
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