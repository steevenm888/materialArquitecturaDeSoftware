import {DefaultCrudRepository} from '@loopback/repository';
import {ContactabilityRegistration, ContactabilityRegistrationRelations} from '../models';
import {BanquitoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ContactabilityRegistrationRepository extends DefaultCrudRepository<
  ContactabilityRegistration,
  typeof ContactabilityRegistration.prototype.id,
  ContactabilityRegistrationRelations
> {
  constructor(
    @inject('datasources.banquito') dataSource: BanquitoDataSource,
  ) {
    super(ContactabilityRegistration, dataSource);
  }
}
