/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ec.edu.espe.facturacionrest.api;

import ec.edu.espe.facturacionrest.model.Persona;
import ec.edu.espe.facturacionrest.repository.PersonaWS;
import ec.edu.espe.facturacionrest.repository.PersonaWS_Service;
import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * REST Web Service
 *
 * @author hendr
 */
@Path("persona")
public class PersonaResource {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of PersonaResource
     */
    public PersonaResource() {
    }

    /**
     * Retrieves representation of an instance of ec.edu.espe.facturacionrest.api.PersonaResource
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Persona> getJson() {
        PersonaWS_Service service = new PersonaWS_Service();
        PersonaWS port = service.getPersonaWSPort();
        List<ec.edu.espe.facturacionrest.repository.Persona> personas = port.listarTodas();
        List<Persona> personasModel = new ArrayList<>();
        for (ec.edu.espe.facturacionrest.repository.Persona persona : personas) {
            personasModel.add(this.buildPersona(persona));
        }
        return personasModel;
    }
    
    @GET
    @Path(value = "/{cedula}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getJson(@PathParam("cedula") String cedula) {
        PersonaWS_Service service = new PersonaWS_Service();
        PersonaWS port = service.getPersonaWSPort();
        ec.edu.espe.facturacionrest.repository.Persona persona = port.buscarPorCedula(cedula);
        if (persona!=null) {
            return Response.ok(this.buildPersona(persona)).build();
        } else {
            return Response.status(404).entity("Cliente con cedula "+cedula).build();
        }
    }
    

    /**
     * PUT method for updating or creating an instance of PersonaResource
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public void putJson(String content) {
    }
    
    private Persona buildPersona(ec.edu.espe.facturacionrest.repository.Persona persona) {
        Persona per = new Persona();
        per.setCedula(persona.getCedula());
        per.setNombre(persona.getNombre());
        per.setDireccion(per.getDireccion());
        per.setTelefono(per.getTelefono());
        return per;
    }
}
