import React from "react";
import ReactDatatable from '@ashvin27/react-datatable';
import { orderBy } from 'lodash';
import * as Constants from '../constants';
import CustomAlert from '../CustomComponents/CustomAlert';
import DeleteDialog from '../CustomComponents/DeleteDialog';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import ContactClientsModal from "./ContactClientsModal";

class ContactabilityTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                key: "id",
                text: "Nro",
                className: "id",
                sortable: true
            },
            {
                key: "name",
                text: "Nombre",
                sortable: true
            },
            {
                key: "description",
                text: "Descripcion",
                className: "description",
                sortable: true
            },
            {
                key: "action",
                text: "Action",
                cell: (record, index) => {
                    return (
                        <div>
                            <button 
                                className="btn btn-success btn-sm" 
                                onClick={this.contactClients.bind(this, record, index)}>
                                    <FontAwesomeIcon icon={faUsers}/> Registrar Contacto con Clientes
                            </button>
                        </div>
                    );
                }
            }
        ];
        this.config = {
            page_size: 10,
            length_menu: [10, 20, 50],
            show_filter: true,
            show_pagination: true,
            filename: "campaigns",
            language: {
                length_menu: "Mostrar _MENU_ registros por página",
                filter: "Buscar en registros ...",
                info: "Mostrando _START_ a _END_ de _TOTAL_ entradas",
                pagination: {
                    first: "Primero",
                    previous: "Previa",
                    next: "próximo",
                    last: "Última"
                }
            }
        }
        this.state = {
            modalShow: false,
            contactModalShow: false,
            campaign: {},
            variant: "",
            alertBody: "",
            alertTitle: "",
            deleteBody: "",
            deleteTitle: "",
            showAlert: false,
            showDelete: false,
            clients: [],
            asignedClients: [],
            currentRecord: {},
            id: 0
        }
    }

    contactClients = (record, index) => {
        console.log(record)
        if(record){
            this.setState({
                asignModalShow: true,
                campaignId: record.id
            })
        }
        
        fetch(Constants.CONTACTABILITY_URL, {
            method: "GET",
            
        }).then(response => {
            return response.json()
        }).then(data => {
            console.log(data)
            let filteredData = data.filter(element => element.idCampaign === this.state.campaignId)
            let asignedClients = []
            let cont = 0;
            filteredData.forEach(element => {
                asignedClients.push(this.state.clients[element.idClient-1])
                asignedClients[cont].answer = element.answer ? "Si" : "No"
                cont++
                // this.deleteRow(element.idClient-1)
            });
            console.log(asignedClients)
            this.setState({contactModalShow: true, asignedClients})
            this.getClients()
        })
    }

    getClients = () => {
        fetch(Constants.CLIENTS_URL).then((response) => {
            return response.json();
        }).then(data => {
            this.setState({clients: data});
        })
    }

    deleteRow = (index) => {
        let r = this.state.clients
        r.splice(index, 1)
        this.setState({
            clients: r
        })
    }

    deleteRegistry = r => {
        fetch(Constants.CAMPAIGN_URL+r.id, {
            method: 'DELETE'
        }).then(result => {
            result.text();
        }).then(response => {
            console.log('registry '+ r.id +' deleted')
            this.props.getCampaigns();
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
    
    onSort = (column, records, sortOrder) => {
        return orderBy(records, [column], [sortOrder]);
    }
    
    render() {
        
        return (
            <div>
                <CustomAlert 
                    show={this.state.showAlert}
                    onClose={() => {this.setState({showAlert: false})}}
                    variant={this.state.variant}
                    messageTitle={this.state.alertTitle}
                    messageBody={this.state.alertBody} 
                    dismissible
                />
                <div className="container">
                    <DeleteDialog 
                        showDelete={this.state.showDelete}
                        hideDelete={() => {this.setState({showDelete: false})}}
                        deleteTitle={this.state.deleteTitle}
                        deleteBody={this.state.deleteBody}
                        deleteRegistry={this.deleteRegistry}
                        record={this.state.campaign}
                    />
                </div>
                <ReactDatatable
                    config={this.config}
                    records={this.props.records}
                    columns={this.columns}
                    onSort={this.onSort}
                />
                <ContactClientsModal 
                    show={this.state.contactModalShow}
                    records={this.state.asignedClients}
                    onHide={() => this.setState({contactModalShow: false})} 
                    campaignId={this.state.campaignId}
                    deleteRow={this.deleteRow.bind(this)}
                    contactClients={this.contactClients}
                />
            </div>
        );
    }

    componentDidMount() {
        this.getClients()
    }
}

export default ContactabilityTable;