import React, { Component } from 'react';
import InputMask from 'react-input-mask';
import Description from './Description';

class CardBack extends Component {
    render() {
        const { cvcCode, onCvcChange } = this.props;
        return (
            <div className='CardBack'>
                <div className='CardBack-line'></div>
                <div className='CardBack-content'>
                    <div>
                        <label htmlFor='card_cvc'>CVC CODE</label>
                        <InputMask 
                            id='card_cvc'
                            value={cvcCode}
                            onChange={onCvcChange}
                            mask='999'
                        >
                        </InputMask>
                        <Description value='Three digits from the back of the card'/>
                    </div>                            
                </div>
            </div>
        );
    }
}

export default CardBack;