import { SocksProxyAgent } from 'socks-proxy-agent';

export default new SocksProxyAgent(String(process.env.PROXY_HOST));