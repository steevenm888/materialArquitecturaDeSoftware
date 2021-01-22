import {DefaultCrudRepository} from '@loopback/repository';
import {Province, ProvinceRelations} from '../models';
import {BanquitoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProvinceRepository extends DefaultCrudRepository<
  Province,
  typeof Province.prototype.id,
  ProvinceRelations
> {
  constructor(
    @inject('datasources.banquito') dataSource: BanquitoDataSource,
  ) {
    super(Province, dataSource);
  }
}
