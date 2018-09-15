import React, { Component } from 'react';
import CardLogo from './CardLogo';

class CardFront extends Component {
    
    render() {
        const { cardNumber, cardType, onNumberChange } = this.props;
        
        return (
            <div className='CardFront'>
                <CardLogo cardType={cardType}/>
                <div className='CardFront-content'>
                    <div>
                        <label htmlFor='card_number'>CARD NUMBER</label>
                        <input 
                            id='card_number'
                            value={cardNumber}
                            onChange={onNumberChange}>
                        </input>
                    </div>
                    <div>
                        <label htmlFor='card_expiry_date'>EXPIRY DATE</label>
                        <input id='card_expiry_date'></input>
                    </div>
                </div>
            </div>
        );
    }

    
}

export default CardFront;