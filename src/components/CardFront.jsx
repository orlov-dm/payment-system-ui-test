import React, { Component } from 'react';
import CardLogo from './CardLogo';
import ValidationInput from './ValidationInput';

import * as Constants from '../constants';

class CardFront extends Component {
    constructor() {
        super();
        this.validateCardNumber = this.validateCardNumber.bind(this);
    }

    render() {
        const { 
            cardNumber,
            cardExpDate,
            cardIssuerName,
            cardTypePayment,
            cardTypeBank, 
            onNumberChange,
            onExpDateChange,
            onIssuerNameChange,
            errors
        } = this.props;
        const { 
            cardNumber: errorCardNumber,
            cardExpDate: errorCardExpDate,
            cardIssuerName: errorCardIssuerName
        } = errors;
        return (
            <div className='CardFront'>
                <CardLogo
                    logoType={Constants.CARD_LOGO_TYPE_BANK}
                    cardType={cardTypeBank}
                />
                <div className='CardFront-content'>
                    <div className='CardFront-content-first'>
                        <div>
                            <label htmlFor='card_number'>CARD NUMBER</label>                            
                            <ValidationInput
                                id='card_number'
                                value={cardNumber}
                                onChange={onNumberChange}
                                mask='9999 9999 9999 9999'
                                isValid={errorCardNumber == null}
                            >
                            </ValidationInput>
                        </div>
                        <div>
                            <label htmlFor='card_expiry_date'>EXPIRY DATE</label>                        
                            <ValidationInput 
                                id='card_expiry_date'
                                value={cardExpDate}
                                onChange={onExpDateChange}
                                mask='99/99'
                                isValid={errorCardExpDate == null}
                            >
                            </ValidationInput>
                        </div>
                    </div>
                    <div className='CardFront-content-second'>                        
                        <div>
                            <label htmlFor='card_issuer_name'>ISSUER NAME</label>                        
                            <ValidationInput 
                                id='card_issuer_name'
                                value={cardIssuerName}
                                onChange={onIssuerNameChange}
                                isValid={errorCardIssuerName == null}                                
                            >
                            </ValidationInput>
                        </div>
                    </div>
                </div>
                <CardLogo 
                    logoType={Constants.CARD_LOGO_TYPE_PAYMENT}                    
                    cardType={cardTypePayment}
                />
            </div>
        );
    }

    validateCardNumber() {
        const { cardNumber } = this.props;
        return cardNumber.replace(/[\s_]/g, '').length === 16;
    }
}

export default CardFront;