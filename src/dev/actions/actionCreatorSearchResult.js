import BookingAPIs from '../api/BookingAPIs';

export const ADD_TUR_DATA_TRIP = 'ADD_TUR_DATA_TRIP';
export const ADD_RETURN_DATA_TRIP = 'ADD_RETURN_DATA_TRIP';
export const FETCH_SEATS = 'FETCH_SEATS';
export const ADD_TUR_TRIP = 'ADD_TUR_TRIP';
export const ADD_RETURN_TRIP = 'ADD_RETURN_TRIP';
export const ADD_TUR_SEAT = 'ADD_TUR_SEAT';
export const ADD_RETURN_SEAT = 'ADD_RETURN_SEAT';
export const REMOVE_SELECTED_TUR_SEAT = 'REMOVE_SELECTED_TUR_SEAT';
export const REMOVE_SELECTED_RETURN_SEAT = 'REMOVE_SELECTED_RETURN_SEAT';
export const RESET_SELECTED_TUR_TRIP = 'RESET_SELECTED_TUR_TRIP';
export const RESET_SELECTED_RETURN_TRIP = 'RESET_SELECTED_RETURN_TRIP';
export const ADD_USER_DATA = 'ADD_USER_DATA';
export const ADD_PERSON_BILLING_DATA = 'ADD_PERSON_BILLING_DATA';
export const ADD_COMPANY_BILLING_DATA = 'ADD_COMPANY_BILLING_DATA';
export const SET_TYPE_OF_PERSON = 'SET_TYPE_OF_PERSON';
export const USE_FIRST_PASSNEGER_DATA = 'USE_FIRST_PASSNEGER_DATA';
export const READ_SEARCH_PARAMS = 'READ_SEARCH_PARAMS';


export function fetchSearchParams(queryParams) {
    return function(dispatch) {        
        dispatch({
            type: READ_SEARCH_PARAMS,
            payload: queryParams,
        })
    }
}

export function fetchTurDataTrips(start_id, end_id, chosen_date, fleet) {
    return function(dispatch) {
        return BookingAPIs.getTripList(start_id, end_id, chosen_date, fleet).then(response => {
            dispatch({
                type: ADD_TUR_DATA_TRIP,
                payload: response,
            });
        }).catch(error => {
            throw(error);
        });
    }
}

export function fetchReturnDataTrips(end_id, start_id, chosen_date, fleet) {
    return function(dispatch) {
        return BookingAPIs.getTripList(end_id, start_id, chosen_date, fleet).then(response => {
            dispatch({
                type: ADD_RETURN_DATA_TRIP,
                payload: response,
            });
        }).catch(error => {
            throw(error);
        });
    }
}

export function fetchTripSeats(params) {
    return function(dispatch) {
        return BookingAPIs.getTripSeatsApi(params).then(response => {
            dispatch({
                type: FETCH_SEATS,
                payload: response,
            });
        }).catch(error => {
            throw(error);
        });
    }
}

export function selectTurTrip(details) {
    return function (dispatch) {
        dispatch({
            type: ADD_TUR_TRIP,
            payload: details,
        });
    }
}

export function selectReturnTrip(returnDetails) {
    return function (dispatch) {
        dispatch({
          type: ADD_RETURN_TRIP,
          payload: returnDetails,
        });
    }
}

export function selectTurSeat(seatNumber) {
    return function (dispatch) {
        dispatch({
           type: ADD_TUR_SEAT,
            payload: seatNumber,
        });
    }
}

export function selectReturnSeat(returnSeatNumber) {
    return function (dispatch) {
        dispatch({
           type: ADD_RETURN_SEAT,
           payload: returnSeatNumber,
        });
    }
}

export function removeSelectedTurSeat(seatNumber) {
    return function (dispatch) {
        dispatch({
           type: REMOVE_SELECTED_TUR_SEAT,
           payload: seatNumber,
        });
    }
}

export function removeSelectedReturnSeat(returnSeatNumber) {
    return function (dispatch) {
        dispatch({
            type: REMOVE_SELECTED_RETURN_SEAT,
            payload: returnSeatNumber,
        });
    }
}

export function resetSelectedTurTrip() {
    return function (dispatch) {
        dispatch({
            type: RESET_SELECTED_TUR_TRIP,
        });
    }
}

export function resetSelectedReturnTrip() {
    return function (dispatch) {
        dispatch({
            type: RESET_SELECTED_RETURN_TRIP
        });
    }
}

export function addUserData(info) {
    return function (dispatch) {
        dispatch({
            type: ADD_USER_DATA,
            payload: info
        });
    }
}

export function useFirstPassengerData(data) {
  return function (dispatch) {
      dispatch({
        type: USE_FIRST_PASSNEGER_DATA,
        payload: data
      });
  }
}

export function addPersonBillingData(data) {
    return function(dispatch) {
        dispatch({
            type: ADD_PERSON_BILLING_DATA,
            payload: data
        })
    }
}

export function addCompanyBillingData(data) {
  return function(dispatch) {
      dispatch({
          type: ADD_COMPANY_BILLING_DATA,
          payload: data
      })
  }
}

export function setTypeOfPerson(personType) {
  return function(dispatch) {
    dispatch({
      type: SET_TYPE_OF_PERSON,
      payload: personType
    })
  }
}
