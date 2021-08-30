import {createStore, applyMiddleware} from "redux";
import rootR from "../reducers/reducers";
import  {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

const store = createStore(
    rootR,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;
