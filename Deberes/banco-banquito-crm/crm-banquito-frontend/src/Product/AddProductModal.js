import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Datepic from "../CustomComponents/DatePicker/DatePic";
import * as Constants from '../constants';
import CustomSelect from '../CustomComponents/CustomSelect';

class AddProductModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            product: {
                name: "",
                type: "",
                description: "",
                quantity: 0,
                interest: 0,
                status: "",
                startDate: new Date(),
                endDate: new Date(),
                idCampaign: null
            },
            campaigns: [],
            id: 0,
            name: ""
        }
        this.saveProduct = this.saveProduct.bind(this)
    }

    saveProduct() {
        let formatedProduct = {};
        formatedProduct = this.state.product;
        formatedProduct["startDate"] = this.state.product.startDate.toISOString();
        formatedProduct["endDate"] = this.state.product.endDate.toISOString();
        formatedProduct["quantity"] = parseFloat(this.state.product.quantity);
        formatedProduct["interest"] = parseFloat(this.state.product.interest);
        this.state.id === 0 ? delete formatedProduct["idCampaign"] : formatedProduct["idCampaign"] = this.state.id
        console.log(formatedProduct)
        fetch(Constants.PRODUCT_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(formatedProduct)
        }).then((response) => {
            console.log(response)
            return response.json();
        }).then(data => {
            this.setState({
                product: {
                    name: "",
                    type: "",
                    description: "",
                    quantity: 0,
                    interest: 0,
                    status: "",
                    startDate: new Date(),
                    endDate: new Date(),
                },
                campaigns: [],
                id: "",
                name: ""
            })
            this.props.onHide()
            this.props.getProducts()
            this.props.setAlertState(true)
            this.props.showAlert()
            this.getCampaigns()
            //success adding client
        }).catch(e => {
            console.log(e)
            this.props.setAlertState(false)
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
        change["startDate"] = e
        this.setState({
            product: change
        })
    }

    handleEndDateChange = e => {
        console.log(e)
        let change = {}
        change = this.state.product
        change["endDate"] = e
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
        this.setState({
            id: e.value,
            name: e.label
        })
    } 

    render() {
        return(
            <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Nuevo Producto
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Ingrese los datos del producto a agregar</h4>
                    <p>
                    <Form>
                        <Form.Row className="align-items-center">
                            <Col sm={6} className="my-1">
                                <Form.Label htmlFor="inlineFormInputGroupUsername" srOnly>
                                    Nombre
                                </Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Nombre</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl name="name" onChange={this.handleInputChange} value={this.state.product.name} placeholder="Ingrese el nombre del producto" />
                                </InputGroup>
                            </Col>
                            <Col sm={6} className="my-1">
                                <Form.Label htmlFor="inlineFormInputGroupUsername" srOnly>
                                    Tipo
                                </Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Tipo</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        as="select"
                                        className="my-1 mr-sm-2"
                                        custom
                                        value={this.state.product.type}
                                        onChange={this.handleInputChange}
                                        name="type">
                                        <option value="0">Seleccione el tipo...</option>
                                        <option value="P">Prestamo</option>
                                        <option value="S">Seguro</option>
                                    </Form.Control>
                                </InputGroup>
                            </Col>
                        </Form.Row>
                        <br></br>
                        <Form.Row className="align-items-center">
                            <Col sm={12} className="my-1">
                                <Form.Label htmlFor="inlineFormInputGroupUsername" srOnly>
                                    Descripción
                                </Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Descripción</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl as="textarea" name="description" onChange={this.handleInputChange} value={this.state.product.description} placeholder="Ingrese la descripcion del producto" />
                                </InputGroup>
                            </Col>
                        </Form.Row>
                        <br></br>
                        <Form.Row>
                            <Col sm={6} className="my-1">
                                <Form.Label htmlFor="inlineFormInputGroupUsername" srOnly>
                                    Cantidad
                                </Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Cantidad</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl type="number" name="quantity" onChange={this.handleInputChange} value={this.state.product.quantity} placeholder="Ingrese la cantidad del producto" /> 
                                </InputGroup>
                            </Col>
                            <Col sm={6} className="my-1">
                                <Form.Label htmlFor="inlineFormInputGroupUsername" srOnly>
                                    Interes
                                </Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Interes</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl type="number" name="interest" onChange={this.handleInputChange} value={this.state.product.interest} placeholder="Ingrese el interes del producto" />
                                </InputGroup>
                            </Col>
                        </Form.Row>
                        <br></br>
                        <Form.Row className="align-items-center">
                            <Col sm={12} className="my-1">
                                <Form.Label htmlFor="inlineFormInputGroupUsername" srOnly>
                                    Estado
                                </Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Estado</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        as="select"
                                        className="my-1 mr-sm-2"
                                        custom
                                        value={this.state.product.status}
                                        onChange={this.handleInputChange}
                                        name="status">
                                        <option value="0">Escoja una opcion...</option>
                                        <option value="A">Activo</option>
                                        <option value="I">Inactivo</option>
                                    </Form.Control>
                                </InputGroup>
                            </Col>
                        </Form.Row>
                        <br></br>
                        <Form.Row>
                            <Col sm={6} className="my-1">
                                <Form.Label htmlFor="inlineFormInputGroupUsername" srOnly>
                                    F. Inicio
                                </Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>F. Inicio</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Datepic dateSelected={this.state.product.startDate} onChange={this.handleStartDateChange.bind(this)} placeholderText="Seleccione la fecha de inicio" /> 
                                </InputGroup>
                            </Col>
                            <Col sm={6} className="my-1">
                                <Form.Label htmlFor="inlineFormInputGroupUsername" srOnly>
                                    F. Final
                                </Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>F. Final</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Datepic dateSelected={this.state.product.endDate} onChange={this.handleEndDateChange.bind(this)} placeholderText="Seleccione la fecha de fin" />
                                </InputGroup>
                            </Col>
                        </Form.Row>
                        <br></br>
                        <Form.Label htmlFor="inlineFormInputGroupUsername" srOnly>
                            Campaña
                        </Form.Label>
                        <CustomSelect placeholder="Campaña" selectOptions={this.state.campaigns} onChange={this.handleChange.bind(this)} />
                    </Form>
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.saveProduct}>Agregar</Button>
                    <Button variant="danger" onClick={this.props.onHide}>Cancelar</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    componentDidMount() {
        this.getCampaigns();
    }
}

export default AddProductModal;