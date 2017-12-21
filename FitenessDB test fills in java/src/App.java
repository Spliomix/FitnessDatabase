

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.GregorianCalendar;

import java.util.concurrent.ThreadLocalRandom;
public class App {

    public static void main(String args[]) {
        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            String database = "jdbc:oracle:thin:@oracle-lab.cs.univie.ac.at:1521:lab";
            String user = "a01225308";
            String pass = "Sdhfsod1234";

            // establish connection to database
            Connection con = DriverManager.getConnection(database, user, pass);
            Statement stmt = con.createStatement();

            // insert a single dataset into the database
            //10 String inside



            int count=0;



        //Test Generator for Mensch
        String[] vName={"David", "Otto", "Maria", "Herbert", "Helmut", "Ahmet", "Li", "John", "Anna","Kim"};
        String[] nName={"Lulcheck", "Bellen", "Gris", "Strolz", "Strache", "Obama", "Wayne", "Kent", "Suttner","Smith"};
        for(int i=0; i<100; i++){
            count=count+3;
            int randomNum = ThreadLocalRandom.current().nextInt(0, 9 + 1);
            System.out.println("Vorname: " + vName[randomNum]);
            int randomNum2 = ThreadLocalRandom.current().nextInt(0, 9 + 1);
            randomNum = ThreadLocalRandom.current().nextInt(0, 9 + 1);
            System.out.println("Nachname: " + nName[randomNum2]);
            int Gewicht = ThreadLocalRandom.current().nextInt(40, 200 + 1);
            System.out.println("Gewicht: " + Gewicht);
            String empf=null;
            try {
                String insertSql = "INSERT INTO menschen VALUES ('"+i+"', '"+vName[randomNum]+"', '"+nName[randomNum2]+"', '"+Gewicht+"')";
                stmt.executeUpdate(insertSql);
            } catch (Exception e) {
                System.err.println("Fehler beim Einfuegen des Datensatzes: " + e.getMessage());
            }
        }

        //Test Generator for Mitglied
        GregorianCalendar gc = new GregorianCalendar();
        for(int i=0; i<100; i++){
            count=count+5;
            if ((i % 3)==0)i++;//damit jeder dritte a frei bleibt
            System.out.println("ID: " + i);
            int year = randBetween(2000, 2017);
            gc.set(gc.YEAR, year);
            int dayOfYear = randBetween(1, gc.getActualMaximum(gc.DAY_OF_YEAR));
            gc.set(gc.DAY_OF_YEAR, dayOfYear);
            String date = gc.get(gc.DAY_OF_MONTH) + "-" + (gc.get(gc.MONTH) + 1) + "-" +gc.get(gc.YEAR) ;
            System.out.println(date);
            int randomNum = ThreadLocalRandom.current().nextInt(0, 1000 + 1);
            System.out.println("Punkte: " + randomNum);
            int passwort = ThreadLocalRandom.current().nextInt(1000, 200000 + 1);
            System.out.println("Passwort: " + passwort);
            int empfohlen = ThreadLocalRandom.current().nextInt(0, 100 + 1);
            System.out.println("Empfohlen: " + empfohlen);
            String empf=null;
            try {
                String insertSql = "INSERT INTO mitglied VALUES ('"+i+"', '"+date+"', '"+randomNum+"', '"+passwort+"', "+empf+")";
                stmt.executeUpdate(insertSql);
            } catch (Exception e) {
                System.err.println("Fehler beim Einfuegen des Datensatzes: " + e.getMessage());
            }
        }


        //Test Generator for Mitarbeiter
        for(int i=1; i<100; i++){
            if ((i % 3)==0) {//damit jeder dritte a frei bleibt
                count++;
                System.out.println("ID: " + i);
                int rang = ThreadLocalRandom.current().nextInt(0, 9 + 1);
                System.out.println("Rang: " + rang);
                int perso = ThreadLocalRandom.current().nextInt(1000, 10000 + 1);
                System.out.println("Rang: " + perso);
                try {
                    String insertSql = "INSERT INTO mitarbeiter VALUES ('" + i + "', '" + rang + "', '" + perso + "')";
                    stmt.executeUpdate(insertSql);
                } catch (Exception e) {
                    System.err.println("Fehler beim Einfuegen des Datensatzes: " + e.getMessage());
                }
            }
        }


        //Test Generator for Gericht
        String[] gName={"Pizza", "Käse", "Apfel", "Banane", "Yogurt", "Pommes", "Reis", "Hühnerfleisch", "Fisch","Paprika"};
        for(int i=0; i<10; i++){
            count=count+4;
            System.out.println("Gericht: " + gName[i]);
            int fett = ThreadLocalRandom.current().nextInt(0, 30 + 1);
            System.out.println("Fett: " + fett);
            int prot = ThreadLocalRandom.current().nextInt(0, 30 + 1);
            System.out.println("Eiweiß: " + prot);
            int carbs = ThreadLocalRandom.current().nextInt(0, 30 + 1);
            System.out.println("Kohlenhydrate: " + carbs);
            int menge=4;

            try {
                String insertSql = "INSERT INTO gericht VALUES ('"+gName[i]+"', '"+fett+"', '"+prot+"', '"+carbs+"', '"+menge+"')";
                stmt.executeUpdate(insertSql);
            } catch (Exception e) {
                System.err.println("Fehler beim Einfuegen des Datensatzes: " + e.getMessage());
            }
        }


        //Test Generator for isst
            for(int i=0; i<10; i++){
                count=count+3;
                int id = ThreadLocalRandom.current().nextInt(0, 100 + 1);
                System.out.println("ID: " + id);
                int index = ThreadLocalRandom.current().nextInt(0, 9 + 1);
                System.out.println("Gericht: " + gName[index]);
                int year = randBetween(2000, 2017);
                gc.set(gc.YEAR, year);
                int dayOfYear = randBetween(1, gc.getActualMaximum(gc.DAY_OF_YEAR));
                gc.set(gc.DAY_OF_YEAR, dayOfYear);
                String date = gc.get(gc.DAY_OF_MONTH) + "-" + (gc.get(gc.MONTH) + 1) + "-" +gc.get(gc.YEAR) ;
                System.out.println(date);


                try {
                    String insertSql = "INSERT INTO isst VALUES ('"+id+"', '"+gName[i]+"', '"+date+"')";
                    stmt.executeUpdate(insertSql);
                } catch (Exception e) {
                    System.err.println("Fehler beim Einfuegen des Datensatzes: " + e.getMessage());
                }
            }

            //Test Generator for training
            String[] tName={"Bank", "Rudern", "Kniebeuge", "Militäri Press", "Good Mornings", "Kreuzheben", "Front Squad", "Bizeps Curl", "Push Ups","Pull Ups"};
            String[] kath={"Brust", "Rücken", "Beine", "Schultern", "Rückenstrecker", "Rückenstrecker", "Beine", "Bizeps", "Brust","Rücken"};

            for(int i=0; i<10; i++){
                count=count+6;
                int id = ThreadLocalRandom.current().nextInt(0, 100 + 1);
                System.out.println("ID: " + id);
                int year = randBetween(2000, 2017);
                gc.set(gc.YEAR, year);
                int dayOfYear = randBetween(1, gc.getActualMaximum(gc.DAY_OF_YEAR));
                gc.set(gc.DAY_OF_YEAR, dayOfYear);
                String date = gc.get(gc.DAY_OF_MONTH) + "-" + (gc.get(gc.MONTH) + 1) + "-" +gc.get(gc.YEAR) ;
                System.out.println(date);
                int index = ThreadLocalRandom.current().nextInt(0, 9 + 1);
                System.out.println("Training: " + tName[index]);
                int gewicht = ThreadLocalRandom.current().nextInt(10, 250 + 1);
                System.out.println("Gewicht: " + gewicht);
                int reps = ThreadLocalRandom.current().nextInt(1, 15 + 1);
                System.out.println("Wiederholungen: " + reps);
                System.out.println("Wiederholungen: " + kath[index]);
                try {
                    String insertSql = "INSERT INTO training VALUES ('"+id+"', '"+date+"', '"+tName[index]+"', '"+gewicht+"', '"+reps+"', '"+kath[index]+"')";
                    stmt.executeUpdate(insertSql);
                } catch (Exception e) {
                    System.err.println("Fehler beim Einfuegen des Datensatzes: " + e.getMessage());
                }
            }
        System.out.println("Durchgänge: " + count);


            // check number of datasets in person table
            ResultSet rs = stmt.executeQuery("SELECT * FROM menschen");
            if (rs.next()) {
                int counta = rs.getInt(1);
                System.out.println("Number of datasets: " + counta);
            }

            // clean up connections
            rs.close();
            stmt.close();
            con.close();

        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }


    public static int randBetween(int start, int end) {
        return start + (int)Math.round(Math.random() * (end - start));
    }
}