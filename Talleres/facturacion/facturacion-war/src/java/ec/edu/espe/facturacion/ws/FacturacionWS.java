/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ec.edu.espe.facturacion.ws;

import ec.edu.espe.facturacion.model.Factura;
import ec.edu.espe.facturacion.services.FacturacionService;
import javax.ejb.EJB;
import javax.jws.Oneway;
import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;

/**
 *
 * @author hendr
 */
@WebService(serviceName = "FacturacionWS")
public class FacturacionWS {

    @EJB
    private FacturacionService service;

    @WebMethod(operationName = "crearFactura")
    public void crearFactura(@WebParam(name = "factura") Factura factura) {
        service.crearFactura(factura);
    }
    
}
