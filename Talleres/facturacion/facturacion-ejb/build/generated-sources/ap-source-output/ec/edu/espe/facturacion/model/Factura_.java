package ec.edu.espe.facturacion.model;

import ec.edu.espe.facturacion.model.FacturaDetalle;
import ec.edu.espe.facturacion.model.Persona;
import java.math.BigDecimal;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2021-01-15T16:06:05")
@StaticMetamodel(Factura.class)
public class Factura_ { 

    public static volatile SingularAttribute<Factura, Date> fecha;
    public static volatile SingularAttribute<Factura, Integer> codigo;
    public static volatile SingularAttribute<Factura, BigDecimal> total;
    public static volatile SingularAttribute<Factura, BigDecimal> impuesto;
    public static volatile SingularAttribute<Factura, BigDecimal> subtotal;
    public static volatile SingularAttribute<Factura, Persona> cedula;
    public static volatile ListAttribute<Factura, FacturaDetalle> detalles;

}