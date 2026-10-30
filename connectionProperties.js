(function propertiesbuilder(attr) {
  var props = {
    source: "Tableau Extension JDBC 1.4.0",
    assumeLiteralUnderscoreInMetadataCallsForNonConformingClients: true,
  };
  props["SSL"] = "true";
  props["SSLVerification"] = "NONE";
  return props;
});
