import React, { Component } from 'react';
import InputMask from 'react-input-mask';
import Description from './Description';

const COMMISSION = 1.3;

class CardAmount extends Component {
    render() {
        const { value, onChange } = this.props;
        const description = `Amount to pay ${(value*COMMISSION).toFixed(2)} including ${COMMISSION}% commission`;
        return (
            <div className='CardAmount'>
                <div className='CardAmount-value'>
                    <InputMask 
                        value={value}                    
                        placeholder='Amount to receive'
                        onChange={onChange}
                    >
                    </InputMask>
                </div>
                
                <Description value={description}/>
            </div>            
        );
    }
}

export default CardAmount;
