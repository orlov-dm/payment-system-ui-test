import React, { Component } from 'react';
import Description from './Description';
import ValidationInput from './ValidationInput';

class CardBack extends Component {
    render() {
        const { cvcCode, onCvcChange, errors } = this.props;
        const { 
            cvcCode: errorCvcCode,
        } = errors;
        return (
            <div className='CardBack'>
                <div className='CardBack-line'></div>
                <div className='CardBack-content'>
                    <div>
                        <label htmlFor='card_cvc'>CVC CODE</label>
                        <ValidationInput 
                            id='card_cvc'
                            value={cvcCode}
                            onChange={onCvcChange}
                            mask='999'
                            isValid={errorCvcCode == null}
                        >
                        </ValidationInput>
                        <Description value='Three digits from the back of the card'/>
                    </div>                            
                </div>
            </div>
        );
    }
}

export default CardBack;