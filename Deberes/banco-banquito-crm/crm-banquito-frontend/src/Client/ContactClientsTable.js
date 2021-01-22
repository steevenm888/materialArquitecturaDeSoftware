import React from "react";
import ReactDatatable from '@ashvin27/react-datatable';
import { orderBy } from 'lodash';
import * as Constants from '../constants';
import EditClientModal from "./EditClientModal";
import CustomAlert from '../CustomComponents/CustomAlert';
import DeleteDialog from '../CustomComponents/DeleteDialog';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCross, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

class ContactClientsTable extends React.Component {
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
                key: "identification",
                text: "Cedula",
                sortable: true
            },
            {
                key: "name",
                text: "Nombre",
                className: "name",
                sortable: true
            },
            {
                key: "surname",
                text: "Apellido",
                className: "surname",
                sortable: true
            },
            {
                key: "genre",
                text: "Genero",
                className: "genre",
                sortable: true
            },
            {
                key: "birthProvince",
                text: "Provincia",
                className: "bithProvince",
                sortable: true
            },
            {
                key: "birthCanton",
                text: "Canton",
                className: "bithCanton",
                sortable: true
            },
            {
                key: "balanceAccount",
                text: "Balance",
                className: "balanceAccount",
                sortable: true
            },
            {
                key: "balanceLoan",
                text: "Deuda",
                className: "balanceLoan",
                sortable: true
            },
            {
                key: "answer",
                text: "Respuesta",
                className: "answer",
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
                                onClick={this.contactClientYes.bind(this, record, index)}
                                style={{marginRight: '5px'}}>
                                    <FontAwesomeIcon icon={faCheck}/> Si
                            </button>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={this.contactClientNo.bind(this, record, index)}
                                style={{marginRight: '5px'}}>
                                    <FontAwesomeIcon icon={faTimes}/> No
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
            filename: "clients",
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
            client: {},
            variant: "",
            alertBody: "",
            alertTitle: "",
            showAlert: false,
            showDelete: false,
            contactabilityId: 0
        }
        this.getContactabilityId = this.getContactabilityId.bind(this)
    }

    getContactabilityId(idClient, idCampaign, contactability) {
        fetch(Constants.CONTACTABILITY_URL, {
            headers: {
                where: {
                    idCampaign: idCampaign
                }
            }
        }).then(response => {
            return response.json()
        }).then(data => {
            const targetContactClient = data.filter(contactability => contactability.idClient === idClient)
            const tempId = targetContactClient[0].id;
            this.setState({contactabilityId: tempId}, function() {
                fetch(Constants.CONTACTABILITY_URL+this.state.contactabilityId, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(contactability)
                }).then(response => {
                    return response.text()
                }).then(data => {
                    this.setState({
                        showAlert: true,
                        variant: "success",
                        alertTitle: "Exito!",
                        alertBody: "Se ha actulizado el contacto con el cliente con exito"
                    })
                    this.props.contactClients()
                })
            })
            
        })
        
    }
    
    contactClientYes = async (record, index) => {
        let contactability = {}
        contactability["idClient"] = record.id
        contactability["idCampaign"] = this.props.campaignId
        contactability["answer"] = true
        this.getContactabilityId(record.id, this.props.campaignId, contactability)
        console.log(this.state.contactabilityId)
    }

    contactClientNo = async (record, index) => {
        let contactability = {}
        contactability["idClient"] = record.id
        contactability["idCampaign"] = this.props.campaignId
        contactability["answer"] = false
        this.getContactabilityId(record.id, this.props.campaignId, contactability)
    }
    
    onSort = (column, records, sortOrder) => {
        return orderBy(records, [column], [sortOrder]);
    }
    
    // getClients() {
    //     fetch(Constants.GET_CLIENTS).then((response) => {
    //         return response.json();
    //     }).then(data => {
    //         this.setState({records: data});
    //     })
    // }
    
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
                        record={this.state.client}
                    />
                </div>
                <ReactDatatable
                    config={this.config}
                    records={this.props.records}
                    columns={this.columns}
                    onSort={this.onSort}
                />
            </div>
        );
    }

    // componentDidMount() {
    //     this.getClients()
    // }
}

export default ContactClientsTable;