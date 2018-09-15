import React, { Component } from 'react';

class CardBack extends Component {
    render() {
        const { cvcCode, onCvcChange } = this.props;
        return (
            <div className='CardBack'>
                <div className='CardBack-line'></div>
                <div className='CardBack-content'>
                    <div>
                        <label htmlFor='card_cvc'>CVC CODE</label>
                        <input id='card_cvc' value={cvcCode} onChange={onCvcChange}></input>
                        <div className='CardBack-description'>Three digits from the back of the card</div>
                    </div>                            
                </div>
            </div>
        );
    }
}

export default CardBack;