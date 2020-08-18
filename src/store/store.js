import { createStore, applyMiddleware} from "redux";
import reducer from "./reducer";
//import { Provider } from "react-redux";
import initialState from "./initialState";
import thunk from "redux-thunk";

const store = createStore(reducer, initialState, applyMiddleware(thunk));
export default store
//export default props => <Provider store={store} {...props} />;
//export default createStore(reducer, initialState, applyMiddleware(thunk));