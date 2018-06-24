import { combineReducers } from 'redux';
import { reposHaveError, reposAreLoading, repos } from './repositories';

export default combineReducers({
    reposHaveError,
    reposAreLoading,
    repos
});

