import React, { Component } from 'react';

import CardFront from './CardFront';
import CardBack from './CardBack';
import CardAmount from './CardAmount';

import { cardNumberToPaymentType, cardNumberToBankType } from '../core';
import Description from './Description';

class CardForm extends Component {
    state = {
        cardTypePayment: null,
        cardTypeBank: null,
        cardNumber: '',
        cardExpDate: '',
        cardIssuerName: '',
        cvcCode: '',
        amountToReceive: '',
    };    

    constructor(props) {
        super(props);

        this.onNumberChange = this.onNumberChange.bind(this);
        this.onExpDateChange = this.onExpDateChange.bind(this);
        this.onIssuerNameChange = this.onIssuerNameChange.bind(this);
        this.onCvcChange = this.onCvcChange.bind(this);
        this.onAmountToReceiveChange = this.onAmountToReceiveChange.bind(this);
    }

    componentDidUpdate() {
        console.log(this.state);
    }

    render() {
        const { 
            cardTypePayment,
            cardTypeBank,
            cardNumber,
            cardExpDate,
            cardIssuerName,
            cvcCode,
            amountToReceive,
        } = this.state;
        const className = `CardForm ${cardTypePayment ? cardTypePayment : ''} ${cardTypeBank ? cardTypeBank : ''}`;
        return (
            <form id='card_form' className={className}>
                <div className='Card'>
                    <CardFront 
                        cardNumber={cardNumber}
                        cardExpDate={cardExpDate}
                        cardIssuerName={cardIssuerName}
                        cardTypePayment={cardTypePayment}
                        cardTypeBank={cardTypeBank}
                        onNumberChange={this.onNumberChange}
                        onExpDateChange={this.onExpDateChange}
                        onIssuerNameChange={this.onIssuerNameChange}
                    >
                    </CardFront>
                    <CardBack 
                        cvcCode={cvcCode}
                        onCvcChange={this.onCvcChange}>
                    </CardBack>
                </div>
                <CardAmount 
                    value={amountToReceive}
                    onChange={this.onAmountToReceiveChange}
                >
                </CardAmount>
                <div className='CardSubmit'>
                    <button
                        type='submit'
                        // onSumbit={}
                    >
                        Pay
                    </button>
                    <Description value='The details are protected to PCI DSS standart'></Description>
                </div>
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
        if(!cardExpDate) {
            return cardExpDate;
        }
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

    onIssuerNameChange(event) {        
        const cardIssuerName = event.target.value.toUpperCase();
        if(!/^([A-Z]*)\s?([A-Z])*$/.test(cardIssuerName)) {
            return false;
        }        

        const newState = {
            cardIssuerName
        };
        this.setState(newState);
    }

    onCvcChange(event) {        
        const cvcCode = event.target.value;
        this.setState({
            cvcCode
        });
    }

    onAmountToReceiveChange(event) {
        const amountToReceive = event.target.value;
        if(amountToReceive > Math.pow(10, 14)) {
            return false;
        }
        this.setState({
            amountToReceive
        });
    }    
}

export default CardForm;