import React, { Component } from 'react';

import CardFront from './CardFront';
import CardBack from './CardBack';

import { cardNumberToType } from '../core';
import * as Constants from '../constants';

class CardForm extends Component {
    state = {
        cardType: null,
        cardNumber: '',
        expiryDate: '',
        cvcCode: '',
    };

    constructor(props) {
        super(props);

        this.onNumberChange = this.onNumberChange.bind(this);
        this.onCvcChange = this.onCvcChange.bind(this);
    }

    render() {
        const { cardType, cardNumber, cvcCode } = this.state;
        const className = `CardForm ${cardType}`;
        return (
            <form id='card_form' className={className}>
                <CardFront 
                    cardNumber={cardNumber}
                    cardType={cardType}
                    onNumberChange={this.onNumberChange}>
                </CardFront>
                <CardBack 
                    cvcCode={cvcCode}
                    onCvcChange={this.onCvcChange}>
                </CardBack>
            </form>
        );
    }

    onNumberChange(event) {                    
        const cardNumber = event.target.value;
        const trimmedCardNumber = cardNumber.replace(/\s+/g, '');
        if(trimmedCardNumber.length > Constants.CARD_NUMBER_MAX_LENGTH) {
            console.log('numberChangeBad', cardNumber);
            return false;
        }
        const newState = {
            cardNumber: trimmedCardNumber.replace(/(.{4})/g, '$1 ').trim(),
            cardType: null,
        }
        if(cardNumber.length) {
            const cardTypeNumber = Number(trimmedCardNumber[0]);
            newState.cardType = cardNumberToType(cardTypeNumber);
        }
        console.log('numberChange', newState);
        this.setState(newState);
    }

    onExpiryDateChange(event) {        
        const numberString = event.target.value;
        const newState = {            
            cardNumber: numberString,
            cardType: null,
        }
        if(numberString.length) {
            const cardTypeNumber = Number(numberString[0]);
            newState.cardType = cardNumberToType(cardTypeNumber);
        }
        console.log('numberChange', newState);
        this.setState(newState);
    }

    onCvcChange(event) {        
        const cvcCode = event.target.value;            
        if(cvcCode.length > 3) {
            return false;
        }
        if(Number.isNaN(Number(cvcCode))) {
            return false;
        }
        this.setState({
            cvcCode
        });        
    }
}

export default CardForm;