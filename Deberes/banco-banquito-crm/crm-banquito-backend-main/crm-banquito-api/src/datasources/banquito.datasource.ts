import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'banquito',
  connector: 'postgresql',
  url: 'postgres://postgres:colemilitar@127.0.0.1:5432/crm-banquito',
  host: ' 127.0.0.1',
  port: 5432,
  user: 'postgres',
  password: 'colemilitar',
  database: 'crm-banquito'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class BanquitoDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'banquito';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.banquito', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
