/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ec.edu.espe.facturacion.services;

import ec.edu.espe.facturacion.dao.FacturaFacade;
import ec.edu.espe.facturacion.dao.PersonaFacade;
import ec.edu.espe.facturacion.dao.ProductoFacade;
import ec.edu.espe.facturacion.enums.ImpuestoPorcentajeEnum;
import ec.edu.espe.facturacion.model.Factura;
import ec.edu.espe.facturacion.model.FacturaDetalle;
import ec.edu.espe.facturacion.model.Persona;
import ec.edu.espe.facturacion.model.Producto;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Date;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ejb.LocalBean;

/**
 *
 * @author hendr
 */
@Stateless
@LocalBean
public class FacturacionService {

    @EJB
    private FacturaFacade facturaDao;
    @EJB
    private PersonaFacade personaDao;
    @EJB
    private ProductoFacade productoDao;

    public void crearFactura(Factura factura) {
        Persona persona = this.personaDao.find(factura.getCedula());
        if (persona != null) {
            factura.setFecha(new Date());
            BigDecimal subtotal = new BigDecimal("0.00");
            BigDecimal impuesto = new BigDecimal("0.00");
            for (FacturaDetalle detalle : factura.getDetalles()) {
                Producto producto = this.productoDao.find(detalle.getCodProducto());
                if (producto.getExistencia() >= detalle.getCantidad()) {
                    producto.setExistencia(producto.getExistencia() - detalle.getCantidad());
                    detalle.setSubtotal(producto.getPrecio().multiply(new BigDecimal(detalle.getCantidad())).setScale(2, RoundingMode.HALF_UP));
                    detalle.setImpuesto(detalle.getSubtotal().multiply(new BigDecimal(ImpuestoPorcentajeEnum.IVA.getPorcentaje())).setScale(2, RoundingMode.HALF_UP));
                    detalle.setCodProducto(producto.getCodProducto());
                    subtotal = subtotal.add(detalle.getSubtotal());
                    impuesto = impuesto.add(detalle.getImpuesto());
                    this.productoDao.edit(producto);
                }

            }
            factura.setSubtotal(subtotal);
            factura.setImpuesto(impuesto);
            factura.setTotal(factura.getSubtotal().add(factura.getImpuesto()));
            this.facturaDao.create(factura);

        } else {
            throw new RuntimeException("La cedula no esta registrada");
        }
    }

}
