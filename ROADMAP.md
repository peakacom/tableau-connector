# Tableau support roadmap

Status: proposal informed by official documentation reviewed 2026-10-30. Items below
are not a statement that Peaka currently supports each product.

| Target | Proposed path | Validation/release gate |
| --- | --- | --- |
| Desktop | Peaka Connector SDK TACO + Peaka JDBC 1.2.0 JAR | Finish UI/table/worksheet/refresh tests and TDVT; document OS/version matrix |
| Prep Builder | The same JDBC connector and driver | Test connection, input, flow and refresh separately |
| Tableau Server | Install TACO and driver server-side; author and publish from Desktop | Test deployed driver, authentication, live queries and scheduled extracts |
| Tableau Cloud | Desktop-authored published source; establish supported named connector/Exchange route | Confirm Tableau onboarding and Cloud support; test a real Cloud site |
| Private-network Peaka → Cloud | Supported Bridge route if approved by Tableau | Exchange listing alone does not guarantee Bridge support; confirm inclusion and test live/extract |
| Existing WDC users | Legacy maintenance/migration to JDBC | WDC EPS disabled by default in recent Desktop releases; no new Cloud promise |

## Priority

1. Complete JDBC acceptance tests, expose reviewed TLS certificate verification,
   document Peaka driver compatibility and sign releases using a trusted certificate.
2. Test Server and Prep with explicit supported versions. Publish sources and package
   checksums in GitHub; keeping a TACO unsigned does not establish trusted distribution.
3. Discuss Exchange/Cloud/Bridge support with Tableau and complete the submission
   requirements, including test artifacts. Do not advertise arbitrary TACO upload to Cloud.
4. Consider Peaka Studio connection-info/downloadable Tableau connection files, then
   OAuth/PKCE and user impersonation only when Peaka's backend authorization supports
   the complete identity flow. API keys remain the current authentication path.
5. Evaluate a server-produced Hyper extract upload/refresh service if customers require
   browser-only onboarding before native Cloud support. This would be a separate product
   integration and operational lifecycle, not a WDC runtime upgrade.

## Evidence and interpretation

[Tableau Bridge support](https://help.tableau.com/current/online/en-gb/to_sync_local_data.htm)
excludes third-party connectors outside Exchange, and supports only selected Exchange
connectors. A public GitHub release alone is insufficient for a supported Peaka
Cloud/Bridge deployment; confirm connector eligibility with Tableau.

[Exchange submission](https://tableau.github.io/connector-plugin-sdk/docs/gallery-submission)
describes partner onboarding, source/test artifact submission and listing. Cloud/Bridge
support must be confirmed separately. [Connector SDK](https://tableau.github.io/connector-plugin-sdk/docs/)
recommends TDVT and package/sign verification.
