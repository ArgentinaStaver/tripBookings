import React, { Component } from 'react';

class TicketsInfo extends Component {
  render() {
    return(
      <div className="row personal-data">
          <div className="col-sm-12 header">
              <i className="fas fa-users people-icon"></i>
              <h2>Date pasager</h2>
          </div>
          {
              this.props.passengers.map((passenger, index) =>
                  <div className="col-sm-12" key={index}>
                      <div className="row body-data">
                          <div className="col-md-3 col-sm-6 col-sm-12">
                              <div className="form-group">
                                  <label htmlFor="exampleInputPassword1">Nume*</label>
                                  <input type="text" className="form-control"
                                         name="lastName"
                                         placeholder="introduceti numele..."
                                         value={this.props.passengers[index].lastName}
                                         onChange={(event) => this.props.handleInputChange(event, index)}
                                  />
                              </div>
                          </div>
                          <div className="col-md-3 col-sm-6 col-sm-12">
                              <div className="form-group">
                                  <label htmlFor="exampleInputPassword1">Prenume*</label>
                                  <input type="text" className="form-control"
                                         placeholder="introduceti prenumele..."
                                         name="firstName"
                                         value={this.props.passengers[index].firstName}
                                         onChange={(event) => this.props.handleInputChange(event, index)}
                                  />
                              </div>
                          </div>
                          <div className="col-md-3 col-sm-6 col-sm-12">
                              <div className="form-group">
                                  <label htmlFor="exampleInputPassword1" >
                                    Telefon {(index === 0) ? '*' : ''}
                                  </label>
                                  <input type="text" className="form-control"
                                         placeholder="numar de telefon..."
                                         name="phone"
                                         value={this.props.passengers[index].phone}
                                         onChange={(event) => this.props.handleInputChange(event, index)}
                                  />
                              </div>
                          </div>
                          <div className="col-md-3 col-sm-6 col-sm-12">
                              <div className="form-group">
                                  <label htmlFor="exampleInputPassword1">
                                     Email {index === 0 ? '*' : ''}
                                  </label>
                                  <input type="email" className="form-control"
                                         placeholder="adresa de email..."
                                         name="email"
                                         value={this.props.passengers[index].email}
                                         onChange={(event) => this.props.handleInputChange(event, index)}
                                  />
                              </div>
                          </div>
                          <div className="col-sm-12 horizontal-line-data">
                              <hr className="grey-line"/>
                          </div>
                      </div>
                  </div>
              )
          }
      </div>
    );
  }
}

export default TicketsInfo;
