import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};
let store;

if(process.env.NODE_ENV === "development") {
  store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  );
}
else {
  store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(thunk))
  );
}

export default store;