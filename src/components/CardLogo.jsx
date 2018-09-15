import React, { Component } from 'react';

import visaLogo from '../images/visa_logo.svg';
import mastercardLogo from '../images/mastercard_logo.svg';
import maestroLogo from '../images/maestro_logo.svg';
import mirLogo from '../images/mir_logo.svg';

import sberbankLogo from '../images/sberbank_logo.svg';
import vtbLogo from '../images/vtb_logo.svg';
import alfaLogo from '../images/alfa_logo.svg';

import * as Constants from '../constants';

class CardLogo extends Component {
    render() {
        const { logoType, cardType } = this.props;        
        const logo = this.getLogo(logoType, cardType);
        const descr = `Card logo ${cardType}`;
        const className = `CardLogo ${logoType === Constants.CARD_LOGO_TYPE_PAYMENT ? 'payment' : 'bank'}`;
        return (
            <div className={className}>
                { cardType != null ? <img src={logo} alt={descr}></img> : '' }
            </div>
        );        
    }

    getLogo(logoType, cardType) {
        if(logoType === Constants.CARD_LOGO_TYPE_PAYMENT) {
            switch(cardType) {
                case Constants.CARD_TYPE_VISA: return visaLogo;
                case Constants.CARD_TYPE_MASTERCARD: return mastercardLogo;
                case Constants.CARD_TYPE_MAESTRO: return maestroLogo;
                case Constants.CARD_TYPE_MIR: return mirLogo;
                default: return null;
            }
        } else if(logoType === Constants.CARD_LOGO_TYPE_BANK) {
            switch(cardType) {
                case Constants.CARD_TYPE_SBERBANK: return sberbankLogo;
                case Constants.CARD_TYPE_VTB: return vtbLogo;
                case Constants.CARD_TYPE_ALFA: return alfaLogo;
                default: return null;
            }
        }

        return null;
    }
}

export default CardLogo;