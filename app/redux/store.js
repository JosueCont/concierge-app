import {createStore, combineReducers, compose, applyMiddleware} from "redux"
import userReducer,{saveSessionAction} from './userDuck';
import thunk from "redux-thunk"

const rootReducer = combineReducers({
    user:userReducer,
})

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

export default () => {
    // Initial load app data
    saveSessionAction()(store.dispatch)
    return store
}