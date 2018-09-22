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
        errors: {}
    };    

    constructor(props) {
        super(props);

        this.onNumberChange = this.onNumberChange.bind(this);
        this.onExpDateChange = this.onExpDateChange.bind(this);
        this.onIssuerNameChange = this.onIssuerNameChange.bind(this);
        this.onCvcChange = this.onCvcChange.bind(this);
        this.onAmountToReceiveChange = this.onAmountToReceiveChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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
            errors
        } = this.state;
        const error = Object.keys(errors).length ? errors[Object.keys(errors)[0]] : null;
        let errorNotification = '';
        if(error != null) {
            errorNotification = (
                <div className='CardFormError'>
                    <div className='CardFormError-title'>Error:</div>
                    <div className='CardFormError-value'>{error}</div>
                </div>
            );
        }
        const className = `CardForm ${cardTypePayment ? cardTypePayment : ''} ${cardTypeBank ? cardTypeBank : ''}`;
        return (
            <form 
                id='card_form'
                className={className}
                onSubmit={this.onSubmit}
            >
                {errorNotification}
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
                        errors={errors}
                    />                    
                    <CardBack 
                        cvcCode={cvcCode}
                        onCvcChange={this.onCvcChange}
                        errors={errors}
                    />                    
                </div>
                <CardAmount 
                    value={amountToReceive}
                    onChange={this.onAmountToReceiveChange}
                    errors={errors}
                >
                </CardAmount>
                <div className='CardSubmit'>
                    <button type='submit'>Pay</button>
                    <Description value='The details are protected to PCI DSS standart'></Description>
                </div>
            </form>
        );
    }

    onNumberChange(event) {                         
        const input = event.target;     
        const cardNumber = input.value;        
        //console.log(cardNumber)        
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
        this.resetErrors();
    }

    validateExpDate(cardExpDate) {
        if(!cardExpDate) {
            return cardExpDate;
        }
        const [month, year] = cardExpDate.split('/');
        //console.log(month);
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
        this.resetErrors();
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
        this.resetErrors();
    }

    onCvcChange(event) {        
        const cvcCode = event.target.value;
        this.setState({
            cvcCode
        });
        this.resetErrors();
    }

    onAmountToReceiveChange(event) {
        const amountToReceive = Number(event.target.value);
        if(Number.isNaN(amountToReceive) || amountToReceive > Math.pow(10, 14)) {
            return false;
        }
        this.setState({
            amountToReceive
        });
        this.resetErrors();
    }

    onSubmit(event) {        
        event.preventDefault();        
        if(this.validate()) {
            const { history } = this.props;
            const { amountToReceive } = this.state;
            const code = Math.floor(100000 + Math.random() * 900000);
            history.push(`/security?${code}`, { amountToReceive });
        }
    }
    
    validate() {
        const {
            cardNumber,
            cardExpDate,
            cardIssuerName,
            cvcCode,
            amountToReceive,
        } = this.state;
        
        const errors = {};
        if(cardNumber.replace(/[\s_]/g, '').length < 16) {
            errors['cardNumber'] = 'Card number is too short';            
        }

        if(cardExpDate.length !== 5 ) {
            errors['cardExpDate'] = 'Expiry date is not filled';
        }

        if(cardIssuerName.split(' ').length < 2) {
            errors['cardIssuerName'] = 'Name is not filled';
        }

        if(cvcCode.length !== 3) {
            errors['cvcCode'] = 'CVC code is not filled';
        }

        console.log(amountToReceive);
        if(Number.isNaN(Number(amountToReceive)) ||
            Number(amountToReceive) <= 0) {
            errors['amountToReceive'] = 'Enter amount';
        }
        
        this.setState({
            errors
        });

        return Object.keys(errors).length === 0;
    }

    resetErrors() {
        const { errors } = this.state;
        if(Object.keys(errors).length) {
            this.setState({
                errors: {}}
            );
        }
    }
}

export default CardForm;