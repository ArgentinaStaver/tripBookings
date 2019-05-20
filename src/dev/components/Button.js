import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Button extends Component {
    getButtonName() {
        let text;
        if(this.props.iconPosition === "left") {
            return (<span><i className={this.props.icon}></i> {this.props.name}</span>);
        } else if (this.props.iconPosition === "right") {
            return (<span> {this.props.name} <i className={this.props.icon}></i></span>);
        } else {
            return `${this.props.name}`;
        }
    }

    render() {
        return (
           <span className={"reserve-button continue-button " + (this.props.isActive ? '' : 'inactive-button')}
                 onClick={ () => { this.props.isActive && this.props.action() }}>
                 {this.getButtonName()}
           </span>
        );
    }
}

export default Button;
