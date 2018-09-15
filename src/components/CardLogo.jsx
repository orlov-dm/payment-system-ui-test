import React, { Component } from 'react';
import visaLogo from '../images/visa_logo.svg';
import mastercardLogo from '../images/mastercard_logo.svg';
import mirLogo from '../images/mir_logo.svg';
import * as Constants from '../constants';

class CardLogo extends Component {
    render() {
        const { cardType } = this.props;        
        const logo = this.getLogo(cardType);
        const descr = `Card logo ${cardType}`;
        return (
            <div className='CardLogo'>
                { cardType != null ? <img src={logo} alt={descr}></img> : '' }
            </div>
        );        
    }

    getLogo(cardType) {
        switch(cardType) {
            case Constants.CARD_TYPE_VISA: return visaLogo;
            case Constants.CARD_TYPE_MASTERCARD: return mastercardLogo;
            case Constants.CARD_TYPE_MIR: return mirLogo;
            default: return null;
        }
    }
}

export default CardLogo;