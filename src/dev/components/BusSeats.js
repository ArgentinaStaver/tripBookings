import React, { Component } from 'react';
import { toast } from 'react-toastify';

class BusSeats extends Component {
    disabledClick() {
        return (this.props.searchParams.children_nr + this.props.searchParams.adults_nr) ===
            this.props.selectedTrip.selectedSeats.length;
    }

    addSeats(seatNumber) {
        const notify = () => toast.warn("Ati depasit numarul de locuri cautate!", {
            position: toast.POSITION.TOP_CENTER
        });
        this.disabledClick()
            ? notify()
            : this.props.selectASeatAction(seatNumber);
    }

    removeSeats(rSeatNumber) {
        this.props.removeASeatAction(rSeatNumber);
    }

    isSeatSelected(seat) {
        return this.props.selectedTrip.selectedSeats.indexOf(seat.seatNumber) >= 0
    }

    toggleSeatSelection(seat) {
        !this.isSeatSelected(seat)
            ? this.addSeats(seat.seatNumber)
            : this.removeSeats(seat.seatNumber);
    }

    render() {
        return(
            <div className="select-place">
                <div className="seats">
                    <div className="place-legend">
                        <div className="car-places">
                            <div className="free-place legend-place"></div>
                            <p className="disponibility-place">liber</p>
                        </div>
                        <div className="car-places">
                            <div className="booked-place legend-place"></div>
                            <p className="disponibility-place">ocupat</p>
                        </div>
                        <div className="car-places">
                            <div className="selected-seat legend-place"></div>
                            <p className="disponibility-place">indisponibil</p>
                        </div>
                    </div>
                    <div className="places">
                        {
                            this.props.fetchBusSeats.map((row) =>
                                <div className="row">
                                    {
                                        row.map((seat) =>
                                            <div className="col-xs-2">
                                                <div className="seat">
                                                    <div className={
                                                        "seat-body " +
                                                        (seat.status === 1
                                                            ? 'booked-place'
                                                            : this.isSeatSelected(seat)
                                                                ? 'selected-seat' : 'free-place')
                                                    }
                                                         onClick={() => {
                                                             seat.status === 2 && this.toggleSeatSelection(seat)}
                                                         }
                                                    >
                                                        {seat.seatNumber}
                                                        <span className="seat-handle-left"></span>
                                                        <span className="seat-handle-right"></span>
                                                        <span className="seat-handle-bottom"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default BusSeats;