import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export default function configureStore(initialState) {

    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                // options like actionSanitizer, stateSanitizer
            }) : compose;

    const enhancer = composeEnhancers(
        applyMiddleware(thunk)
    );

    return createStore(
        rootReducer,
        initialState,
        enhancer
    );
}
