import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreatorSearchResult';
import BookingTripList from '../components/BookingTripList';

function  mapStateToProps(state) {
    return {
        infoTrips: state.searchResult,
        searchCriteria: state.searchParams,
        bookingSeats: state.bookingTripSeats,
        selectYourSeats: state.selectedTrip
    }
}

function mapDisaptchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const DisplayTrips = connect(mapStateToProps, mapDisaptchToProps)(BookingTripList);

export default DisplayTrips;