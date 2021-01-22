import Alert from 'react-bootstrap/Alert';
import React from 'react';

class CustomAlert extends React.Component {

    render() {
        if(this.props.show){
            return(
                <Alert {...this.props} onClose={this.props.onClose}>
                    <Alert.Heading>{this.props.messageTitle}</Alert.Heading>
                    <p>
                        {this.props.messageBody}
                    </p>
                </Alert>
            )
        }else{
            return(
                <div></div>
            )
        }
    }
}

export default CustomAlert;