import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'public', table: 'canton'}}
})
export class Canton extends Entity {
  @property({
    type: 'number',
    required: true,
    scale: 0,
    id: 1,
    postgresql: {columnName: 'id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id: number;

  @property({
    type: 'string',
    length: 128,
    postgresql: {columnName: 'canton', dataType: 'character varying', dataLength: 128, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  canton?: string;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    id: 2,
    postgresql: {columnName: 'provinceId', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  provinceId: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Canton>) {
    super(data);
  }
}

export interface CantonRelations {
  // describe navigational properties here
}

export type CantonWithRelations = Canton & CantonRelations;
