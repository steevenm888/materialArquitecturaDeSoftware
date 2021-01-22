import React from "react";
import ClientTable from './ClientTable';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddClientModal from './AddClientModal';
import * as Constants from '../constants';
import CustomAlert from '../CustomComponents/CustomAlert';

class Client extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            modalShow: false,
            records: [],
            showAlert: false,
            variant: "",
            alertTitle: "",
            alertBody: ""
        }
        this.setAlertState = this.setAlertState.bind(this)
    }

    getClients = () => {
        fetch(Constants.CLIENTS_URL).then((response) => {
            return response.json();
        }).then(data => {
            this.setState({records: data});
        })
    }

    setAlertState = (saveState) => {
        console.log(saveState)
        if(saveState){
            this.setState({
                variant: "success",
                alertTitle: "Exito",
                alertBody: "Cliente guardado con exito!"
            })
        }else{
            this.setState({
                variant: "danger",
                alertTitle: "Error",
                alertBody: "Ha ocurrido un error al guardar el producto! Error: "
            })
        }
    }

    render() {
        return(
            <div style={{padding: "40px"}}>
                <div style={{paddingBottom: "20px"}}>
                    <Button variant="success" onClick={() => this.setState({modalShow: true})}><FontAwesomeIcon icon={faPlus}/> Nuevo Cliente</Button>
                </div>
                <CustomAlert 
                    show={this.state.showAlert}
                    onClose={() => {this.setState({showAlert: false})}}
                    variant={this.state.variant}
                    messageTitle="Creación de nuevo producto "
                    messageBody={this.state.alertBody} 
                    dismissible
                />
                <AddClientModal
                    onShow={() => {this.setState({showAlert: true})}} 
                    show={this.state.modalShow}
                    onHide={() => {this.setState({modalShow: false}); this.getClients()}}
                    getClients={this.getClients}
                    setAlertState={this.setAlertState}
                    showAlert={() => {this.setState({showAlert: true})}}
                />
                <ClientTable 
                    records={this.state.records}
                    getClients={this.getClients}
                />
            </div>
        );
    }

    componentDidMount() {
        this.getClients()
    }
}

export default Client;