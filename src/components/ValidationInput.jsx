import React, { Component } from 'react';
import InputMask from 'react-input-mask';

class ValidationInput extends Component {
    render() {
        const { isValid, ...rest } = this.props;        
        const className = isValid != null && !isValid ? 'invalid' : '';
        return <InputMask className={className} {...rest}/>
    }
}

export default ValidationInput;