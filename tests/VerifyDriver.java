import java.sql.Driver;
import java.sql.DriverManager;

/** Checks real JDBC service registration and URL routing without connecting to a server. */
class VerifyDriver {
    public static void main(String[] args) throws Exception {
        Driver driver = DriverManager.getDriver("jdbc:peaka://dbc.example:4567/");
        if (!driver.getClass().getName().equals("com.peaka.jdbc.PeakaDriver")) {
            throw new AssertionError("Unexpected driver: " + driver.getClass().getName());
        }
        if (driver.getMajorVersion() != 1 || driver.getMinorVersion() < 2) {
            throw new AssertionError("Peaka JDBC 1.2+ required");
        }
        if (driver.acceptsURL("jdbc:trino://dbc.example:4567/")) {
            throw new AssertionError("Direct Trino URL unexpectedly selects the Peaka wrapper");
        }
        System.out.println("Selected " + driver.getClass().getName() + " "
                + driver.getMajorVersion() + "." + driver.getMinorVersion());
    }
}
