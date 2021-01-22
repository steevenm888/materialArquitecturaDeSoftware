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

class AddClientModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
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
            },
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
            valid: false
        }
        this.saveClient = this.saveClient.bind(this)
    }

    saveClient() {
        let formatedClient = {};
        formatedClient = this.state.client;
        formatedClient["birthdate"] = this.state.client.birthdate.toISOString();
        fetch(Constants.CLIENTS_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(formatedClient)
        }).then((response) => {
            console.log(formatedClient)
            return response.json();
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
            this.props.setAlertState(true)
            this.props.showAlert()
            //success adding client
        }).catch(e => {
            console.log(e)
            this.props.setAlertState(false)
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
        let change = {}
        change = this.state.client
        change["birthdate"] = e
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

    render() {
        return(
            <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Nuevo Cliente
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Ingrese los datos del cliente a ingresar</h4>
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
                                    <FormControl name="identification" onChange={this.handleInputChange} value={this.state.client.identification} placeholder="Ingrese una cedula valida" />
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
                                    <FormControl name="name" onChange={this.handleInputChange} value={this.state.client.name} placeholder="Ingrese el nombre del cliente" />
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
                                    <FormControl name="surname" onChange={this.handleInputChange} value={this.state.client.surname} placeholder="Ingrese el apellido del cliente" />
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
                                    <Datepic dateSelected={this.state.client.birthdate} onChange={this.handleDateChange.bind(this)} placeholderText="Seleccione la fecha de nacimiento" /> 
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
                                        value={this.state.client.genre}
                                        onChange={this.handleInputChange}
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
                                <CustomSelect placeholder="Provincia" selectOptions={this.state.provinces} onChange={this.handleProvinceChange.bind(this)} />
                            </Col>
                            <Col sm={6} className="my-1">
                                <CustomSelect placeholder="Canton" selectOptions={this.state.cantons} onChange={this.handleCantonChange.bind(this)} />
                            </Col>
                        </Form.Row>
                    </Form>
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button disabled={!this.state.valid} variant="primary" onClick={this.saveClient}>Agregar</Button>
                    <Button variant="danger" onClick={this.props.onHide}>Cancelar</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    componentDidMount() {
        this.getProvinces()
    }
}

export default AddClientModal;