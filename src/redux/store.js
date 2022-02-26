import { createStore } from "redux";
import UserServices from "../LocalStorageServices/UserServices";
import reducers from "./reducers";
const initialState = {
    user : UserServices.getUserData()
}
const store = createStore(
    reducers,
    initialState
)

export default store;