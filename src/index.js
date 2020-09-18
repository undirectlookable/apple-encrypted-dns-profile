'use strict';

const fs = require('fs');
const path = require('path');
const builder = require('xmlbuilder');

const providersPath = path.join(__dirname, '../dns-providers');
const providerFiles = fs.readdirSync(providersPath)
  .map((file) => path.join(providersPath, file));

if (!Array.isArray(providerFiles)) {
  process.exit(1);
}

providerFiles.forEach((filePath) => {
  const configName = path.basename(filePath, '.json');
  const config = require(filePath);

  const { provider, services } = config

  if (!Array.isArray(services)) {
    return;
  }

  services.forEach((service) => {
    const { protocol, address } = service;

    const payloadDisplayName = `${provider} over ${protocol.toUpperCase()}`;
    const uuid = '499E786A-CD60-49E1-B07D-C5F41EBAB1FF';
    const payloadIdentifier = `com.apple.dnsSettings.managed.${uuid}`;

    const serverKey = {
      'tls': 'ServerName',
      'https': 'ServerURL',
    }

    const xml = builder
      .create('plist', { version: '1.0', encoding: 'UTF-8' })
      .dtd(
        '-//Apple//DTD PLIST 1.0//EN',
        'http://www.apple.com/DTDs/PropertyList-1.0.dtd',
      )
      .root().att('version', '1.0')
      .ele('dict')
        .ele('key', 'PayloadContent').up()
        .ele('array')
          .ele('dict')
            .ele('key', 'PayloadDisplayName').up()
            .ele('string', payloadDisplayName).up()
            .ele('key', 'PayloadType').up()
            .ele('string', 'com.apple.dnsSettings.managed').up()
            .ele('key', 'PayloadIdentifier').up()
            .ele('string', payloadIdentifier).up()
            .ele('key', 'PayloadUUID').up()
            .ele('string', uuid).up()
            .ele('key', 'PayloadVersion').up()
            .ele('integer', '1').up()
            .ele('key', 'DNSSettings').up()
            .ele('dict')
              .ele('key', 'DNSProtocol').up()
              .ele('string', protocol.toUpperCase()).up()
              .ele('key', serverKey[protocol]).up()
              .ele({'string': address[0]}).up()
            .up()
          .up()
        .up()
      .ele('key', 'PayloadDisplayName').up()
      .ele('string', payloadDisplayName).up()
      .ele('key', 'PayloadIdentifier').up()
      .ele('string', '9CFD0614-085E-40EA-AD1E-A48024174637').up()
      .ele('key', 'PayloadRemovalDisallowed').up()
      .ele('false').up()
      .ele('key', 'PayloadType').up()
      .ele('string', 'Configuration').up()
      .ele('key', 'PayloadUUID').up()
      .ele('string', '34015D34-F39E-4B27-A760-E8F384858082').up()
      .ele('key', 'PayloadVersion').up()
      .ele('integer', '1').up()
      .end({ pretty: true });

    const profileDistPath = path.join(__dirname, '../dist', `${configName}_${protocol}.mobileconfig`);

    fs.writeFileSync(profileDistPath, xml);
  });
})
