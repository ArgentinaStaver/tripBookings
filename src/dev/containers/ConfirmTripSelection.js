import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreatorSearchResult';
import ConfirmTripSelection from '../components/ConfirmTripSelection';

function mapStateToProps(state) {
  return {
     searchParams: state.searchParams,
     selectedTrip: state.selectedTrip,
  }
}


const ValidateTripSelection = connect(mapStateToProps)(ConfirmTripSelection);

export default ValidateTripSelection;
