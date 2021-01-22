/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.transsactions.generator;

import java.util.Date;
import org.bson.Document;

/**
 *
 * @author esteban
 */
public class Transaction {
    public enum Transactions_Subtype {DEPOSITO, TRANSFERENCIAS_RECIBIDAS, RETIRO, TRANSFERENCIA_DIRECTA, TRANSFERENCIA_OTROS_BANCOS, RETIRO_ATM, PAGO_SERVICIOS, PAGO_TC1, PAGO_TC2};
    public enum Transactions_Type {CREDITO, DEBITO}
    
    private String id;
    private int client_id;
    private Date date;
    private Transactions_Subtype transaction_subtype;
    private Transactions_Type transaction_type;
    private double amount;

    public Transaction(int client_id, Date date, double amount, Transactions_Subtype transaction_subtype, Transactions_Type transaction_type) {
        this.id = null;
        this.client_id = client_id;
        this.date = date;
        this.amount = amount;
        this.transaction_subtype = transaction_subtype;
        this.transaction_type = transaction_type;
    }
    
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getClient_id() {
        return client_id;
    }

    public void setClient_id(int client_id) {
        this.client_id = client_id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
    }
    
    // metodo que retorna un documento a partir del objeto instanciado para guardarlo en mongodb
    public Document toDocument(){
        return new Document("client_id", this.client_id)
            .append("date", this.date)
            .append("transaction_type", this.transaction_type.toString())
            .append("transaction_subtype", this.transaction_subtype.toString())
            .append("amount", this.amount);
    }
    
}
