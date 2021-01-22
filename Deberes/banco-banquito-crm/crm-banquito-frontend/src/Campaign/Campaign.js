import React from "react";
import CampaignTable from './CampaignTable';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddCampaignModal from './AddCampaignModal';
import * as Constants from '../constants';
import CustomAlert from '../CustomComponents/CustomAlert';

class Campaign extends React.Component {
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

    getCampaigns = () => {
        fetch(Constants.CAMPAIGN_URL).then((response) => {
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
                alertBody: "Campaña guardada con exito!"
            })
        }else{
            this.setState({
                variant: "danger",
                alertTitle: "Error",
                alertBody: "Ha ocurrido un error al guardar la campaña!"
            })
        }
    }

    render() {
        return(
            <div style={{padding: "40px"}}>
                <div style={{paddingBottom: "20px"}}>
                    <Button variant="success" onClick={() => this.setState({modalShow: true})}><FontAwesomeIcon icon={faPlus}/> Nueva Campaña</Button>
                </div>
                <CustomAlert 
                    show={this.state.showAlert}
                    onClose={() => {this.setState({showAlert: false})}}
                    variant={this.state.variant}
                    messageTitle={this.state.alertTitle}
                    messageBody={this.state.alertBody} 
                    dismissible
                />
                <AddCampaignModal
                    onShow={() => {this.setState({showAlert: true})}} 
                    show={this.state.modalShow}
                    onHide={() => {this.setState({modalShow: false}); this.getCampaigns()}}
                    getCampaigns={this.getCampaigns}
                    setAlertState={this.setAlertState}
                    showAlert={() => {this.setState({showAlert: true})}}
                />
                
                <CampaignTable 
                    records={this.state.records}
                    getCampaigns={this.getCampaigns}
                />
            </div>
        );
    }

    componentDidMount() {
        this.getCampaigns()
    }
}

export default Campaign;