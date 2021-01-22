import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'public', table: 'Campaign'},
  },
})
export class Campaign extends Entity {
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
    type: 'string',
    length: 128,
    postgresql: {
      columnName: 'name',
      dataType: 'character varying',
      dataLength: 128,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  name?: string;

  @property({
    type: 'string',
    length: 256,
    postgresql: {
      columnName: 'description',
      dataType: 'character varying',
      dataLength: 256,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  description?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Campaign>) {
    super(data);
  }
}

export interface CampaignRelations {
  // describe navigational properties here
}

export type CampaignWithRelations = Campaign & CampaignRelations;
