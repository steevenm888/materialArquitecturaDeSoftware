/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ec.edu.espe.facturacion.ws;

import ec.edu.espe.facturacion.model.Persona;
import ec.edu.espe.facturacion.services.PersonaServicio;
import java.util.List;
import java.util.logging.Logger;
import javax.ejb.EJB;
import javax.jws.Oneway;
import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;

/**
 *
 * @author hendr
 */
@WebService(serviceName = "PersonaWS")
public class PersonaWS {
    
    private static final Logger LOG = Logger.getLogger(PersonaWS.class.getName());
    
    @EJB
    private PersonaServicio service;
    

    @WebMethod(operationName = "buscarPorCedula")
    public Persona buscarPorCedula(@WebParam(name = "cedula") String cedula) {
        LOG.info("Iniciando bisqueda de persona con cedula: "+ cedula);
        return service.buscarPorCedula(cedula);
    }

    @WebMethod(operationName = "listarTodas")
    public List<Persona> listarTodas() {
        LOG.info("Iniciando listar todas las personas");
        return service.listarTodas();
    }

    @WebMethod(operationName = "crearPersona")
    @Oneway
    public void crearPersona(@WebParam(name = "persona") Persona persona) {
        LOG.info("Iniciando crear persona "+ persona);
        service.crearPersona(persona);
    }
    
    
}
