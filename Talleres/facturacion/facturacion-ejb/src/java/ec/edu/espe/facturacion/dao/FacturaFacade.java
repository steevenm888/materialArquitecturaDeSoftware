/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ec.edu.espe.facturacion.dao;

import ec.edu.espe.facturacion.model.Factura;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author hendr
 */
@Stateless
public class FacturaFacade extends AbstractFacade<Factura> {

    public FacturaFacade() {
        super(Factura.class);
    }
    
}
