import React, { Component } from 'react';
import ValidationInput from './ValidationInput';

class SecurityForm extends Component {
    state = {
        code: ''
    }
    constructor(props) {
        super(props);
        this.onCodeChange = this.onCodeChange.bind(this);    
    }
    render() {
        const { location } = this.props;
        if(location) {
            const { state } = location;
            if(state) {
                const { code } = this.state;
                return (
                    <form className='SecurityForm'>
                        <label htmlFor='code'>Please, enter code from URL:</label>                            
                        <ValidationInput
                            id='code'
                            value={code}
                            onChange={this.onCodeChange}
                            mask='999999'
                        />                
                    </form>
                );
            }
        }
        return <div>Error</div>;
    }
    onCodeChange(event) {
        const code = event.target.value;
        const verifyCode = this.props.location.state.code;
        if(Number(code) === verifyCode) {
            const { history } = this.props;
            const { amountToReceive } = this.props.location.state;
            history.push(`/checkout`, { amountToReceive });
        }

        this.setState({code});        
    }
}

export default SecurityForm;