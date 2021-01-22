import React from "react";
import ReactDatatable from '@ashvin27/react-datatable';
import { orderBy } from 'lodash';
import * as Constants from '../constants';
import EditCampaignModal from "./EditCampaignModal";
import CustomAlert from '../CustomComponents/CustomAlert';
import DeleteDialog from '../CustomComponents/DeleteDialog';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import AsignClientsModal from "./AsignClientsModal";

class CampaignTable extends React.Component {
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
                                className="btn btn-primary btn-sm"
                                onClick={this.editRecord.bind(this, record, index)}
                                style={{marginRight: '5px'}}>
                                    <FontAwesomeIcon icon={faEdit}/> Editar
                            </button>
                            <button 
                                className="btn btn-danger btn-sm" 
                                onClick={this.deleteRecord.bind(this, record, index)}>
                                    <FontAwesomeIcon icon={faTrash}/> Eliminar
                            </button>
                            <span>&nbsp;&nbsp;</span>
                            <button 
                                className="btn btn-success btn-sm" 
                                onClick={this.asignClients.bind(this, record, index)}>
                                    <FontAwesomeIcon icon={faUser}/> Asignar Clientes
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
            asignModalShow: false,
            campaign: {},
            variant: "",
            alertBody: "",
            alertTitle: "",
            deleteBody: "",
            deleteTitle: "",
            showAlert: false,
            showDelete: false,
            clients: [],
            id: 0
        }
    }
    
    editRecord = (record, index) => {
        this.setState({campaign: record, modalShow: true});
        this.setState({
            variant: "success",
            alertTitle: "Actualización exitosa!",
            alertBody: "La campaña se ha actualizado exitosamente!"
        });
    }
    
    deleteRecord = (record, index) => {
        console.log("Delete record", index, record);
        this.setState({
            campaign: record,
            showDelete: true,
            deleteTitle: "Elminicaión de una Campaña",
            deleteBody: "¿Está seguro que desea eliminar la campaña '"+record.name+"'?"
        })
    }

    asignClients = (record, index) => {
        console.log(record)
        this.getClients()
        this.setState({
            asignModalShow: true,
            campaignId: record.id
        })
        fetch(Constants.CONTACTABILITY_URL, {
            method: "GET",
        }).then(response => {
            return response.json()
        }).then(data => {
            let filteredData = data.filter(element => element.idCampaign == record.id)
            console.log(filteredData)
            filteredData.forEach(element => {
                this.deleteRow(element.idClient)
            });
        })
    }

    getClients = () => {
        fetch(Constants.CLIENTS_URL).then((response) => {
            return response.json();
        }).then(data => {
            this.setState({clients: data});
        })
    }

    deleteRow = (clientId) => {
        let r = this.state.clients
        let index = r.findIndex(element => element.id == clientId)
        console.log(r.splice(index, 1))
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
                <AsignClientsModal 
                    show={this.state.asignModalShow}
                    records={this.state.clients}
                    onHide={() => this.setState({asignModalShow: false})} 
                    campaignId={this.state.campaignId}
                    deleteRow={this.deleteRow.bind(this)}
                />
                <EditCampaignModal 
                    handleInputChange={this.handleInputChange.bind(this)} 
                    show={this.state.modalShow} 
                    campaign={this.state.campaign} 
                    onHide={() => {this.setState({modalShow: false}); this.props.getCampaigns()}} 
                    getCampaigns={this.props.getCampaigns}
                    onShow={() => {this.setState({showAlert: true})}}
                />
            </div>
        );
    }

    componentDidMount() {
        this.getClients()
    }
}

export default CampaignTable;