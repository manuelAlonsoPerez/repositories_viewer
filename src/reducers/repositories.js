import {
    REPOS_HAVE_ERROR,
    REPOS_ARE_LOADING,
    REPOS_FETCH_DATA_SUCCESS,
} from '../actions/repositories';

export function reposHaveError(state = false, action) {
    switch (action.type) {
        case REPOS_HAVE_ERROR:
            return action.hasError;
        default:
            return state;
    }
}

export function reposAreLoading(state = false, action) {
    switch (action.type) {
        case REPOS_ARE_LOADING:
            return action.isLoading;
        default:
            return state;
    }
}

export function repos(state = [], action) {
    switch (action.type) {
        case REPOS_FETCH_DATA_SUCCESS:
            return [...action.payload];
        default:
            return state;
    }
}

