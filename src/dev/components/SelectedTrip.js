import React, { Component } from 'react';
import logo from '../../images/mirtransLogo.png';
import getFullDateFormat from '../utils/dateFormater';
import { calculateTripCost } from '../utils/booking';

class SelectedTrip extends Component {
    removeSelectionCard() {
        this.props.cancelTrip(true);
        this.props.resetSelectedTripAction();
    }

    getTripCost() {
        return calculateTripCost({
            adultsNr: this.props.searchParams.adults_nr,
            adultPrice: this.props.trip.price,
            childrenNr: this.props.searchParams.children_nr,
            childrenPrice: this.props.trip.children_price,
        });
    }

    render() {
        return(
            <div className="about-selected-route">
                <div className="header-selected">
                    <i className="fas fa-check-circle icon-view"></i>
                    <span>Ruta selectata</span>
                </div>
                <div className="selected-route">
                    <div className="selected-route-title">
                        <div className="route-header-details">
                            <i className="fas fa-bus bus-view"></i>
                            <span className="details-cities">{this.props.trip.trip_route_name}</span>
                            <span className="details-time">{getFullDateFormat(this.props.tripDate)}</span>
                        </div>
                        <a href="#" className="change-route">
                            <i className="fas fa-pencil-alt pencil-view"></i>
                            <span onClick={() => this.removeSelectionCard()}>Shimba ruta</span>
                        </a>
                    </div>
                    <div className="info-selected-route">
                        <div className="circle-tick">
                            <i className="fas fa-check-circle circle-view"></i>
                            <span className="route-label">Selectat</span>
                        </div>
                        <div className="selected-route-content">
                            <div className="fare-selected">MIRTRANS</div>
                            <div className="route-information">
                                <div className="duration">Direct {this.props.trip.duration} ore</div>
                                <div className="time">
                                    <div className="start-time">{this.props.trip.start}</div>
                                    <div className="car">
                                        <hr className="horizontal-line" />
                                            <img className="logo-bus" src={logo} alt={"logoBus"} />
                                    </div>
                                    <div className="end-time">{this.props.trip.end}</div>
                                </div>
                                <div className="cities">
                                    <span className="cities_departure">{this.props.trip.pickup_trip_location}</span>
                                    <span className="cities_destination">{this.props.trip.drop_trip_location}</span>
                                </div>
                            </div>
                            <div className="route-selected-price">
                                <span className="route-price-total">Suma totala</span>
                                <span className="total-cost">{this.getTripCost()} lei</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SelectedTrip;
