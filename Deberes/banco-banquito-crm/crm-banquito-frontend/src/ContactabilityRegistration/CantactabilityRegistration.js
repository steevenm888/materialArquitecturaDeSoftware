import React from "react";
import ContactabilityTable from './ContactabilityTable';
import * as Constants from '../constants';
import CustomAlert from '../CustomComponents/CustomAlert';

class ContactabilityRegistration extends React.Component {
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
                
                <CustomAlert 
                    show={this.state.showAlert}
                    onClose={() => {this.setState({showAlert: false})}}
                    variant={this.state.variant}
                    messageTitle="Creación de nuevo producto "
                    messageBody={this.state.alertBody} 
                    dismissible
                />
                
                <ContactabilityTable 
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

export default ContactabilityRegistration;