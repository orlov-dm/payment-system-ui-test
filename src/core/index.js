import * as Constants from '../constants';

export function cardNumberToPaymentType(cardNumber) {
    if(cardNumber == null || !cardNumber.length) {
        return null;
    }
    const check = Number(cardNumber[0]);
    switch(check) {
        case Constants.CARD_TYPE_VISA_NUMBER: return Constants.CARD_TYPE_VISA;
        case Constants.CARD_TYPE_MASTERCARD_NUMBER: return Constants.CARD_TYPE_MASTERCARD;
        case Constants.CARD_TYPE_MAESTRO_NUMBER: return Constants.CARD_TYPE_MAESTRO;
        case Constants.CARD_TYPE_MIR_NUMBER: return Constants.CARD_TYPE_MIR;
        default: return null;
    }
};

export function cardNumberToBankType(cardNumber, paymentType) {
    console.log('cardNumberToBankType', cardNumber, paymentType);
    if(cardNumber == null || !cardNumber.length || paymentType == null) {
        return null;
    }
    const check = Number(cardNumber.split('').slice(0,6).join(''));
    for(const [bank, cardNumbers] of Object.entries(Constants.CARD_TYPE_BANKS)) {
        if(cardNumbers.hasOwnProperty(paymentType)) {
            if(cardNumbers[paymentType].includes(check)) {
                console.log('cardNumberToBankType Bank ' + bank);
                return bank;
            }
        }
    }
    return null;    
};


