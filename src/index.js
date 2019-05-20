import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import tripsReducer from './dev/reducers/searchResult';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CustomerData from "./dev/containers/PassengerData";
import DisplayTrips from "./dev/containers/TripInfo";
import ValidateTripSelection from "./dev/containers/ConfirmTripSelection";

const store = createStore(
    tripsReducer,
    compose(
        applyMiddleware(thunkMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);
const BASE_PATH = '/';
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div className="container font">
                <div className="row">
                    <Route path={BASE_PATH} exact component={DisplayTrips} />
                    <Route path="/dataUser" component={CustomerData} />
                    <Route path="/validatedData" component={ValidateTripSelection} />
                </div>
            </div>
            <ToastContainer />
        </Router>
    </Provider>,
    document.getElementById('root_booking_app')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
