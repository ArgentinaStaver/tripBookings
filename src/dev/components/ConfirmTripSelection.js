import React, { Component } from 'react';
import payments from '../../images/payments.jpg';
import { calculateTripCost } from '../utils/booking';
import { Link } from 'react-router-dom';
import Button from './Button';

class ConfirmTripSelection extends Component {
    getTurTripCost() {
        return calculateTripCost({
            adultsNr: this.props.searchParams.adults_nr,
            adultPrice: this.props.selectedTrip.selectedTurTrip.trip.price,
            childrenNr: this.props.searchParams.children_nr,
            childrenPrice: this.props.selectedTrip.selectedTurTrip.trip.children_price,
        });
    }

    getReturTripCost() {
        return calculateTripCost({
            adultsNr: this.props.searchParams.adults_nr,
            adultPrice: this.props.selectedTrip.selectedReturnTrip.trip.price,
            childrenNr: this.props.searchParams.children_nr,
            childrenPrice:  this.props.selectedTrip.selectedReturnTrip.trip.children_price,
        });
    }

    render() {
        return(
          <div className="validation col-sm-12">
            <div className="row">
              <div className="offset-sm-2 col-sm-8">
                  <h2>Datele introduse de tine sunt validate</h2>
              </div>
            </div>
            <div className="row">
                  <div className="offset-sm-2 col-sm-8">
                    <div className="about-reservation header">
                        <div className="info-header">Numar Pasageri</div>
                        <div className="info-header">Data si ora</div>
                        <div className="info-header">Pret</div>
                        <div className="info-header">Cursa</div>
                    </div>
                  </div>
                  <div className="offset-sm-2 col-sm-8">
                      <div className="about-reservation body">
                          <div className="reservation-passengers">
                                <div>Adulti - {this.props.searchParams.adults_nr}</div>
                                <div>Copil 2-7 ani - {this.props.searchParams.children_nr}</div>
                                <div>Copil 0-2 ani - {this.props.searchParams.infants_nr}</div>
                          </div>
                          <div className="reservation-details">
                                <div className="tur">
                                      <div className="info-text">
                                      {this.props.searchParams.turDate}, ora {this.props.selectedTrip.selectedTurTrip.trip.start}
                                      </div>
                                      <div className="info-text">{this.getTurTripCost()} ron</div>
                                      <div className="info-text">
                                        {this.props.selectedTrip.selectedTurTrip.trip.trip_route_name}
                                        <br />
                                         TUR
                                      </div>
                                </div>
                                {
                                    this.props.searchParams.hasReturnTrip &&
                                    <div className="retur">
                                          <div className="info-text">
                                          {this.props.searchParams.returnDate}, ora {this.props.selectedTrip.selectedReturnTrip.trip.start}
                                          </div>
                                          <div className="info-text">{this.getReturTripCost()} lei</div>
                                          <div className="info-text">
                                            {this.props.selectedTrip.selectedReturnTrip.trip.trip_route_name}
                                            <br />
                                            RETUR
                                          </div>
                                    </div>
                                }
                          </div>
                      </div>
                  </div>
            </div>
            <div className="row">
              <div className="offset-sm-2 col-sm-8 payments-type">
                <a href="https://www.mobilpay.ro/" target="_blank">
                  <img  src={payments}/>
                </a>
              </div>
              <div className="offset-sm-2 col-sm-8">
                <h3>Pentru a finaliza efectuati plata</h3>
                <div className="goPayment">
                    <Link to="/">
                        <Button
                            name="Anuleaza"
                            iconPosition=""
                            isActive={true}
                            icon=""
                            action={() => {}}
                        />
                    </Link>
                    <Link to="/" onClick={e => e.preventDefault()}>
                        <Button
                            name="Plateste"
                            iconPosition=""
                            isActive={true}
                            icon=""
                            action={() => {}}
                        />
                    </Link>
                </div>
              </div>
            </div>
          </div>
        );
        }
    }

export default ConfirmTripSelection;
