import {DefaultCrudRepository} from '@loopback/repository';
import {Canton, CantonRelations} from '../models';
import {BanquitoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CantonRepository extends DefaultCrudRepository<
  Canton,
  typeof Canton.prototype.id,
  CantonRelations
> {
  constructor(
    @inject('datasources.banquito') dataSource: BanquitoDataSource,
  ) {
    super(Canton, dataSource);
  }
}
