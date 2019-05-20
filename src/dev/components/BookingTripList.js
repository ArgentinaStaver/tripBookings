import React, { Component } from 'react';
import logo from '../../images/mirtransLogo.png';
import BusSeats from './BusSeats';
import SelectedTrip from './SelectedTrip';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import queryString from 'query-string';

class BookingTripList extends Component {
    constructor() {
       super();
       this.state = {
           selectedTripId: 0,
           selectedReturnTripId: 0,
           isTurTripConfirmed: true,
           isReturnTripConfirmed: true,
       };

       this.handleSelectionPlace = this.handleSelectionPlace.bind(this);
       this.handleConfirmation = this.handleConfirmation.bind(this);
       this.handleReturnSelectionSeat = this.handleReturnSelectionSeat.bind(this);
       this.handleReturnConfirmation = this.handleReturnConfirmation.bind(this);
    }

    componentDidMount() {
        const values = queryString.parse(this.props.location.search);
        const searchCriteria = {
            departure_city_id: values.departure,
            destination_city_id: values.destination,
            turDate: values.turDate,
            returnDate: values.returnDate,
            infants_nr: parseInt(values.infants) || 0,
            children_nr: parseInt(values.children) || 0,
            adults_nr: parseInt(values.adults) || 0,
            hasReturnTrip: values.returnDate ? true : false,
        }

        if (this.hasMinimumSearchCriteria(searchCriteria)) {
            this.props.fetchSearchParams(searchCriteria);
            this.fetchTrips(searchCriteria);
        }
    }

    hasMinimumSearchCriteria(searchCriteria) {
        return (
            searchCriteria.departure_city_id
            && searchCriteria.destination_city_id
            && searchCriteria.turDate
            && searchCriteria.adults_nr
        )
    }

    fetchTrips(searchCriteria) {
        this.props.fetchTurDataTrips(
            searchCriteria.departure_city_id,
            searchCriteria.destination_city_id,
            searchCriteria.turDate,
            1
        );
        this.props.fetchReturnDataTrips(
            searchCriteria.destination_city_id,
            searchCriteria.departure_city_id,
            searchCriteria.returnDate,
            1
        );
    }

    getSeatsSearchCriteria(trip, date) {
        return { trip_route_id: trip.route,
                trip_id_no: trip.trip_id_no,
                fleet_registration_id: '',
                fleet_type_id: 1,
                booking_date: date,
        };
    }

    handleSelectionPlace(trip, tripDate) {
        let criteria = this.getSeatsSearchCriteria(trip, tripDate);
        this.setState(state => ({
            selectedTripId: trip.trip_id_no
        }));
        this.props.fetchTripSeats(criteria);
        this.props.selectTurTrip(trip);
    }

    handleReturnSelectionSeat(returnTrip, ReturnTripDate) {
        let criteria = this.getSeatsSearchCriteria(returnTrip, ReturnTripDate);
        this.setState(state => ({
            selectedReturnTripId: returnTrip.trip_id_no
        }));
        this.props.fetchTripSeats(criteria);
        this.props.selectReturnTrip(returnTrip);
    }

    isSelectionComplete(selectedTrip) {
        return (this.props.searchCriteria.children_nr + this.props.searchCriteria.adults_nr)
            === selectedTrip.selectedSeats.length;
    }

    handleConfirmation(status) {
        this.setState(state => ({
            isTurTripConfirmed: status
        }));
        if (!status) {
            this.setState(state => ({
                selectedTripId: 0
            }));
        }
    }

    handleReturnConfirmation(status) {
        this.setState(state => ({
            isReturnTripConfirmed: status
        }));
        if (!status) {
            this.setState(state => ({
                selectedReturnTripId: 0
            }));
        }
    }

   render() {
       const turTrips = this.props.infoTrips.turTrip.length > 0;
       const returnTrips = this.props.infoTrips.returnTrip.length > 0;
       const displaySelectedInfo = this.isSelectionComplete(this.props.selectYourSeats.selectedTurTrip)
           && !this.state.isTurTripConfirmed;
       const displayReturnCardInfo = this.isSelectionComplete(this.props.selectYourSeats.selectedReturnTrip)
           && !this.state.isReturnTripConfirmed;

       return(

           <React.Fragment>
               <div className="col-sm-12">
               {
                   displaySelectedInfo &&
                   <SelectedTrip cancelTrip={this.handleConfirmation}
                                 trip={this.props.selectYourSeats.selectedTurTrip.trip}
                                 searchParams={this.props.searchCriteria}
                                 tripDate={this.props.searchCriteria.turDate}
                                 resetSelectedTripAction={this.props.resetSelectedTurTrip}
                   />
               }
               {
                   this.state.isTurTripConfirmed &&
                   <React.Fragment>
                       <div className="destination">
                           <i className="fas fa-bus bus-view"></i>
                           <span>
                               {
                                   turTrips &&
                                   this.props.infoTrips.turTrip[0].trip_route_name
                               }
                           </span>
                       </div>
                       {
                           this.props.infoTrips.turTrip.map((trip) =>
                               <React.Fragment>
                                   <div className="details">
                                       <div className="route-container">
                                           <div className="route-basic">
                                               <div className="duration">Direct {trip.duration} ore</div>
                                               <div className="time">
                                                   <div className="start-time"> {trip.start} </div>
                                                   <div className="car">
                                                       <hr className="horizontal-line" />
                                                       <img className="logo-bus" src={logo} alt={"logoPicture"} />
                                                   </div>
                                                   <div className="end-time">{trip.end}</div>
                                               </div>
                                               <div className="cities">
                                                   <span className="cities_departure">{trip.pickup_trip_location}</span>
                                                   <span className="cities_destination">{trip.drop_trip_location}</span>
                                               </div>
                                           </div>
                                           <div className="route-price">
                                               <div className="routes-table-price">De la {trip.price} lei</div>
                                               {
                                                   trip.trip_id_no !== this.state.selectedTripId &&
                                                       <div className="reserve-button"
                                                            onClick={() => this.handleSelectionPlace(trip, this.props.searchCriteria.turDate)}>
                                                           Rezerva
                                                       </div>
                                               }
                                               {
                                                   trip.trip_id_no === this.state.selectedTripId &&
                                                       <div className={"reserve-button" +
                                                           (this.isSelectionComplete(this.props.selectYourSeats.selectedTurTrip)
                                                               ? ""
                                                               : " inactive-button")}
                                                            onClick={() => this.handleConfirmation(false)}>
                                                           Confirma
                                                       </div>
                                               }
                                           </div>
                                       </div>
                                   </div>
                                   {
                                       trip.trip_id_no === this.state.selectedTripId &&
                                       <BusSeats
                                           fetchBusSeats={this.props.bookingSeats}
                                           selectedTrip={this.props.selectYourSeats.selectedTurTrip}
                                           selectASeatAction={this.props.selectTurSeat}
                                           removeASeatAction={this.props.removeSelectedTurSeat}
                                           searchParams={this.props.searchCriteria}
                                       />
                                   }
                               </React.Fragment>
                           )
                       }
                   </React.Fragment>
               }
               {
                   this.props.searchCriteria.hasReturnTrip &&
                   <React.Fragment>
                       {
                           displayReturnCardInfo &&
                            <SelectedTrip
                                cancelTrip={this.handleReturnConfirmation}
                                trip={this.props.selectYourSeats.selectedReturnTrip.trip}
                                resetSelectedTripAction={this.props.resetSelectedReturnTrip}
                                tripDate={this.props.searchCriteria.returnDate}
                                searchParams={this.props.searchCriteria}
                            />
                       }
                       {
                           this.state.isReturnTripConfirmed &&
                           <React.Fragment>
                               <div className="destination">
                                   <i className="fas fa-bus bus-view"></i>
                                   <span>
                                       { returnTrips &&
                                       this.props.infoTrips.returnTrip[0].trip_route_name
                                       }
                                    </span>
                               </div>
                               {
                                   this.props.infoTrips.returnTrip.map((returnTrip) =>
                                       <React.Fragment>
                                           <div className="details">
                                               <div className="route-container">
                                                   <div className="route-basic">
                                                       <div className="duration">Direct {returnTrip.duration} ore</div>
                                                       <div className="time">
                                                           <div className="start-time">{returnTrip.start}</div>
                                                           <div className="car">
                                                               <hr className="horizontal-line"/>
                                                               <img className="logo-bus" src={logo} alt={"logobus"}/>
                                                           </div>
                                                           <div className="end-time">{returnTrip.end}</div>
                                                       </div>
                                                       <div className="cities">
                                                           <span className="cities_departure">
                                                                {returnTrip.pickup_trip_location}
                                                           </span>
                                                           <span className="cities_destination">
                                                                {returnTrip.drop_trip_location}
                                                           </span>
                                                       </div>
                                                   </div>
                                                   <div className="route-price">
                                                       <div className="routes-table-price">{returnTrip.price} lei</div>
                                                       {
                                                           returnTrip.trip_id_no !== this.state.selectedReturnTripId &&
                                                           <div className="reserve-button"
                                                                onClick={() =>
                                                                    this.handleReturnSelectionSeat(returnTrip, this.props.searchCriteria.returnDate)}
                                                           >
                                                               Rezerva
                                                           </div>
                                                       }
                                                       {
                                                           returnTrip.trip_id_no === this.state.selectedReturnTripId &&
                                                           <div className={"reserve-button" +
                                                           (this.isSelectionComplete(this.props.selectYourSeats.selectedReturnTrip)
                                                               ? ""
                                                               : " inactive-button")}
                                                                onClick={() => this.handleReturnConfirmation(false)}
                                                           >
                                                               Confirma
                                                           </div>
                                                       }
                                                   </div>
                                               </div>
                                           </div>
                                           {
                                               returnTrip.trip_id_no === this.state.selectedReturnTripId &&
                                               <BusSeats
                                                   fetchBusSeats={this.props.bookingSeats}
                                                   selectedTrip={this.props.selectYourSeats.selectedReturnTrip}
                                                   selectASeatAction={this.props.selectReturnSeat}
                                                   searchParams={this.props.searchCriteria}
                                                   removeASeatAction={this.props.removeSelectedReturnSeat}
                                               />
                                           }
                                       </React.Fragment>
                                   )
                               }
                           </React.Fragment>
                       }
                   </React.Fragment>
               }
               {
                   ((this.props.searchCriteria.hasReturnTrip && displaySelectedInfo && displayReturnCardInfo) ||
                   (!this.props.searchCriteria.hasReturnTrip && displaySelectedInfo)) &&
                       <div className="about-selected-route">
                           <Link to="/dataUser">
                               <div className="reserve-button continue-button">
                                   Continua
                               </div>
                           </Link>
                       </div>
               }
               </div>
           </React.Fragment>
       )
   }
}

export default BookingTripList;
