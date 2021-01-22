import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

class DeleteDialog extends React.Component {

    delete = () => {
        this.props.deleteRegistry(this.props.record)
        this.props.hideDelete()
    }

    render() {
        return(
            <>
                <Alert show={this.props.showDelete} variant="danger">
                    <Alert.Heading>{this.props.deleteTitle}</Alert.Heading>
                    <p>
                        {this.props.deleteBody}
                    </p>
                    <hr />
                    <div className="d-flex justify-content-end">
                    <Button onClick={this.delete} variant="outline-danger">
                        Si
                    </Button>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Button onClick={this.props.hideDelete} variant="outline-primary">
                        No
                    </Button>
                    </div>
                </Alert>
            </>
        )
    }
}

export default DeleteDialog;