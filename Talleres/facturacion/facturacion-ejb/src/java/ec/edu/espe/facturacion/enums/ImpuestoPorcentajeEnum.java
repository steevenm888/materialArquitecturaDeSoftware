/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ec.edu.espe.facturacion.enums;

/**
 *
 * @author hendr
 */
public enum ImpuestoPorcentajeEnum {
    
    IVA("12");
    
    private final String porcentaje;
    
    private ImpuestoPorcentajeEnum(String porcentaje) {
        this.porcentaje = porcentaje;
    }

    public String getPorcentaje() {
        return porcentaje;
    }
    
    
}
