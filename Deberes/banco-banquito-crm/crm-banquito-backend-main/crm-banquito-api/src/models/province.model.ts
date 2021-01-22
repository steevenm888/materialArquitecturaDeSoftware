import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'public', table: 'province'}}
})
export class Province extends Entity {
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
    length: 2,
    postgresql: {columnName: 'code', dataType: 'character varying', dataLength: 2, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  code?: string;

  @property({
    type: 'string',
    length: 32,
    postgresql: {columnName: 'province', dataType: 'character varying', dataLength: 32, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  province?: string;

  @property({
    type: 'number',
    precision: 53,
    postgresql: {columnName: 'percentage', dataType: 'float', dataLength: null, dataPrecision: 53, dataScale: null, nullable: 'YES'},
  })
  percentage?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Province>) {
    super(data);
  }
}

export interface ProvinceRelations {
  // describe navigational properties here
}

export type ProvinceWithRelations = Province & ProvinceRelations;
