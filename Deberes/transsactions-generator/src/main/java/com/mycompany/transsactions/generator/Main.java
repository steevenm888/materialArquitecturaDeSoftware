/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.transsactions.generator;

/**
 *
 * @author esteban
 */

import com.mongodb.*;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;

import com.mongodb.client.model.UpdateOptions;
import com.mongodb.client.result.*;
import org.bson.Document;
import org.bson.types.ObjectId;

import java.util.List;
import java.util.Arrays;
import java.util.ArrayList;

import static com.mongodb.client.model.Filters.*;
import static com.mongodb.client.model.Updates.*;
import static com.mycompany.transsactions.generator.Main.randomDate;
import java.time.LocalDate;
import java.util.Date;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;
import java.time.LocalDate;
import java.util.Calendar;
import java.util.Iterator;
import java.util.concurrent.CountDownLatch;
import java.util.stream.Collectors;

class generatorThread extends Thread {
    
    private int transactionsToGenerate;
    private ArrayList<Document> initialTransactions;
    private double[] availableBalance;
    private float clientsPercent;
    private float transactionsPercent;
    private int initialID;
    private int maxID;
    private String s;
    
    public generatorThread (String s, float clientsPercent, float transactionsPercent, int initialID, int maxId, ArrayList<Document> initialTransactions, double[] availableBalance) { 
        super(s); 
        this.s = s;
        this.clientsPercent = clientsPercent;
        this.transactionsPercent = transactionsPercent;
        this.initialID = initialID;
        this.maxID = maxId;
        this.initialTransactions = initialTransactions;
        this.availableBalance = availableBalance;
    }

    public void run() { 
        System.out.println(s + " is running");
        randomTransactions(this.clientsPercent, this.transactionsPercent, this.initialID, this.maxID);
    } 
    
    public void randomTransactions(float clientsPercent, float transactionsPercent, int initialID, int maxId){
        
        // Creamos un array local con todas las transacciones que hagamos en cada interaccion para ahorrar memoria al acabar la generacion de un bloque
        ArrayList<Document> transactionsArray = new ArrayList<Document>();
        float totalClients = 500000*(clientsPercent/100);
        float totalConstraintTransactions = 13000000*(transactionsPercent/100)-totalClients;
        System.out.println("totalConstraints: "+(int)totalConstraintTransactions);
        ArrayList<Integer> client_ids = new ArrayList<Integer>();
        Random random = new Random();
        for(int i = 0; i < (int)totalConstraintTransactions; i++){
            Integer id = random.nextInt(maxId-initialID)+initialID;
            while(client_ids.contains(id) || client_ids.size() == totalClients){
                id = random.nextInt((int)totalClients)+1;
            }
            boolean type = random.nextBoolean();
            if(type){
                Calendar cal1 = Calendar.getInstance();
                cal1.setTime(initialTransactions.get(id-1).getDate("date"));
                Calendar cal2 = Calendar.getInstance();
                cal2.set(LocalDate.now().getYear(), LocalDate.now().getMonthValue(), LocalDate.now().getDayOfMonth());
                Date tempDate = randomDate(cal1, cal2);
                Transaction.Transactions_Subtype subtype;
                if(random.nextBoolean()){
                    subtype = Transaction.Transactions_Subtype.DEPOSITO;
                }else{
                    subtype = Transaction.Transactions_Subtype.TRANSFERENCIAS_RECIBIDAS;
                }
                double amount = random.nextInt(50000)+1;
                Transaction transaction = new Transaction(id, tempDate, amount, subtype, Transaction.Transactions_Type.CREDITO);
                transactionsArray.add(transaction.toDocument());
                availableBalance[id-1] = availableBalance[id-1] + amount;
            }else{
                double balance = 20000;
                int amount = random.nextInt(30000)+1;
                while(amount > availableBalance[id-1]){
                    amount = random.nextInt();
                }
                Calendar cal1 = Calendar.getInstance();
                cal1.set(LocalDate.now().minusYears(1).getYear(), LocalDate.now().minusYears(1).getMonthValue(), LocalDate.now().minusYears(1).getDayOfMonth());
                Calendar cal2 = Calendar.getInstance();
                cal2.set(LocalDate.now().getYear(), LocalDate.now().getMonthValue(), LocalDate.now().getDayOfMonth());
                Date tempDate = randomDate(cal1, cal2);
                Transaction.Transactions_Subtype subtype = Transaction.Transactions_Subtype.values()[random.nextInt(7)+2];
                Transaction transaction = new Transaction(id, tempDate, random.nextInt(5000)+20, subtype, Transaction.Transactions_Type.DEBITO);
                transactionsArray.add(transaction.toDocument());
                availableBalance[id-1] = availableBalance[id-1] - amount;
            }
        }
        System.out.println("array size: " + transactionsArray.size());
        MongoClient client = MongoClients.create("mongodb://localhost:27017");
        MongoDatabase database = client.getDatabase("bank");
        MongoCollection<Document> transactions = database.getCollection("transactions");
        transactions.insertMany(transactionsArray);
        client.close();
    }
    
}

public class Main {
    
    // generador de fechas randomicas entre 2 fechas
    public static Date randomDate(Calendar cal1, Calendar cal2){
        Date d1 = cal1.getTime();
        Date d2 = cal2.getTime();
        return new Date(ThreadLocalRandom.current()
                              .nextLong(d1.getTime(), d2.getTime()));
    }
    
    //constantes para generar transacciones
    static final int maxCredit = 30000;
    static final int maxDebit = 30000;
    
    // Array con las transacciones iniciales, importantes para todo el proceso de generacion de transacciones
    private static ArrayList<Document> initialTransactions = new ArrayList<Document>();
    
    // balance historico de cada cliente por ID
    private static double[] availableBalance = new double[500000];
    
    //Codigo que genera las primeras 500000 transacciones de cada cliente con distribucion normal
    public static void initialTransactions(){
        Random random = new Random();
        int initialMonth = 0, finalMonth = 0;
        for(int i = 1; i <= 500000; i++){
            Date tempDate = new Date();
            if(i > 0 && i <= 11500){
                initialMonth = 15;
                finalMonth = 14;
            }else if(i > 11500 && i <= 79500){
                initialMonth = 14;
                finalMonth = 13;
            }else if(i > 79500 && i <= 250000){
                initialMonth = 13;
                finalMonth = 12;
            }else if(i > 250000 && i <= 420500){
                initialMonth = 12;
                finalMonth = 11;
            }else if(i > 420500 && i <= 488500){
                initialMonth = 11;
                finalMonth = 10;
            }else if(i > 488500 && i <= 500000){
                initialMonth = 10;
                finalMonth = 9;
            }
            Calendar cal1 = Calendar.getInstance();
            cal1.set(LocalDate.now().minusMonths(initialMonth).getYear(), LocalDate.now().minusMonths(initialMonth).getMonthValue()-1, LocalDate.now().minusMonths(initialMonth).getDayOfMonth());
            Calendar cal2 = Calendar.getInstance();
            cal2.set(LocalDate.now().minusMonths(finalMonth).getYear(), LocalDate.now().minusMonths(finalMonth).getMonthValue()-1, LocalDate.now().minusMonths(finalMonth).getDayOfMonth());
//            Date date1 = cal1.getTime();
//            Date date2 = cal2.getTime();
            tempDate = randomDate(cal1, cal2);
            int amount = random.nextInt(5000)+20;
            Transaction transaction = new Transaction(i, tempDate, amount, Transaction.Transactions_Subtype.DEPOSITO, Transaction.Transactions_Type.CREDITO);
            initialTransactions.add(transaction.toDocument());
            availableBalance[i-1] = amount;
        }
        
        // Al finalizar guardamos las transacciones iniciales en mongodb
        MongoClient client = MongoClients.create("mongodb://localhost:27017");
        MongoDatabase database = client.getDatabase("bank");
        MongoCollection<Document> transactions = database.getCollection("transactions");
        transactions.insertMany(initialTransactions);
        client.close();
    }
    
    // Codigo que permite generar las transacciones basado en la distribucion de clientes - transacciones
    public static void randomTransactions(float clientsPercent, float transactionsPercent, int initialID, int maxId){
        
        // Creamos un array local con todas las transacciones que hagamos en cada interaccion para ahorrar memoria al acabar la generacion de un bloque
        ArrayList<Document> transactionsArray = new ArrayList<Document>();
        float totalClients = 500000*(clientsPercent/100);
        float totalConstraintTransactions = 13000000*(transactionsPercent/100)-totalClients;
        System.out.println("totalConstraints: "+(int)totalConstraintTransactions);
        ArrayList<Integer> client_ids = new ArrayList<Integer>();
        Random random = new Random();
        for(int i = 0; i < (int)totalConstraintTransactions; i++){
            Integer id = random.nextInt(maxId-initialID)+initialID;
            while(client_ids.contains(id) || client_ids.size() == totalClients){
                id = random.nextInt((int)totalClients)+1;
            }
            boolean type = random.nextBoolean();
            if(type){
                Calendar cal1 = Calendar.getInstance();
                cal1.setTime(initialTransactions.get(id-1).getDate("date"));
                Calendar cal2 = Calendar.getInstance();
                cal2.set(LocalDate.now().getYear(), LocalDate.now().getMonthValue(), LocalDate.now().getDayOfMonth());
                Date tempDate = randomDate(cal1, cal2);
                Transaction.Transactions_Subtype subtype;
                if(random.nextBoolean()){
                    subtype = Transaction.Transactions_Subtype.DEPOSITO;
                }else{
                    subtype = Transaction.Transactions_Subtype.TRANSFERENCIAS_RECIBIDAS;
                }
                double amount = random.nextInt(50000)+1;
                Transaction transaction = new Transaction(id, tempDate, amount, subtype, Transaction.Transactions_Type.CREDITO);
                transactionsArray.add(transaction.toDocument());
                availableBalance[id-1] = availableBalance[id-1] + amount;
            }else{
                double balance = 20000;
                int amount = random.nextInt(30000)+1;
                while(amount > availableBalance[id-1]){
                    amount = random.nextInt();
                }
                Calendar cal1 = Calendar.getInstance();
                cal1.set(LocalDate.now().minusYears(1).getYear(), LocalDate.now().minusYears(1).getMonthValue(), LocalDate.now().minusYears(1).getDayOfMonth());
                Calendar cal2 = Calendar.getInstance();
                cal2.set(LocalDate.now().getYear(), LocalDate.now().getMonthValue(), LocalDate.now().getDayOfMonth());
                Date tempDate = randomDate(cal1, cal2);
                Transaction.Transactions_Subtype subtype = Transaction.Transactions_Subtype.values()[random.nextInt(7)+2];
                Transaction transaction = new Transaction(id, tempDate, random.nextInt(5000)+20, subtype, Transaction.Transactions_Type.DEBITO);
                transactionsArray.add(transaction.toDocument());
                availableBalance[id-1] = availableBalance[id-1] - amount;
            }
        }
        System.out.println("array size: " + transactionsArray.size());
        MongoClient client = MongoClients.create("mongodb://localhost:27017");
        MongoDatabase database = client.getDatabase("bank");
        MongoCollection<Document> transactions = database.getCollection("transactions");
        transactions.insertMany(transactionsArray);
        client.close();
    }
    
    public static void latchThreads1() throws InterruptedException {
        int latchGroupCount = 3;
        CountDownLatch latch = new CountDownLatch(latchGroupCount);
        Thread t1 = new Thread( new generatorThread("thread 1", (float)10, (float)15, 1, 50000, initialTransactions, availableBalance), "T1" );
        Thread t2 = new Thread( new generatorThread("thread 2", (float)20, (float)5, 50001, 150000, initialTransactions, availableBalance), "T2" );
        Thread t3 = new Thread( new generatorThread("thread 3", (float)30, (float)30, 150001, 300000, initialTransactions, availableBalance), "T3" );

        t1.start();
        t2.start();
        t3.start();

        //latch.countDown();

        latch.await(); // block until latchGroupCount is 0.
    }
    
    public static void latchThreads2() throws InterruptedException {
        int latchGroupCount = 3;
        CountDownLatch latch = new CountDownLatch(latchGroupCount);
        Thread t1 = new Thread( new generatorThread("thread 4", (float)5, (float)20, 300001, 325000, initialTransactions, availableBalance), "T4" );
        Thread t2 = new Thread( new generatorThread("thread 5", (float)25, (float)5, 325001, 450000, initialTransactions, availableBalance), "T5" );
        Thread t3 = new Thread( new generatorThread("thread 6", (float)10, (float)25, 450001, 500000, initialTransactions, availableBalance), "T6" );

        t1.start();
        t2.start();
        t3.start();

        //latch.countDown();

        latch.await(); // block until latchGroupCount is 0.
    }
    
    // llamado a las funciones de generacion de codigo
    public static void main(String[] args) {
        initialTransactions();
//        randomTransactions(10, 15, 1, 50000);
//        randomTransactions(20, 5, 50001, 150000);
//        randomTransactions(30, 30, 150001, 300000);
//        randomTransactions(5, 20, 300001, 325000);
//        randomTransactions(25, 5, 325001, 450000);
//        randomTransactions(10, 25, 450001, 500000);
        
        generatorThread thread1 = new generatorThread("thread 1", (float)10, (float)15, 1, 50000, initialTransactions, availableBalance);
        thread1.start();
        generatorThread thread2 = new generatorThread("thread 2", (float)20, (float)5, 50001, 150000, initialTransactions, availableBalance);
        thread2.start();
        generatorThread thread3 = new generatorThread("thread 3", (float)30, (float)30, 150001, 300000, initialTransactions, availableBalance);
        thread3.start();
        try{
            thread3.join();
        }catch(InterruptedException e){
            System.out.println("error: "+e.getMessage());
        }
        generatorThread thread4 = new generatorThread("thread 4", (float)5, (float)20, 300001, 325000, initialTransactions, availableBalance);
        thread4.start();
        generatorThread thread5 = new generatorThread("thread 5", (float)25, (float)5, 325001, 450000, initialTransactions, availableBalance);
        thread5.start();
        generatorThread thread6 = new generatorThread("thread 6", (float)10, (float)25, 450001, 500000, initialTransactions, availableBalance);
        thread6.start();
    }
}
