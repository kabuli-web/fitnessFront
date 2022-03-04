import { createStore,applyMiddleware } from "redux";
import UserServices from "../LocalStorageServices/UserServices";
import thunkMiddleware from "redux-thunk";
import reducers from "./reducers";
const initialState = {
    user : UserServices.getUserData()
}
const store = createStore(
    reducers,
    initialState,
    applyMiddleware(thunkMiddleware)
);

export default store;