// import rootReducer from '../reducers';
import axios from 'axios';
import {} from "redux-axios-middleware";
import {} from "redux";
// import {} from "../actions/auth";



const axiosClients = {
    default:{
        client: axios.create({
            baseUrl: 'http://localhost:5000',
            responseType: 'json',
        }),
    },
};


const composeEnhancers = compose;
const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddlware(
            multiClientMiddleware(axiosClients, {
                getRequestOptions: (action) => {
                    // action.payload.request.headers = action.payload.request.headers || {};
                    // action.payload.request.headers["Access-Control-Allow-Origin"] ="*";

                    // if(UNAUTHORIZED_ACTION_TYPES.indexOf(action.type) === -1 && sessionStorage.token !== "undefined"){
                    //     action.payload.request.headers["Access-Control-Allow-Origin"] = `Bearer ${sessionStorage.token}`;
                    // }


                    return action
                }
            })
        )
    )

)