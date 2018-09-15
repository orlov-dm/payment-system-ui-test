import React, { Component } from 'react';

import CardFront from './CardFront';
import CardBack from './CardBack';

import { cardNumberToPaymentType, cardNumberToBankType } from '../core';
import * as Constants from '../constants';

class CardForm extends Component {
    state = {
        cardTypePayment: null,
        cardTypeBank: null,
        cardNumber: '',
        cardExpDate: '',
        cvcCode: '',
    };    

    constructor(props) {
        super(props);

        this.onNumberChange = this.onNumberChange.bind(this);
        this.onExpDateChange = this.onExpDateChange.bind(this);
        this.onCvcChange = this.onCvcChange.bind(this);
    }

    render() {
        const { 
            cardTypePayment,
            cardTypeBank,
            cardNumber,
            cardExpDate,
            cvcCode
        } = this.state;
        const className = `CardForm ${cardTypePayment} ${cardTypeBank}`;
        return (
            <form id='card_form' className={className}>
                <CardFront 
                    cardNumber={cardNumber}
                    cardExpDate={cardExpDate}
                    cardTypePayment={cardTypePayment}
                    cardTypeBank={cardTypeBank}
                    onNumberChange={this.onNumberChange}
                    onExpDateChange={this.onExpDateChange}
                >
                </CardFront>
                <CardBack 
                    cvcCode={cvcCode}
                    onCvcChange={this.onCvcChange}>
                </CardBack>
            </form>
        );
    }

    onNumberChange(event) {                         
        const input = event.target;     
        const cardNumber = input.value;        
        console.log(cardNumber)        
        const newState = {
            cardNumber: cardNumber,
            cardType: null,
        }
        if(cardNumber.length) {
            const trimmedCardNumber = cardNumber.replace(/\s+/g, '').trim();
            newState.cardTypePayment = cardNumberToPaymentType(trimmedCardNumber);            
            newState.cardTypeBank = cardNumberToBankType(trimmedCardNumber, newState.cardTypePayment);            
        }
        this.setState(newState);
    }

    validateExpDate(cardExpDate) {
        const [month, year] = cardExpDate.split('/');
        console.log(month);
        const monthNumber = Number(month);
        const maxMonth = 12;
        if(!Number.isNaN(monthNumber)) {
            if(monthNumber === 0) {
                const newCardExpDate = `01/${year}`;
                return this.validateExpDate(newCardExpDate);
            }
            if(monthNumber > 12) {                
                const newCardExpDate = `${maxMonth}/${year}`;
                return this.validateExpDate(newCardExpDate);
            }
        }
        const yearNumber = Number(year);            
        
        const currentMonth = Number((new Date()).getMonth() + 1);        
        const currentYear = Number((new Date()).getFullYear().toString().slice(-2));
        const maxYear = currentYear + 10;

        if(!Number.isNaN(monthNumber) && !Number.isNaN(yearNumber)) {            
            if(monthNumber < currentMonth && yearNumber === currentYear) {                
                const newCardExpDate = `${currentMonth.toString().padStart(2, '0')}/${currentYear}`;
                return this.validateExpDate(newCardExpDate);
            }
        }
        
        if(!Number.isNaN(yearNumber)) {
            //equal or more than current
            if(yearNumber < currentYear) {                                
                const newCardExpDate = `${month}/${currentYear}`;
                return this.validateExpDate(newCardExpDate);
            }
            //e.g next 10 years
            if(yearNumber > maxYear) {                
                const newCardExpDate = `${month}/${maxYear}`;
                return this.validateExpDate(newCardExpDate);
            }
        }        

        return cardExpDate;
    }

    onExpDateChange(event) {        
        const cardExpDate = event.target.value;
        const newState = {            
            cardExpDate: this.validateExpDate(cardExpDate)
        };
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