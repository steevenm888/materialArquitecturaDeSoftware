import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'public', table: 'Client'},
  },
})
export class Client extends Entity {
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
    length: 10,
    postgresql: {
      columnName: 'identification',
      dataType: 'character varying',
      dataLength: 10,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  identification?: string;

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
    length: 128,
    postgresql: {
      columnName: 'surname',
      dataType: 'character varying',
      dataLength: 128,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  surname?: string;

  @property({
    type: 'date',
    postgresql: {
      columnName: 'birthdate',
      dataType: 'date',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  birthdate?: string;

  @property({
    type: 'string',
    length: 1,
    postgresql: {
      columnName: 'genre',
      dataType: 'character varying',
      dataLength: 1,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  genre?: string;

  @property({
    type: 'string',
    length: 128,
    postgresql: {
      columnName: 'birthProvince',
      dataType: 'character varying',
      dataLength: 128,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  birthProvince?: string;

  @property({
    type: 'string',
    length: 128,
    postgresql: {
      columnName: 'birthCanton',
      dataType: 'character varying',
      dataLength: 128,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  birthCanton?: string;

  @property({
    type: 'number',
    precision: 14,
    scale: 2,
    postgresql: {
      columnName: 'balanceAccount',
      dataType: 'numeric',
      dataLength: null,
      dataPrecision: 14,
      dataScale: 2,
      nullable: 'YES',
    },
  })
  balanceAccount?: number;

  @property({
    type: 'number',
    precision: 14,
    scale: 2,
    postgresql: {
      columnName: 'balanceLoan',
      dataType: 'numeric',
      dataLength: null,
      dataPrecision: 14,
      dataScale: 2,
      nullable: 'YES',
    },
  })
  balanceLoan?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Client>) {
    super(data);
  }
}

export interface ClientRelations {
  // describe navigational properties here
}

export type ClientWithRelations = Client & ClientRelations;
