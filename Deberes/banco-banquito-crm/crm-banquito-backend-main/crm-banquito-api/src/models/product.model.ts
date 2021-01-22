import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'public', table: 'Product'},
  },
})
export class Product extends Entity {
  @property({
    type: 'number',
    required: false,
    scale: 0,
    id: 1,
    postgresql: {
      columnName: 'id',
      dataType: 'smallint',
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
    length: 1,
    postgresql: {
      columnName: 'type',
      dataType: 'character varying',
      dataLength: 1,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  type?: string;

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

  @property({
    type: 'number',
    precision: 14,
    scale: 2,
    postgresql: {
      columnName: 'quantity',
      dataType: 'numeric',
      dataLength: null,
      dataPrecision: 14,
      dataScale: 2,
      nullable: 'YES',
    },
  })
  quantity?: number;

  @property({
    type: 'number',
    precision: 14,
    scale: 2,
    postgresql: {
      columnName: 'interest',
      dataType: 'numeric',
      dataLength: null,
      dataPrecision: 14,
      dataScale: 2,
      nullable: 'YES',
    },
  })
  interest?: number;

  @property({
    type: 'string',
    length: 1,
    postgresql: {
      columnName: 'status',
      dataType: 'character varying',
      dataLength: 1,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  status?: string;

  @property({
    type: 'date',
    postgresql: {
      columnName: 'startDate',
      dataType: 'date',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  startDate?: string;

  @property({
    type: 'date',
    scale: 0,
    postgresql: {
      columnName: 'endDate',
      dataType: 'date',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  endDate?: string;

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

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;
