import axios from 'axios';

export const REPOS_HAVE_ERROR = 'REPOS_HAVE_ERROR';
export const REPOS_ARE_LOADING = 'REPOS_ARE_LOADING';
export const REPOS_FETCH_DATA_SUCCESS = 'REPOS_FETCH_DATA_SUCCESS';

export function reposHaveError(bool) {
    return {
        type: REPOS_HAVE_ERROR,
        hasError: bool
    };
}

export function reposAreLoading(bool) {
    return {
        type: REPOS_ARE_LOADING,
        isLoading: bool
    };
}

export function reposFetchDataSuccess(repos) {
    return {
        type: REPOS_FETCH_DATA_SUCCESS,
        payload: repos
    };
}

export function reposFetchData(url) {
    return (dispatch) => {
        dispatch(reposAreLoading(true));

        axios.get(url)
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }

                dispatch(reposAreLoading(false));
                return response;
            })
            .then((response) => dispatch(reposFetchDataSuccess(response.data.items)))
            .catch(() => dispatch(reposHaveError(true)));
    };
}


