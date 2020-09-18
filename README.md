# DNS over TLS/HTTPS (DoT/DoH) profile for iOS/iPadOS 14 and macOS Big Sur

## Installation

Go to [`dist/`](tree/master/dist) folder, choose a `.mobileconfig` file, right click `RAW` button on the right top corner to donwload.

## Generate your own profile

Clone project, add config file in `dns-providers/`, then

```shell
npm install
npm run build
```

## DNS Providers

| Provider | Instructions |
|---|---|
| Google Public DNS | https://developers.google.com/speed/public-dns/docs/secure-transports |
| Cloudflare Public DNS | https://1.1.1.1 |
| OpenDNS | https://support.opendns.com/hc/en-us/articles/360038086532 |
| AliDNS | https://www.alidns.com/faqs/#dns-safe |
| RubyFish DNS | https://www.rubyfish.cn/dns/solutions |
| CleanBrowsing | https://cleanbrowsing.org/filters |
| AdGuard DNS | https://adguard.com/en/adguard-dns/overview.html#instruction |
