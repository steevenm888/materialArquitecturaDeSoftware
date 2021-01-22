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

class EditClientModal extends React.Component {
    constructor(props){
        super(props);
        this.updateClient = this.updateClient.bind(this)
    }

    updateClient() {
        let formatedClient = {};
        formatedClient = this.props.client;
        formatedClient["birthdate"] = this.props.client.birthdate;
        formatedClient["balanceAccount"] = parseFloat(this.props.client.balanceAccount)
        formatedClient["balanceLoan"] = parseFloat(this.props.client.balanceLoan)
        fetch(Constants.CLIENTS_URL+this.props.client.id, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(formatedClient)
        }).then((response) => {
            console.log(formatedClient)
            return response.text();
        }).then(data => {
            this.setState({
                client: {
                    identification: "",
                    name: "",
                    surname: "",
                    birthdate: new Date(),
                    genre: "",
                    birthProvince: "",
                    birthCanton: "",
                    balanceAccount: 0,
                    balanceLoan: 0
                }
            })
            this.props.onHide()
            this.props.getClients()
            this.props.onShows()
            //success adding client
        })
    }

    cantonsFirstUpdate = () => {
        console.log(this.props.client.birthProvince)
        let tempProvince = this.props.provinces.find(element => element.label == this.props.client.birthProvince)
        console.log(tempProvince.value)
        this.props.filterCantons(tempProvince.value)
    }

    render() {
        console.log(this.props.client)
        return(
            <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Editar Cliente
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Ingrese los datos del cliente a editar</h4>
                    <p>
                    <Form>
                        <Form.Row className="align-items-center">
                            <Col sm={12} className="my-1">
                                <Form.Label htmlFor="inlineFormInputGroupUsername" srOnly>
                                    Cedula
                                </Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Cedula</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl name="identification" onChange={this.props.handleInputChange} value={this.props.client.identification} placeholder="Ingrese una cedula valida" />
                                </InputGroup>
                            </Col>
                        </Form.Row>
                        <br></br>
                        <Form.Row className="align-items-center">
                            <Col sm={6} className="my-1">
                                <Form.Label htmlFor="inlineFormInputGroupUsername" srOnly>
                                    Nombre
                                </Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Nombre</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl name="name" onChange={this.props.handleInputChange} value={this.props.client.name} placeholder="Ingrese el nombre del cliente" />
                                </InputGroup>
                            </Col>
                            <Col sm={6} className="my-1">
                                <Form.Label htmlFor="inlineFormInputGroupUsername" srOnly>
                                    Apellido
                                </Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Apellido</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl name="surname" onChange={this.props.handleInputChange} value={this.props.client.surname} placeholder="Ingrese el apellido del cliente" />
                                </InputGroup>
                            </Col>
                        </Form.Row>
                        <br></br>
                        <Form.Row>
                            <Col sm={6} className="my-1">
                                <Form.Label htmlFor="inlineFormInputGroupUsername" srOnly>
                                    F. Nacimiento
                                </Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>F. Nacimiento</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Datepic dateSelected={new Date(this.props.client.birthdate)} onChange={this.props.handleDateChange.bind(this)} placeholderText="Seleccione la fecha de nacimiento" /> 
                                </InputGroup>
                            </Col>
                            <Col sm={6} className="my-1">
                                <Form.Label htmlFor="inlineFormInputGroupUsername" srOnly>
                                    Genero
                                </Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Genero</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        as="select"
                                        className="my-1 mr-sm-2"
                                        custom
                                        value={this.props.client.genre}
                                        onChange={this.props.handleInputChange}
                                        name="genre">
                                        <option value="0">Seleccione el genero...</option>
                                        <option value="H">Masculino</option>
                                        <option value="M">Femenino</option>
                                    </Form.Control>
                                </InputGroup>
                            </Col>
                        </Form.Row>
                        <br></br>
                        <Form.Row className="align-items-center">
                            <Col sm={6} className="my-1">
                                <CustomSelect value={this.props.provinces.filter(option => option.label === this.props.client.birthProvince)} placeholder="Provincia" selectOptions={this.props.provinces} onChange={this.props.handleProvinceChange.bind(this)} />
                            </Col>
                            <Col sm={6} className="my-1">
                                <CustomSelect onMenuOpen={this.cantonsFirstUpdate} value={this.props.cantons.filter(option => option.label === this.props.client.birthCanton)} placeholder="Canton" selectOptions={this.props.cantons} onChange={this.props.handleCantonChange.bind(this)} />
                            </Col>
                        </Form.Row>
                    </Form>
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button disabled={!this.props.valid} variant="primary" onClick={this.updateClient}>Editar</Button>
                    <Button variant="danger" onClick={this.props.onHide}>Cancelar</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    componentDidMount() {
        // let formatedClient = {}
        // formatedClient = this.props.client
        // formatedClient["birthdate"] = new Date(formatedClient["birthdate"]);
        this.setState({client: this.props.client})
        console.log(this.props.provinces)
        let tempProvince = this.props.provinces.filter(element => element.label == this.props.client.birthProvince)
        this.props.filterCantons(tempProvince.value)
    }
}

export default EditClientModal;