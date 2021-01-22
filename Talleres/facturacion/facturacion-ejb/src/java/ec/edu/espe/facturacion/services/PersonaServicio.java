/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ec.edu.espe.facturacion.services;

import ec.edu.espe.facturacion.dao.PersonaFacade;
import ec.edu.espe.facturacion.model.Persona;
import java.util.List;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ejb.LocalBean;

/**
 *
 * @author hendr
 */
@Stateless
@LocalBean
public class PersonaServicio {

    @EJB
    private PersonaFacade personaDao;
    
    public Persona buscarPorCedula(String cedula) {
        return this.personaDao.find(cedula);
    }
    
    public List<Persona> listarTodas() {
        return this.personaDao.findAll();
    }
    
    public void crearPersona(Persona persona) {
        this.personaDao.create(persona);
    }
}
