import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Datepic from "../CustomComponents/DatePicker/DatePic";
import * as Constants from '../constants';
import CustomSelect from '../CustomComponents/CustomSelect'

class EditProductModal extends React.Component {
    constructor(props){
        super(props);
        this.updateProduct = this.updateProduct.bind(this)
    }

    updateProduct() {
        let formatedProduct = {};
        formatedProduct = this.props.product;
        formatedProduct["startDate"] = this.props.product.startDate;
        formatedProduct["endDate"] = this.props.product.endDate;
        formatedProduct["quantity"] = parseFloat(this.props.product.quantity);
        formatedProduct["interest"] = parseFloat(this.props.product.interest);
        this.props.currentId === 0 ? delete formatedProduct['idCampaign'] : formatedProduct['idCampaign'] = this.props.currentId
        fetch(Constants.PRODUCT_URL+this.props.product.id, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(formatedProduct)
        }).then((response) => {
            console.log(formatedProduct)
            return response.text();
        }).then(data => {
            console.log(data)
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
                }
            })
            this.props.onHide()
            this.props.getProducts()
            this.props.onShows()
            this.props.getCampaigns()
            //success adding client
        })
    }

    render() {
        return(
            <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Editar Producto
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Ingrese los datos del producto a editar</h4>
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
                                    <FormControl name="name" onChange={this.props.handleInputChange} value={this.props.product.name} placeholder="Ingrese el nombre del producto" />
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
                                        value={this.props.product.type}
                                        onChange={this.props.handleInputChange}
                                        name="type">
                                        <option value="0">Seleccione el genero...</option>
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
                                    <FormControl as="textarea" name="description" onChange={this.props.handleInputChange} value={this.props.product.description} placeholder="Ingrese la descripcion del producto" />
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
                                    <FormControl type="number" name="quantity" onChange={this.props.handleInputChange} value={this.props.product.quantity} placeholder="Ingrese la cantidad del producto" /> 
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
                                    <FormControl type="number" name="interest" onChange={this.props.handleInputChange} value={this.props.product.interest} placeholder="Ingrese el interes del producto" />
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
                                        value={this.props.product.status}
                                        onChange={this.props.handleInputChange}
                                        name="status">
                                        <option value="0">Seleccione el estado...</option>
                                        <option value="A">Activo</option>
                                        <option value="I">Inactivo</option>
                                    </Form.Control>
                                </InputGroup>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col sm={6} className="my-1">
                                <Form.Label htmlFor="inlineFormInputGroupUsername" srOnly>
                                    F. Inicio
                                </Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>F. Inicio</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Datepic dateSelected={new Date(this.props.product.startDate)} onChange={this.props.handleStartDateChange.bind(this)} placeholderText="Seleccione la fecha de inicio" /> 
                                </InputGroup>
                            </Col>
                            <Col sm={6} className="my-1">
                                <Form.Label htmlFor="inlineFormInputGroupUsername" srOnly>
                                    F. Final
                                </Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Interes</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Datepic dateSelected={new Date(this.props.product.endDate)} onChange={this.props.handleEndDateChange.bind(this)} placeholderText="Seleccione la fecha de fin" />
                                </InputGroup>
                            </Col>
                        </Form.Row>
                        <br></br>
                        <Form.Label htmlFor="inlineFormInputGroupUsername" srOnly>
                            Campaña
                        </Form.Label>
                        <CustomSelect value={this.props.campaigns.filter(option => option.value === this.props.currentId)} placeholder="Campaña" selectOptions={this.props.campaigns} onChange={this.props.handleChange} />
                    </Form>
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.updateProduct}>Editar</Button>
                    <Button variant="danger" onClick={this.props.onHide}>Cancelar</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    componentDidMount() {
        // let formatedClient = {}
        // formatedClient = this.props.client
        // formatedClient["birthdate"] = new Date(formatedClient["birthdate"]);
        this.setState({product: this.props.product})
        this.props.getCampaigns()
    }
}

export default EditProductModal;