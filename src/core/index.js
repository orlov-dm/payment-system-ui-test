import * as Constants from '../constants';

export function cardTypeToNumber(cardType) {
    switch(cardType) {
        case Constants.CARD_TYPE_VISA: return Constants.CARD_TYPE_VISA_NUMBER;
        case Constants.CARD_TYPE_MASTERCARD: return Constants.CARD_TYPE_MASTERCARD_NUMBER;
        case Constants.CARD_TYPE_MIR: return Constants.CARD_TYPE_MIR_NUMBER;
        default: return null;
    }
};

export function cardNumberToType(cardNumber) {
    switch(cardNumber) {
        case Constants.CARD_TYPE_VISA_NUMBER: return Constants.CARD_TYPE_VISA;
        case Constants.CARD_TYPE_MASTERCARD_NUMBER: return Constants.CARD_TYPE_MASTERCARD;
        case Constants.CARD_TYPE_MIR_NUMBER: return Constants.CARD_TYPE_MIR;
        default: return null;
    }
};

