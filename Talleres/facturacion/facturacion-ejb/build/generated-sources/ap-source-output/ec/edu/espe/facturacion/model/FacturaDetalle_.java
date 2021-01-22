package ec.edu.espe.facturacion.model;

import ec.edu.espe.facturacion.model.Factura;
import ec.edu.espe.facturacion.model.Producto;
import java.math.BigDecimal;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2021-01-15T16:06:05")
@StaticMetamodel(FacturaDetalle.class)
public class FacturaDetalle_ { 

    public static volatile SingularAttribute<FacturaDetalle, BigDecimal> total;
    public static volatile SingularAttribute<FacturaDetalle, String> codProducto;
    public static volatile SingularAttribute<FacturaDetalle, BigDecimal> precioUnitario;
    public static volatile SingularAttribute<FacturaDetalle, BigDecimal> impuesto;
    public static volatile SingularAttribute<FacturaDetalle, Factura> factura;
    public static volatile SingularAttribute<FacturaDetalle, Integer> codDetalle;
    public static volatile SingularAttribute<FacturaDetalle, BigDecimal> subtotal;
    public static volatile SingularAttribute<FacturaDetalle, Integer> cantidad;
    public static volatile SingularAttribute<FacturaDetalle, Producto> producto;

}