(function dsbuilder(attr) {
  var server = (attr[connectionHelper.attributeServer] || "").trim();
  var port = String(attr[connectionHelper.attributePort] || "4567").trim();
  if (!server || /[\s\/?#@]/.test(server)) {
    throw new Error("Enter the Peaka DBC hostname without a URL scheme or path.");
  }
  if (!/^\d+$/.test(port) || Number(port) < 1 || Number(port) > 65535) {
    throw new Error("Enter a port between 1 and 65535.");
  }
  var urlBuilder =
    "jdbc:peaka://" +
    server +
    ":" +
    port +
    "/" +
    (attr[connectionHelper.attributeDatabase] || "") +
    "?" +
    "extraCredentials=peakaKey:" +
    attr[connectionHelper.attributePassword];
  return [urlBuilder];
});
