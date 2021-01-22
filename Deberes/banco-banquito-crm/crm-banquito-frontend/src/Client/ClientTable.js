import React from "react";
import ReactDatatable from '@ashvin27/react-datatable';
import { orderBy } from 'lodash';
import * as Constants from '../constants';
import EditClientModal from "./EditClientModal";
import CustomAlert from '../CustomComponents/CustomAlert';
import DeleteDialog from '../CustomComponents/DeleteDialog';

class ClientTable extends React.Component {
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
                key: "birthdate",
                text: "F. Nacimiento",
                className: "birthdate",
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
                                onClick={this.editRecord.bind(this, record, index)}
                                style={{marginRight: '5px'}}>
                                    Editar
                            </button>
                            <button 
                                className="btn btn-danger btn-sm" 
                                onClick={this.deleteRecord.bind(this, record, index)}>
                                    Eliminar
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
            showDelete: false,
            province: {
                id: "",
                name: ""
            },
            canton: {
                id: "",
                name: ""
            },
            provinces: [],
            cantons: [],
            valid: true
        }
    }
    
    editRecord = (record, index) => {
        this.setState({client: record, modalShow: true});
        this.setState({
            variant: "success",
            alertTitle: "Actualización exitosa!",
            alertBody: "El cliente se ha actualizado exitosamente!"
        });
    }
    
    deleteRecord = (record, index) => {
        console.log("Delete record", index, record);
        this.setState({
            client: record,
            showDelete: true,
            deleteTitle: "Elminicaión de un Producto",
            deleteBody: "¿Está seguro que desea eliminar el cliente '"+record.name+" "+record.surname+"'?"
        })
    }

    deleteRegistry = r => {
        fetch(Constants.CLIENTS_URL+r.id, {
            method: 'DELETE'
        }).then(result => {
            result.text();
        }).then(response => {
            console.log('registry '+ r.id +' deleted')
            this.props.getClients();
        })
    }

    validateIdentification(id) {
        console.log(id)
        var total = 0;
        var lenght = id.length;
        var longcheck = lenght - 1;

        if (id !== "" && lenght === 10){
            for(var i = 0; i < longcheck; i++){
                if (i%2 === 0) {
                var aux = id.charAt(i) * 2;
                if (aux > 9) aux -= 9;
                total += aux;
                } else {
                total += parseInt(id.charAt(i));
                }
            }

            total = total % 10 ? 10 - total % 10 : 0;

            if (id.charAt(lenght-1) == total) {
                this.setState({valid: true})
            }else{
                this.setState({valid: false})
            }
        }else{
            this.setState({valid: false})
        }


    }

    handleInputChange = e => {
        console.log(e)
        let change = {}
        change = this.state.client
        change[e.target.name] = e.target.value
        this.setState({
            client: change
        })
        if([e.target.name] == "identification"){
            this.validateIdentification(e.target.value)
        }
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

    getProvinces() {
        fetch(Constants.PROVINCE_URL, {
            method: "GET"
        }).then(response => {
            return response.json()
        }).then(data => {
            const provinces = data.map(d => ({
                "value" : d.id,
                "label" : d.province
            }))
            this.setState({
                provinces
            })
        })
    }

    getCantons() {
        fetch(Constants.CANTON_URL, {
            method: "GET",
        }).then(response => {
            return response.json()
        }).then(data => {
            const cantons = data.map(d => ({
                "value" : d.id,
                "label" : d.canton
            }))
            this.setState({
                cantons
            })
        })
    }

    filterCantons(provinceId) {
        console.log(provinceId)
        fetch(Constants.CANTON_URL, {
            method: "GET",
            headers: {
                where: {
                    provinceId: provinceId
                }
            }
        }).then(response => {
            return response.json()
        }).then(data => {
            console.log(data)
            let filteredDate = data.filter(element => element.provinceId == provinceId);
            const cantons = filteredDate.map(d => ({
                "value" : d.id,
                "label" : d.canton
            }))
            this.setState({
                cantons
            })
        })
    }

    handleProvinceChange = e => {
        let tempClient = this.state.client
        tempClient.birthProvince = e.label
        this.setState({
            province: {
                id: e.value,
                name: e.label
            },
            client: tempClient
        }, function() {
            this.filterCantons(e.value)
        })
        console.log(this.state)
    } 

    handleCantonChange = e => {
        let tempClient = this.state.client
        tempClient.birthCanton = e.label
        this.setState({
            canton: {
                id: e.value,
                name: e.label
            },
            client: tempClient
        })
        console.log(this.state)
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
                <EditClientModal 
                    handleInputChange={this.handleInputChange.bind(this)} 
                    handleDateChange={this.handleDateChange.bind(this)} 
                    show={this.state.modalShow} 
                    client={this.state.client} 
                    onHide={() => {this.setState({modalShow: false}); this.props.getClients()}} 
                    getClients={this.props.getClients}
                    onShows={() => {this.setState({showAlert: true})}}
                    cantons={this.state.cantons}
                    provinces={this.state.provinces}
                    getProvinces={this.getProvinces}
                    getCantons={this.getCantons}
                    handleCantonChange={this.handleCantonChange}
                    handleProvinceChange={this.handleProvinceChange}
                    filterCantons={this.filterCantons.bind(this)}
                    valid={this.state.valid}
                />
            </div>
        );
    }

    componentWillUnmount() {
        this.getProvinces();
        this.getCantons();
    }

    componentDidMount() {
        this.getProvinces();
        this.getCantons();
    }
}

export default ClientTable;