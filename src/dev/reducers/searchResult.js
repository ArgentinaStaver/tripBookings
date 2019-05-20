import { personTypes } from '../utils/enumerations';
import { ADD_TUR_DATA_TRIP, ADD_RETURN_DATA_TRIP,
    FETCH_SEATS, ADD_TUR_TRIP, ADD_RETURN_TRIP,
    ADD_TUR_SEAT, ADD_RETURN_SEAT, READ_SEARCH_PARAMS,
    REMOVE_SELECTED_TUR_SEAT, REMOVE_SELECTED_RETURN_SEAT,
    RESET_SELECTED_TUR_TRIP, RESET_SELECTED_RETURN_TRIP,
    ADD_USER_DATA, SET_TYPE_OF_PERSON, ADD_PERSON_BILLING_DATA,
     ADD_COMPANY_BILLING_DATA, USE_FIRST_PASSNEGER_DATA } from '../actions/actionCreatorSearchResult';

const initialState = {
    searchParams: {
        departure_city_id: null,
        destination_city_id: null,
        turDate: null,
        returnDate: null,
        infants_nr: 0,
        children_nr: 0,
        adults_nr: 0,
        hasReturnTrip: null,
    },
    searchResult: {
        turTrip: [],
        returnTrip: []
    },
    selectedTrip: {
        selectedTurTrip: {
            trip: {},
            selectedSeats: []
        },
        selectedReturnTrip: {
            trip: {},
            selectedSeats: []
        }
    },
    bookingTripSeats: [],
    passengers: [],
    invoice: {
        personType: personTypes.PERSON,
        person: {
          lastName: "",
          firstName: "",
          phone: "",
          email: "",
          address: "",
          city: "",
          district: "",
          postalCode: "",
          country: "",
          otherInfo: "",
        },
        company: {
          companyName: "",
          bank: "",
          account: "",
          fiscalCode: "",
          tradeRegisterNo: "",
          address: "",
          city: "",
          district: "",
          postalCode: "",
          country: "",
          otherInfo: "",
        },
    },
};

const tripsReducer = (state= initialState, action) => {
    switch (action.type)  {
        case READ_SEARCH_PARAMS:
            return {
                ...state,
                searchParams: action.payload,
            };
        case ADD_TUR_DATA_TRIP:
            return {
                ...state,
                searchResult: {
                    turTrip: action.payload,
                    returnTrip: state.searchResult.returnTrip
                }
            };
        case ADD_RETURN_DATA_TRIP:
            return {
                ...state,
                searchResult: {
                    turTrip: state.searchResult.turTrip,
                    returnTrip: action.payload
                }
            };
        case FETCH_SEATS:
            return {
                ...state,
                bookingTripSeats: action.payload
            };
        case ADD_TUR_TRIP:
            return {
                ...state,
                selectedTrip: {
                    selectedTurTrip: {
                        trip: action.payload,
                        selectedSeats: []
                    },
                    selectedReturnTrip: state.selectedTrip.selectedReturnTrip
                }
            };
        case ADD_RETURN_TRIP:
            return {
                ...state,
                selectedTrip: {
                    selectedTurTrip: state.selectedTrip.selectedTurTrip,
                    selectedReturnTrip: {
                        trip: action.payload,
                        selectedSeats: []
                    }
                }
            };
        case ADD_TUR_SEAT:
            return {
                ...state,
                selectedTrip: {
                    selectedTurTrip: {
                        trip: state.selectedTrip.selectedTurTrip.trip,
                        selectedSeats: [...state.selectedTrip.selectedTurTrip.selectedSeats, action.payload],
                    },
                    selectedReturnTrip: state.selectedTrip.selectedReturnTrip
                }
            };
        case ADD_RETURN_SEAT:
            return {
                ...state,
                selectedTrip: {
                    selectedTurTrip: state.selectedTrip.selectedTurTrip,
                    selectedReturnTrip: {
                        trip: state.selectedTrip.selectedReturnTrip.trip,
                        selectedSeats: [...state.selectedTrip.selectedReturnTrip.selectedSeats, action.payload]
                    }
                }
            };
        case REMOVE_SELECTED_TUR_SEAT:
            let index = state.selectedTrip.selectedTurTrip.selectedSeats.indexOf(action.payload);
            let seatsNumber = state.selectedTrip.selectedTurTrip.selectedSeats.length;
            return {
                ...state,
                selectedTrip: {
                    selectedTurTrip: {
                        trip: state.selectedTrip.selectedTurTrip.trip,
                        selectedSeats: [
                            ...state.selectedTrip.selectedTurTrip.selectedSeats.slice(0, index),
                            ...state.selectedTrip.selectedTurTrip.selectedSeats.slice(index + 1, seatsNumber + 1)
                        ]
                    },
                    selectedReturnTrip: state.selectedTrip.selectedReturnTrip
                }
            };
        case REMOVE_SELECTED_RETURN_SEAT:
            let indexReturn = state.selectedTrip.selectedReturnTrip.selectedSeats.indexOf(action.payload);
            let seatsReturnNumber = state.selectedTrip.selectedReturnTrip.selectedSeats.length;
            return {
                ...state,
                selectedTrip: {
                    selectedTurTrip: state.selectedTrip.selectedTurTrip,
                    selectedReturnTrip: {
                        trip: state.selectedTrip.selectedReturnTrip.trip,
                        selectedSeats: [
                            ...state.selectedTrip.selectedReturnTrip.selectedSeats.slice(0, indexReturn),
                            ...state.selectedTrip.selectedReturnTrip.selectedSeats.slice(indexReturn +1, seatsReturnNumber +1)
                        ]
                    }
                }
            };
        case RESET_SELECTED_TUR_TRIP:
            return {
                ...state,
                selectedTrip: {
                    selectedTurTrip: {
                        trip: {},
                        selectedSeats: [],
                    },
                    selectedReturnTrip: state.selectedTrip.selectedReturnTrip,
                }
            };
        case RESET_SELECTED_RETURN_TRIP:
            return {
                ...state,
                selectedTrip: {
                    selectedTurTrip: state.selectedTrip.selectedTurTrip,
                    selectedReturnTrip: {
                        trip: {},
                        selectedSeats: [],
                    },
                },
            };
        case ADD_USER_DATA:
            return {
                ...state,
                passengers: [
                    action.payload
                ],
            };
        case USE_FIRST_PASSNEGER_DATA:
          return {
            ...state,
            invoice: {
              ...state.invoice,
              person: {...state.invoice.person, ...action.payload},
            }
          };
        case ADD_PERSON_BILLING_DATA:
            return {
                ...state,
                invoice: { ...state.invoice, person: action.payload }
            };
        case ADD_COMPANY_BILLING_DATA:
        return {
          ...state,
          invoice: { ...state.invoice, company: action.payload }
        };
        case SET_TYPE_OF_PERSON:
          return {
            ...state,
            invoice: {
              personType: action.payload,
              person: state.invoice.person,
              company: state.invoice.company
            },
        };
        default:
            return state;
    }
};

export default tripsReducer;
