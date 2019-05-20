import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreatorSearchResult';
import Passengers from '../components/Passengers';

function mapStateToProps(state) {
    return {
        passengers: state.passengers,
        searchParams: state.searchParams,
        invoice: state.invoice
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const CustomerData = connect(mapStateToProps, mapDispatchToProps)(Passengers);

export default CustomerData;
