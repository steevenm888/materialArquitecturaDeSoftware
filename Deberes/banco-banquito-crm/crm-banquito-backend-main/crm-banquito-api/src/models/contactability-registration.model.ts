import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'public', table: 'ContactabilityRegistration'},
  },
})
export class ContactabilityRegistration extends Entity {
  @property({
    type: 'number',
    required: false,
    scale: 0,
    id: 1,
    postgresql: {
      columnName: 'id',
      dataType: 'integer',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  id: number;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {
      columnName: 'idClient',
      dataType: 'integer',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'YES',
    },
  })
  idClient?: number;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {
      columnName: 'idCampaign',
      dataType: 'integer',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'YES',
    },
  })
  idCampaign?: number;

  @property({
    type: 'boolean',
    postgresql: {
      columnName: 'answer',
      dataType: 'boolean',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  answer?: boolean;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ContactabilityRegistration>) {
    super(data);
  }
}

export interface ContactabilityRegistrationRelations {
  // describe navigational properties here
}

export type ContactabilityRegistrationWithRelations = ContactabilityRegistration &
  ContactabilityRegistrationRelations;
