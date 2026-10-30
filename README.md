# Peaka Tableau JDBC Connector

Connect Tableau Desktop to Peaka Cloud or an on-prem Peaka installation using JDBC.
The connector supplies the connection dialog and SQL dialect. The JDBC driver is
installed separately; it is not embedded in the TACO file.

## Download and install

Download the versioned `.taco` and `SHA256SUMS.txt` from
[GitHub Releases](https://github.com/peakacom/tableau-connector/releases).
Minimum declared Tableau version: **2020.4**. See [TESTING.md](TESTING.md) for actual
Desktop verification; a minimum-version declaration is not a compatibility test.
See [ROADMAP.md](ROADMAP.md) for the proposed Desktop, Server and Cloud support paths.

1. Place the TACO in `~/Documents/My Tableau Repository/Connectors` on macOS or
   `%USERPROFILE%\Documents\My Tableau Repository\Connectors` on Windows.
2. Keep only one version of this connector in that folder. Move older versions out.
3. Install [Peaka JDBC 1.2.0](https://repo.maven.apache.org/maven2/com/peaka/peaka-jdbc/1.2.0/peaka-jdbc-1.2.0.jar)
   in `~/Library/Tableau/Drivers` (macOS) or `C:\Program Files\Tableau\Drivers`
   (Windows). Keep only one Peaka driver version in this folder; move older versions out.
   Peaka JDBC includes its Trino dependency, so a separate Trino JAR is not needed.
4. Restart Tableau. Select **Peaka Studio by Peaka** under **Connect → To a Server**.
5. Enter the **Peaka DBC Server**, **Port**, and project **Peaka API Key**.
6. Select a catalog/schema and table, then open a worksheet.

The connector uses `jdbc:peaka:` and selects `com.peaka.jdbc.PeakaDriver`. Peaka's
wrapper delegates transport to the bundled Trino driver and applies Peaka type/metadata
and exception-handling adaptations. A standalone Trino driver cannot handle this URL.
Version 1.0.1 used `jdbc:trino:` and bypassed that wrapper; update the TACO and Peaka JAR
together. Existing workbook connection attributes and connector class identity are retained;
reopening/refreshing an existing workbook still needs acceptance testing.

Cloud defaults are `dbc.peaka.studio` and `4567`. For on-prem, obtain the external
DBC endpoint and TLS port from the installation administrator. The Studio web URL
and Partner API URL are separate services; do not substitute either by assumption.
Enter a hostname without `https://` or a path. An absent port in an existing Cloud
connection retains 4567.

## Partner API keys and project selection

On a Peaka installation that supports project selection for partner/organization keys,
enter the following in Tableau's **Peaka API KEY** field:

```text
<PARTNER_API_KEY>:<PROJECT_ID>
```

The project is selected during authentication, before Tableau lists catalogs. Tableau's
**Catalog** selector chooses a catalog inside that project, not a Peaka project.

For direct JDBC clients, the equivalent `extraCredentials` property is
`peakaKey:<PARTNER_API_KEY>;peakaProject:<PROJECT_ID>`. The semicolon separates JDBC
extra credentials. Project selection also requires support on the Peaka server; the
Trino engine version alone does not establish this capability. Older installations
require a project API key, entered without a project suffix. Confirm server support
with the installation administrator.

## Unsigned packages

These releases are **unsigned**. Their source and SHA-256 digest are public, but the
archive has no trusted publisher signature. To test them, explicitly launch Tableau
with signature verification disabled for that process. Quit any existing Tableau
process first. This does not change persistent Tableau settings.

macOS (replace the application path with the installed version):

```sh
open -a "/Applications/Tableau Desktop (Apple silicon) 2026.3.app" --args -DDisableVerifyConnectorPluginSignature=true
```

Windows Command Prompt (replace the version):

```bat
"C:\Program Files\Tableau\Tableau 2026.3\bin\tableau.exe" -DDisableVerifyConnectorPluginSignature=true
```

The existing connector sets `SSL=true` and `SSLVerification=NONE`. Traffic is encrypted,
but the JDBC driver does not validate the server certificate. This is a known inherited
limitation; do not present it as verified TLS identity. Prefer trusted certificates and
a reviewed certificate-verification configuration for production use.

## Develop and build

Requirements: Node.js 20+ for tests, Python 3.9+, Git, and a JDK with `jar` on PATH.

```sh
node --test tests/*.test.cjs
java --class-path /path/to/peaka-jdbc-1.2.0.jar tests/VerifyDriver.java
bash scripts/package.sh
```

The script pins the official Tableau Connector Plugin SDK and builds a TACO in `dist/`.
It downloads build dependencies, validates XML against Tableau's schemas, and packages
only manifest-referenced connector files. Tests and local files are not bundled.

## Release

Publish a versioned TACO and SHA-256 digest as GitHub release assets. Keep older release
assets intact. Never include API keys, keystores or customer data in a release. Optional
trusted signing uses a CA-issued code-signing certificate, `jarsigner` and a timestamp;
changing a signed archive requires signing again.

[Official Tableau Connector SDK](https://tableau.github.io/connector-plugin-sdk/docs/)
| [Packaging/signing](https://tableau.github.io/connector-plugin-sdk/docs/package-sign)

## License

ISC; see [LICENSE](LICENSE). Third-party drivers and Tableau tools retain their own licenses.
