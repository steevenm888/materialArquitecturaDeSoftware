import {DefaultCrudRepository} from '@loopback/repository';
import {Campaign, CampaignRelations} from '../models';
import {BanquitoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CampaignRepository extends DefaultCrudRepository<
  Campaign,
  typeof Campaign.prototype.id,
  CampaignRelations
> {
  constructor(
    @inject('datasources.banquito') dataSource: BanquitoDataSource,
  ) {
    super(Campaign, dataSource);
  }
}
