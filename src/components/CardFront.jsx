import React, { Component } from 'react';
import CardLogo from './CardLogo';
import InputMask from 'react-input-mask';

import * as Constants from '../constants';

class CardFront extends Component {
    
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
        } = this.props;
        
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
                            <InputMask
                                id='card_number'
                                value={cardNumber}
                                onChange={onNumberChange}
                                mask='9999 9999 9999 9999'
                            >
                            </InputMask>
                        </div>
                        <div>
                            <label htmlFor='card_expiry_date'>EXPIRY DATE</label>                        
                            <InputMask 
                                id='card_expiry_date'
                                value={cardExpDate}
                                onChange={onExpDateChange}
                                mask='99/99'
                            >
                            </InputMask>
                        </div>
                    </div>
                    <div className='CardFront-content-second'>                        
                        <div>
                            <label htmlFor='card_issuer_name'>ISSUER NAME</label>                        
                            <InputMask 
                                id='card_issuer_name'
                                value={cardIssuerName}
                                onChange={onIssuerNameChange}                                
                            >
                            </InputMask>
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

    
}

export default CardFront;