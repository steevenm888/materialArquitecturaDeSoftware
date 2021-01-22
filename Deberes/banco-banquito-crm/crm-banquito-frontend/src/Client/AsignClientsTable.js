import React from "react";
import ReactDatatable from '@ashvin27/react-datatable';
import { orderBy } from 'lodash';
import * as Constants from '../constants';
import CustomAlert from '../CustomComponents/CustomAlert';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

class AsignClientsTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                key: "id",
                text: "ID",
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
                key: "action",
                text: "Action",
                cell: (record, index) => {
                    return (
                        <div>
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={this.asignClient.bind(this, record, index)}
                                style={{marginRight: '5px'}}>
                                    <FontAwesomeIcon icon={faPlus}/> Agregar
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
            deleteBody: "",
            deleteTitle: "",
            showAlert: false,
            showDelete: false
        }
    }
    
    asignClient = (record, index) => {
        this.setState({client: record});
        let contactability = {}
        contactability["idClient"] = record.id
        contactability["idCampaign"] = this.props.campaignId
        contactability["answer"] = false
        fetch(Constants.CONTACTABILITY_URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(contactability)
        }).then(response => {
            return response.json()
        }).then(data => {
            this.props.deleteRow(record.id)
            this.setState({
                showAlert: true,
                variant: "success",
                alertTitle: "Exito",
                alertBody: "El cliente se ha registrado con exito en la campaña"
            })
        })
    }

    handleInputChange = e => {
        console.log(e)
        let change = {}
        change = this.state.client
        change[e.target.name] = e.target.value
        this.setState({
            client: change
        })
    }

    handleDateChange = e => {
        console.log(e)
        console.log(this.state.client)
        let change = {}
        change = this.state.client
        change["birthdate"] = e.toISOString();
        console.log(change)
        this.setState({
            client: change
        })
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

export default AsignClientsTable;