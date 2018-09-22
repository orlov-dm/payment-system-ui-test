import React, { Component } from 'react';

class CheckoutForm extends Component {
    render() {
        const { location } = this.props;
        if(location) {
            const { state } = location;
            if(state) {
                const { amountToReceive } = state;
                return (
                    <div className='CheckoutForm'>                
                        Successfully sent <span className='CheckoutForm-amount'>{amountToReceive + '$'}</span>
                    </div>
                );
            }
        }        
        return <div>Error</div>;
    }
}

export default CheckoutForm;