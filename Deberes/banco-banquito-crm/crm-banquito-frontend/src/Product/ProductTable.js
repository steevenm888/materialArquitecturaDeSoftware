import React from "react";
import ReactDatatable from '@ashvin27/react-datatable';
import { initial, orderBy } from 'lodash';
import * as Constants from '../constants';
import EditProductModal from "./EditProductModal";
import CustomAlert from '../CustomComponents/CustomAlert';
import DeleteDialog from '../CustomComponents/DeleteDialog';

class ProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                key: "id",
                text: "Nro",
                className: "id",
                sortable: true,
                width: 0
            },
            {
                key: "name",
                text: "Nombre",
                sortable: true
            },
            {
                key: "type",
                text: "Tipo",
                className: "type",
                sortable: true
            },
            {
                key: "description",
                text: "Descripción",
                className: "description",
                sortable: true
            },
            {
                key: "quantity",
                text: "Cantidad",
                className: "quantity",
                sortable: true
            },
            {
                key: "interest",
                text: "Interes",
                className: "interest",
                sortable: true
            },
            {
                key: "status",
                text: "Estado",
                className: "status",
                sortable: true
            },
            {
                key: "startDate",
                text: "F. Inicio",
                className: "startDate",
                sortable: true
            },
            {
                key: "endDate",
                text: "F. Fin",
                className: "endDate",
                sortable: true
            },
            {
                key: "idCampaign",
                text: "ID Campaña",
                className: "id_campaign",
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
            filename: "products",
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
            product: {},
            variant: "",
            alertBody: "",
            alertTitle: "",
            deleteBody: "",
            deleteTitle: "",
            showAlert: false,
            showDelete: false,
            campaigns: [],
            id: 0,
            name: ""
        }
    }
    
    editRecord = (record, index) => {
        this.setState({product: record, modalShow: true});
        this.setState({
            variant: "success",
            alertTitle: "Actualización exitosa!",
            alertBody: "El producto se ha actualizado exitosamente!",
            id: record.idCampaign
        });
        console.log(this.state.id)
    }
    
    deleteRecord = (record, index) => {
        this.setState({
            product: record,
            showDelete: true,
            deleteTitle: "Elminicaión de un Producto",
            deleteBody: "¿Está seguro que desea eliminar el producto '"+record.name+"'?"
        })
    }

    deleteRegistry = r => {
        fetch(Constants.PRODUCT_URL+r.id, {
            method: 'DELETE'
        }).then(result => {
            result.text();
        }).then(response => {
            console.log('registry '+ r.id +' deleted')
            this.props.getProducts();
        })
    }

    handleInputChange = e => {
        console.log(e)
        let change = {}
        change = this.state.product
        change[e.target.name] = e.target.value
        this.setState({
            product: change
        })
    }

    handleStartDateChange = e => {
        console.log(e)
        let change = {}
        change = this.state.product
        change["startDate"] = e.toISOString()
        this.setState({
            product: change
        })
    }

    handleEndDateChange = e => {
        console.log(e)
        let change = {}
        change = this.state.product
        change["endDate"] = e.toISOString()
        this.setState({
            product: change
        })
    }

    getCampaigns = () => {
        fetch(Constants.CAMPAIGN_URL).then((response) => {
            return response.json();
        }).then(data => {
            const options = data.map(d => ({
                "value" : d.id,
                "label" : d.name
          
            }))
            console.log(options)
            this.setState({campaigns: [{"value": 0, "label": "Ninguna"}].concat(options)});
            
        })
    }

    handleChange = e => {
        console.log('change')
        this.setState({
            id: e.value,
            name: e.label
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
                <div className="container">
                    <DeleteDialog 
                        showDelete={this.state.showDelete}
                        hideDelete={() => {this.setState({showDelete: false})}}
                        deleteTitle={this.state.deleteTitle}
                        deleteBody={this.state.deleteBody}
                        deleteRegistry={this.deleteRegistry}
                        record={this.state.product}
                    />
                </div>
                <ReactDatatable
                    config={this.config}
                    records={this.props.records}
                    columns={this.columns}
                    onSort={this.onSort}
                    
                />
                <EditProductModal 
                    onShows={() => this.setState({showAlert: true})}
                    handleInputChange={this.handleInputChange.bind(this)} 
                    handleStartDateChange={this.handleStartDateChange.bind(this)} 
                    handleEndDateChange={this.handleEndDateChange.bind(this)}
                    show={this.state.modalShow} 
                    product={this.state.product} 
                    onHide={() => {this.setState({modalShow: false}); this.props.getProducts()}} 
                    getProducts={this.props.getProducts}
                    handleChange={this.handleChange.bind(this)}
                    campaigns={this.state.campaigns}
                    getCampaigns={this.getCampaigns.bind(this)}
                    currentId={this.state.id}
                />
            </div>
        );
    }

    // componentDidMount() {
    //     this.getProducts()
    // }
}

export default ProductTable;