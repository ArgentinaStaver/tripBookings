import React, { Component } from 'react';
import { personTypes } from '../utils/enumerations';

class Billing extends Component {
  render() {    
    return(
      <div className="row personal-data">
          <div className="col-sm-12 header">
              <i className="fas fa-file-invoice people-icon"></i>
              <h2>Date facturare</h2>
          </div>
          <div className="col-sm-12">
            <div className="row body-data">
              <div className="col-sm-12">
              <label className="radio-view">
                  <input type="radio"
                         checked={this.props.kindOfPerson === personTypes.PERSON}
                         name="typeOfPerson"
                         value={personTypes.PERSON}
                         onChange={this.props.handleTypeOfPerson}
                  />
                  Persoana fizica
              </label>
              <label className="radio-view">
                  <input type="radio"
                         checked={this.props.kindOfPerson === personTypes.COMPANY}
                         name="typeOfPerson"
                         value={personTypes.COMPANY}
                         onChange={this.props.handleTypeOfPerson}
                  />
                  Persoana juridica
              </label>
              {
                !(this.props.kindOfPerson === personTypes.COMPANY) &&
                <div>
                    <label className="radio-view">
                        <input type="checkbox"
                               onChange={this.props.useFirstPassengerData}
                        />
                        Foloseste datele primului pasager
                    </label>
                </div>
              }
          </div>
        </div>
        <div className="col-sm-12 horizontal-line-data">
            <hr className="grey-line"/>
        </div>
      </div>
          <div className="col-sm-12">
              {
                  this.props.kindOfPerson === personTypes.PERSON &&
                    <div className="row body-data">
                      <div className="col-md-3 col-sm-6 col-sm-12">
                          <div className="form-group">
                              <label htmlFor="exampleInputPassword1">Nume*</label>
                              <input type="text" className="form-control"
                                     placeholder="nume..."
                                     name="lastName"
                                     value={this.props.billingData.person.lastName}
                                     onChange={(event) => this.props.handleBillingInput(event)}
                              />
                          </div>
                      </div>
                      <div className="col-md-3 col-sm-6 col-sm-12">
                          <div className="form-group">
                              <label htmlFor="exampleInputPassword1">Prenume*</label>
                              <input type="text" className="form-control"
                                     placeholder="prenume..."
                                     name="firstName"
                                     value={this.props.billingData.person.firstName}
                                     onChange={(event) => this.props.handleBillingInput(event)}
                              />
                          </div>
                      </div>
                      <div className="col-md-3 col-sm-6 col-sm-12">
                          <div className="form-group">
                              <label htmlFor="exampleInputPassword1">Telefon*</label>
                              <input type="text" className="form-control"
                                     placeholder="numar telefon..."
                                     name="phone"
                                     datacommon="true"
                                     value={this.props.billingData.person.phone}
                                     onChange={(event) => this.props.handleBillingInput(event)}
                               />
                          </div>
                      </div>
                      <div className="col-md-3 col-sm-6 col-sm-12">
                          <div className="form-group">
                              <label htmlFor="exampleInputPassword1">Email*</label>
                              <input type="email" className="form-control"
                                     placeholder="adresa de email..."
                                     name="email"
                                     value={this.props.billingData.person.email}
                                     onChange={(event) => this.props.handleBillingInput(event)}
                              />
                          </div>
                      </div>
                      <div className="col-sm-12 horizontal-line-data">
                          <hr className="grey-line"/>
                      </div>
                      <div className="col-md-3 col-sm-6 col-sm-12">
                          <div className="form-group">
                              <label htmlFor="exampleInputPassword1">Adresa*</label>
                              <input type="text" className="form-control"
                                     placeholder="adresa..."
                                     name="address"
                                     value={this.props.billingData.person.address}
                                     onChange={(event) => this.props.handleBillingInput(event)}
                              />
                          </div>
                      </div>
                      <div className="col-md-3 col-sm-6 col-sm-12">
                          <div className="form-group">
                              <label htmlFor="exampleInputPassword1">Oras*</label>
                              <input type="text" className="form-control"
                                     placeholder="oras..."
                                     name="city"
                                     value={this.props.billingData.person.city}
                                     onChange={(event) => this.props.handleBillingInput(event)}
                                />
                          </div>
                      </div>
                      <div className="col-md-3 col-sm-6 col-sm-12">
                          <div className="form-group">
                              <label htmlFor="exampleInputPassword1">Judet*</label>
                              <input type="text" className="form-control"
                                     placeholder="judet..."
                                     name='district'
                                     value={this.props.billingData.person.district}
                                     onChange={(event) => this.props.handleBillingInput(event)}
                              />
                          </div>
                      </div>
                      <div className="col-md-3 col-sm-6 col-sm-12">
                          <div className="form-group">
                              <label htmlFor="exampleInputPassword1">Cod Postal*</label>
                              <input type="text" className="form-control"
                                     placeholder="cod postal..."
                                     name='postalCode'
                                     value={this.props.billingData.person.postalCode}
                                     onChange={(event) => this.props.handleBillingInput(event)}
                             />
                          </div>
                      </div>
                      <div className="col-sm-12 horizontal-line-data">
                          <hr className="grey-line"/>
                      </div>
                      <div className="col-4">
                          <div className="form-group">
                              <label htmlFor="exampleInputPassword1">Tara*</label>
                              <input type="text" className="form-control"
                                     placeholder="Tara..."
                                     name='country'
                                     value={this.props.billingData.person.country}
                                     onChange={(event) => this.props.handleBillingInput(event)}
                             />
                          </div>
                      </div>
                      <div className="col-8">
                          <div className="form-group">
                              <label htmlFor="exampleInputPassword1">Observatii</label>
                              <textarea type="text" className="form-control"
                                     placeholder="Alte detalii despre care vreti sa vorbiti"
                                     name='otherInfo'
                                     value={this.props.billingData.person.otherInfo}
                                     onChange={(event) => this.props.handleBillingInput(event)}
                                      />
                          </div>
                      </div>
                      <div className="col-sm-12 horizontal-line-data">
                          <hr className="grey-line"/>
                      </div>
                  </div>
              }
              {
                this.props.kindOfPerson === personTypes.COMPANY &&
                  <div className="row body-data">
                      <div className="col-md-3 col-sm-6 col-sm-12">
                          <div className="form-group">
                              <label htmlFor="exampleInputPassword1">Nume Companie*</label>
                              <input type="text" className="form-control"
                                     placeholder="nume..."
                                     name="companyName"
                                     value={this.props.billingData.company.companyName}
                                     onChange={(event) => this.props.handleBillingInput(event)}
                              />
                          </div>
                      </div>
                      <div className="col-md-3 col-sm-6 col-sm-12">
                          <div className="form-group">
                              <label htmlFor="exampleInputPassword1">Cod fiscal*</label>
                              <input type="text" className="form-control"
                                     placeholder="prenume..."
                                     name="fiscalCode"
                                     value={this.props.billingData.company.fiscalCode}
                                     onChange={(event) => this.props.handleBillingInput(event)}
                              />
                          </div>
                      </div>
                      <div className="col-md-3 col-sm-6 col-sm-12">
                          <div className="form-group">
                              <label htmlFor="exampleInputPassword1">Nr. Inreg. Reg. Com*</label>
                              <input type="text" className="form-control"
                                     placeholder="numar telefon..."
                                     name="tradeRegisterNo"
                                     value={this.props.billingData.company.tradeRegisterNo}
                                     onChange={(event) => this.props.handleBillingInput(event)}
                              />
                          </div>
                      </div>
                      <div className="col-md-3 col-sm-6 col-sm-12">
                          <div className="form-group">
                              <label htmlFor="exampleInputPassword1">Adresa*</label>
                              <input type="text" className="form-control"
                                     placeholder="adresa..."
                                     name="address"
                                     value={this.props.billingData.company.address}
                                     onChange={(event) => this.props.handleBillingInput(event)}
                               />
                          </div>
                      </div>
                      <div className="col-md-3 col-sm-6 col-sm-12">
                          <div className="form-group">
                              <label htmlFor="exampleInputPassword1">Oras*</label>
                              <input type="text" className="form-control"
                                     placeholder="oras..."
                                     name="city"
                                     value={this.props.billingData.company.city}
                                     onChange={(event) => this.props.handleBillingInput(event)}
                              />
                          </div>
                      </div>
                      <div className="col-md-3 col-sm-6 col-sm-12">
                          <div className="form-group">
                              <label htmlFor="exampleInputPassword1">Judet*</label>
                              <input type="text" className="form-control"
                                     placeholder="judet..."
                                     name="district"
                                     value={this.props.billingData.company.district}
                                     onChange={(event) => this.props.handleBillingInput(event)}
                              />
                          </div>
                      </div>
                      <div className="col-md-3 col-sm-6 col-sm-12">
                          <div className="form-group">
                              <label htmlFor="exampleInputPassword1">Cod Postal*</label>
                              <input type="text" className="form-control"
                                     placeholder="cod postal..."
                                     name="postalCode"
                                     value={this.props.billingData.company.postalCode}
                                     onChange={(event) => this.props.handleBillingInput(event)}
                              />
                          </div>
                      </div>
                      <div className="col-md-3 col-sm-6 col-sm-12">
                          <div className="form-group">
                              <label htmlFor="exampleInputPassword1">Tara*</label>
                              <input type="text" className="form-control"
                                     placeholder="Tara..."
                                     name="country"
                                     value={this.props.billingData.company.country}
                                     onChange={(event) => this.props.handleBillingInput(event)}
                             />
                          </div>
                      </div>
                      <div className="col-md-3 col-sm-6 col-sm-12">
                          <div className="form-group">
                              <label htmlFor="exampleInputPassword1">Banca*</label>
                              <input type="email" className="form-control"
                                     placeholder="adresa de email..."
                                     name="bank"
                                     value={this.props.billingData.company.bank}
                                     onChange={(event) => this.props.handleBillingInput(event)}
                             />
                          </div>
                      </div>
                      <div className="col-md-3 col-sm-6 col-sm-12">
                          <div className="form-group">
                              <label htmlFor="exampleInputPassword1">Cont*</label>
                              <input type="email" className="form-control"
                                     placeholder="adresa de email..."
                                     name="account"
                                     value={this.props.billingData.company.account}
                                     onChange={(event) => this.props.handleBillingInput(event)}
                               />
                          </div>
                      </div>
                      <div className="col col-sm-6 col-sm-12">
                          <div className="form-group">
                              <label htmlFor="exampleInputPassword1">Observatii</label>
                              <textarea type="text" className="form-control"
                                        placeholder="Alte detalii despre care vreti sa vorbiti"
                                        name="otherInfo"
                                        value={this.props.billingData.company.otherInfo}
                                        onChange={(event) => this.props.handleBillingInput(event)}
                               />
                          </div>
                      </div>
                      <div className="col-sm-12 horizontal-line-data">
                          <hr className="grey-line"/>
                      </div>
                  </div>
              }
          </div>
      </div>
    );
  }
}

export default Billing;
