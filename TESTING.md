# Verification records — 2026-10-30

## v1.0.2 — Peaka JDBC route

Package: PeakaStudioJDBC-v1.0.2.taco (unsigned).
Host: macOS, Apple silicon. Tableau Desktop Free Edition 2026.3.0.
Driver: Maven Central Peaka JDBC 1.2.0, bundling Trino JDBC 484.
Driver SHA-256: `a4641106fe45d65fdd3538fe23f7faee7facceb4508f2f0d85129a6577d14912`.

The connection builder produces jdbc:peaka URLs, selecting com.peaka.jdbc.PeakaDriver.
A standalone Trino JAR is insufficient. This route selects the Peaka wrapper instead
of bypassing it. The TACO still installs separately from the driver.

### Observed in Tableau Desktop

- Plugin loaded with signature verification disabled for this test process only.
- Editable hostname/port and secure project API key fields worked with a non-default
  Peaka test endpoint.
- Tableau's JDBC log confirmed: Connected using driver com.peaka.jdbc.PeakaDriver,
  version 1.2, from the installed peaka-jdbc-1.2.0.jar.
- Connection verification SELECT 1 passed.
- The sample CRM catalog and schema were selected. Four sample tables were listed.
- The products table metadata loaded, and Update Now displayed **6 fields, 40 rows**
  with sample product values. No customer data was used in the preview.
- A separate Java JDBC probe through jdbc:peaka listed nine catalogs, the CRM schema
  and tables, and returned SELECT 1 = 1.

Worksheet UI navigation could not be completed through the native automation session.
Worksheet aggregation, Custom SQL, saved-workbook migration/reopen and extract or
unattended refresh remain **unverified**. Table preview success does not establish
complete Tableau compatibility or correctness for every data type.

The old 1.1.0 JAR and 1.0.1 TACO were moved out of Tableau's load directories and
preserved as local test backups; only Peaka JDBC 1.2.0 supplied the Peaka driver.
The test key was restricted to one sample project and seven metadata/query permissions,
with expiry on 2026-10-31; it was deleted after testing. No key or customer endpoint is
included in this repository. The test application was closed without saving the workbook.

### Automated and packaging checks

- Three Node tests verify custom host/port, the jdbc:peaka prefix, legacy Cloud port
  defaults and rejected inputs.
- tests/VerifyDriver.java runs against the published Peaka JDBC JAR without credentials
  or network connections to Peaka. It verifies DriverManager selects PeakaDriver for
  jdbc:peaka and that the Peaka driver does not accept a direct jdbc:trino URL.
- CI downloads the pinned Maven Central JAR, verifies its SHA-256 and runs that check.
- Official Tableau SDK XML validation and unsigned packaging passed.

## v1.0.1 — historical direct Trino route

The previous macOS Desktop 2026.3 test used jdbc:trino and the Trino 475 driver embedded
in peaka-jdbc-1.1.0.jar. Plugin loading and SELECT 1 connection verification passed.
A separate Java probe listed nine catalogs. Table preview and worksheet/refresh were
not verified in that run. These results did not validate Peaka's wrapper.

## Required before claiming broader production support

Finish worksheet and Custom SQL tests, existing workbook migration, save/reopen and
live/extract refresh for each supported Tableau/driver/OS combination. Run Tableau TDVT
for generated SQL/dialect compatibility. Verify decimal/NUMBER, timestamp, NULL,
string and federation behavior. Review inherited SSLVerification=NONE and trusted
signing before production distribution.

Manifest minimum 2020.4 is declarative. Other Desktop versions, Windows, Prep, Server,
Cloud and Bridge were not verified in these runs; see ROADMAP.md.
