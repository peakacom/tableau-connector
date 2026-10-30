const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const builder = vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../connectionBuilder.js'), 'utf8'), {
  connectionHelper: { attributeServer: 'server', attributePort: 'port', attributeDatabase: 'database', attributePassword: 'password' },
});
test('uses on-prem host and port without falling back to Cloud', () => {
  assert.equal(builder({server: 'jdbc.customer.example', port: '443', password: 'test-key'})[0],
    'jdbc:peaka://jdbc.customer.example:443/?extraCredentials=peakaKey:test-key');
});
test('old Cloud connections without port retain the previous default', () => {
  assert.equal(builder({server: 'dbc.peaka.studio', database: 'catalog', password: 'test-key'})[0],
    'jdbc:peaka://dbc.peaka.studio:4567/catalog?extraCredentials=peakaKey:test-key');
});
test('rejects URLs and invalid ports before connecting', () => {
  for (const server of ['', 'https://dbc.example', 'dbc.example/path']) {
    assert.throws(() => builder({server, password: 'test-key'}), /hostname/);
  }
  for (const port of ['0', '65536', '-1', '443/path', 'abc']) {
    assert.throws(() => builder({server: 'dbc.example', port, password: 'test-key'}), /port/);
  }
});
