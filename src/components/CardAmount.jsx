import React, { Component } from 'react';
import ValidationInput from './ValidationInput';
import Description from './Description';

const COMMISSION = 1.3;

class CardAmount extends Component {
    render() {
        const { value, onChange, errors } = this.props;
        const { 
            amountToReceive: errorAmountToReceive,
        } = errors;
        const description = `Amount to pay ${(value*COMMISSION).toFixed(2)} including ${COMMISSION}% commission`;
        return (
            <div className='CardAmount'>
                <div className='CardAmount-value'>
                    <ValidationInput 
                        value={value}                    
                        placeholder='Amount to receive'
                        onChange={onChange}
                        isValid={errorAmountToReceive == null}
                    >
                    </ValidationInput>
                </div>
                
                <Description value={description}/>
            </div>            
        );
    }
}

export default CardAmount;
