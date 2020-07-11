import _ from 'lodash'
import { URL } from 'url'

export type DBConfig = {
  client: string;
  host: string;
  port: number;
  username: string;
  password: string;
  schema: string;
}

function parseDBConfig (uri: string): DBConfig {
  const config = new URL(uri)

  return {
    client: config.protocol.replace(/:$/, ''),
    host: config.hostname,
    port: parseInt(config.port, 10),
    username: config.username,
    password: config.password,
    schema: _.get(config.pathname.match(/^\/(.*)/), 1) || ''
  }
}

export type ApplicationConfig = {
  database: DBConfig;
}

export default (): ApplicationConfig => ({
  database: parseDBConfig(process.env.DB_URL || 'postgres://shoplist:shoplist@localhost:5432/shoplist')
})
