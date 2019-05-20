import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { personTypes } from '../utils/enumerations';
import TicketsInfo from './TicketsInfo';
import Billing from './Billing';
import Button from './Button';

class Passengers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            passengers: [],
            kindOfPerson: personTypes.PERSON,
            isChecked: false,
            isBillingDataValid: false,
            isPassenegerDataValid: false,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.saveCustomerData = this.saveCustomerData.bind(this);
        this.handleTypeOfPerson = this.handleTypeOfPerson.bind(this);
        this.useFirstPassengerData = this.useFirstPassengerData.bind(this);
        this.clearFirstPassengerData = this.clearFirstPassengerData.bind(this);
        this.checkPersonBillingData = this.checkPersonBillingData.bind(this);
        this.checkCompanyBillingData = this.checkCompanyBillingData.bind(this);
        this.handleBillingInput = this.handleBillingInput.bind(this);
        this.validateBillingData = this.validateBillingData.bind(this);
        this.validatePassengersData = this.validatePassengersData.bind(this);
        this.showErrorNotification = this.showErrorNotification.bind(this);
        this.showPassengerNotification = this.showPassengerNotification.bind(this);
    }

    componentDidMount() {
        this.initializePassengersForm();
    }

    initializePassengersForm() {
        const {infants_nr, children_nr, adults_nr} = this.props.searchParams;
        const initialLocalState = {
            nrOfPassengers: infants_nr + children_nr + adults_nr,
            passengers: []
        };
        for (let i = 0; i < initialLocalState.nrOfPassengers; i++) {
            initialLocalState.passengers[i] = {
                lastName: '',
                firstName: '',
                phone: '',
                email: '',
            }
        }
        this.setState(initialLocalState);
    }

    handleInputChange(event, index) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        const state = this.state;
        state.passengers[index][name] = value;

        this.setState(state);

        this.validatePassengersData();
    }

    handleBillingInput(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if (this.state.kindOfPerson === personTypes.PERSON) {
          const { person } = this.props.invoice;
          person[name] = value;

          this.props.addPersonBillingData(person);
        }

        if (this.state.kindOfPerson === personTypes.COMPANY) {
          const { company } = this.props.invoice;
          company[name] = value;

          this.props.addCompanyBillingData(company);
        }

        this.validateBillingData();
    }

    saveCustomerData() {
        this.props.addUserData({
            passengers: this.state.passengers,
        });
    }

    handleTypeOfPerson(event) {
      this.props.setTypeOfPerson(event.target.value);
      this.setState({
          kindOfPerson: event.target.value,
      });
    }

    useFirstPassengerData() {
      const { isChecked } = this.state;

      this.props.useFirstPassengerData(this.state.passengers[0]);
      this.setState({
        isChecked: !isChecked,
      });

      if (isChecked) {
        this.clearFirstPassengerData();
      }
    }

    clearFirstPassengerData() {
        this.props.useFirstPassengerData({
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
        });
    }

    checkPersonBillingData() {
        const personBillingValidation = ['lastName', 'firstName', 'phone', 'email', 'address', 'city', 'district', 'postalCode', 'country'];
        const isValid = personBillingValidation.every( formInput => this.props.invoice.person[formInput].length >= 3);

        return isValid;
    }

    checkCompanyBillingData() {
        const companyBillingValidation = ['companyName', 'bank', 'account', 'fiscalCode', 'tradeRegisterNo', 'address', 'city', 'district', 'postalCode', 'country'];
        const isValid = companyBillingValidation.every(formInput => this.props.invoice.company[formInput].length >= 3);

        return isValid;
    }

    validateBillingData() {
        const isValid = (this.state.kindOfPerson === personTypes.PERSON) ? this.checkPersonBillingData() : this.checkCompanyBillingData();
        this.setState({
            isBillingDataValid: isValid,
        });

        return isValid;
    }

     showErrorNotification() {
         (this.state.kindOfPerson === personTypes.PERSON) ? toast.error('Date bancare PF *') : toast.error('Completeaza datele pt PJ*')
     }

     showPassengerNotification() {
         toast.error('Completeaza datele pasagerilor marcate cu *');
     }

     validatePassengersData() {
        const firstPassengerValidation = ['lastName', 'firstName', 'phone', 'email'];
        const passengersValidation = ['lastName', 'firstName'];
        let isValid = true;

        const errors = this.state.passengers.filter( (passenger, index) => {
            const arr = index === 0 ? firstPassengerValidation : passengersValidation;

            return !arr.every(key => passenger[key].length >= 3);
        });

        isValid = errors.length === 0;
        this.setState({
            isPassenegerDataValid: isValid,
        });

        return isValid;
    }

    render() {
        return(
            <div className="col-sm-10  offset-sm-1">
                <TicketsInfo
                  handleInputChange={this.handleInputChange}
                  passengers={this.state.passengers}
                />
                <Billing
                  kindOfPerson={this.state.kindOfPerson}
                  billingData={this.props.invoice}
                  handleTypeOfPerson={this.handleTypeOfPerson}
                  useFirstPassengerData={this.useFirstPassengerData}
                  handleBillingInput={this.handleBillingInput}
                  saveBillingData={this.saveBillingData}
                />
                <div className="navigation-buttons">
                    <Link to="/">
                        <Button
                            name="Inapoi"
                            iconPosition="left"
                            isActive={true}
                            icon="fas fa-chevron-left arrow"
                            action={() => {}}
                        />
                    </Link>
                    <Link to="/validatedData" onClick={e => {
                        if(!this.state.isBillingDataValid) {
                            e.preventDefault();
                            this.showErrorNotification();
                        }
                        if(!this.state.isPassenegerDataValid) {
                            e.preventDefault();
                            this.showPassengerNotification();
                        }
                     }}
                    >
                        <Button
                            name="Continua"
                            iconPosition="right"
                            isActive={this.state.isBillingDataValid && this.state.isPassenegerDataValid}
                            icon="fas fa-chevron-right arrow"
                            action={ () =>  this.saveCustomerData()}
                        />
                    </Link>
                </div>
            </div>
        );
    }
}

export default Passengers;
