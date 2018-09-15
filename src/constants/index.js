export const CARD_TYPE_VISA = 'visa';
export const CARD_TYPE_MASTERCARD = 'mastercard';
export const CARD_TYPE_MAESTRO = 'maestro';
export const CARD_TYPE_MIR = 'mir';

export const CARD_TYPE_SBERBANK = 'sberbank';
export const CARD_TYPE_VTB = 'vtb';
export const CARD_TYPE_ALFA = 'alfa';


export const CARD_TYPE_MIR_NUMBER = 2;
export const CARD_TYPE_VISA_NUMBER = 4;
export const CARD_TYPE_MASTERCARD_NUMBER = 5;
export const CARD_TYPE_MAESTRO_NUMBER = 6;

export const CARD_TYPE_SBERBANK_NUMBERS = {
    [CARD_TYPE_VISA]: [
        427601, // Сбербанк, Россия, VISA CLASSIC, Дебетовая
        427644, // Сбербанк, Россия, VISA CLASSIC, Дебетовая
        427683, // Сбербанк, Россия, VISA ELECTRON, Дебетовая
        427684, // Сбербанк, Россия, VISA ELECTRON, Дебетовая
        427685, // Сбербанк, Россия, VISA ELECTRON, Дебетовая
        427901, // Сбербанк, Россия, VISA PREMIER, Дебетовая
    ], 
    [CARD_TYPE_MASTERCARD]: [
        546952
    ], // Сбербанк, Россия, MASTERCARD, Дебетовая
    [CARD_TYPE_MAESTRO]: [
        639002
    ], // Сбербанк, Россия, MAESTRO, Дебетовая
};

export const CARD_TYPE_ALFA_NUMBERS = {
    [CARD_TYPE_VISA]: [
        415428, // Альфа-Банк, Россия, VISA CLASSIC, Кредитная
        479087, // Альфа-Банк, Россия, VISA PLATINUM, Дебетовая
        479004, // Альфа-Банк, Россия, VISA PLATINUM, Кредитная
    ],
    [CARD_TYPE_MASTERCARD]: [
        521178, // Альфа-Банк, Россия, MASTERCARD STANDARD, Кредитная
        548673, // Альфа-Банк, Россия, MASTERCARD STANDARD, Кредитная
    ],    
};

export const CARD_TYPE_VTB_NUMBERS = {
    [CARD_TYPE_VISA]: [
        427229, // ВТБ, Россия, VISA CLASSIC, Кредитная
        471487, // ВТБ, Россия, VISA CLASSIC, Кредитная
    ],
    [CARD_TYPE_MASTERCARD]: [
        554386
    ], // ВТБ, Россия, MASTERCARD STANDARD, Кредитная    
};

export const CARD_NUMBER_MAX_LENGTH = 16;

export const CARD_TYPE_BANKS = {
    [CARD_TYPE_SBERBANK]: CARD_TYPE_SBERBANK_NUMBERS,
    [CARD_TYPE_ALFA]: CARD_TYPE_ALFA_NUMBERS,
    [CARD_TYPE_VTB]: CARD_TYPE_VTB_NUMBERS,
};

export const CARD_LOGO_TYPE_PAYMENT = 1;
export const CARD_LOGO_TYPE_BANK = 2;
