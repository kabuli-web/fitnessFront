import { createStore } from "redux";
import reducers from "./reducers";
const initialState = {
    user : {
        type: "anonymouse",
        username:"anonymouse"
    }
}
const store = createStore(
    reducers,
    initialState
)

export default store;