import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import * as Constants from '../constants';
import AsignClientsTable from '../Client/AsignClientsTable';
import '../css/AsignClients.css'


class AsignClientsModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            campaign: {
                name: "",
                description: "",
            },
            provinces: [],
            cantons: [],
        }
        this.saveCampaign = this.saveCampaign.bind(this)
    }

    saveCampaign() {
        fetch(Constants.CAMPAIGN_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(this.state.campaign)
        }).then((response) => {
            return response.json();
        }).then(data => {
            this.setState({
                campaign: {
                    name: "",
                    description: ""
                }
            })
            this.props.onHide()
            this.props.getCampaigns()
            this.props.setAlertState(true)
            this.props.showAlert()
            //success adding client
        }).catch(e => {
            console.log(e)
            this.props.setAlertState(false)
        })
    }

    handleInputChange = e => {
        console.log(e)
        let change = {}
        change = this.state.campaign
        change[e.target.name] = e.target.value
        this.setState({
            campaign: change
        })
    }

    render() {
        return(
            <Modal {...this.props} dialogClassName="modal-90w" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Asignar Clientes
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Escoja los clientes que desea agregar a la campaña</h4>
                    <p>
                    <AsignClientsTable 
                        records={this.props.records}
                        campaignId={this.props.campaignId}
                        deleteRow={this.props.deleteRow}
                        
                    />
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.saveCampaign}>Agregar</Button>
                    <Button variant="danger" onClick={this.props.onHide}>Cancelar</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default AsignClientsModal;