import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Province} from '../models';
import {ProvinceRepository} from '../repositories';

export class ProvinceController {
  constructor(
    @repository(ProvinceRepository)
    public provinceRepository : ProvinceRepository,
  ) {}

  @post('/provinces', {
    responses: {
      '200': {
        description: 'Province model instance',
        content: {'application/json': {schema: getModelSchemaRef(Province)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Province, {
            title: 'NewProvince',
            exclude: ['id'],
          }),
        },
      },
    })
    province: Omit<Province, 'id'>,
  ): Promise<Province> {
    return this.provinceRepository.create(province);
  }

  @get('/provinces/count', {
    responses: {
      '200': {
        description: 'Province model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Province) where?: Where<Province>,
  ): Promise<Count> {
    return this.provinceRepository.count(where);
  }

  @get('/provinces', {
    responses: {
      '200': {
        description: 'Array of Province model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Province, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Province) filter?: Filter<Province>,
  ): Promise<Province[]> {
    return this.provinceRepository.find(filter);
  }

  @patch('/provinces', {
    responses: {
      '200': {
        description: 'Province PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Province, {partial: true}),
        },
      },
    })
    province: Province,
    @param.where(Province) where?: Where<Province>,
  ): Promise<Count> {
    return this.provinceRepository.updateAll(province, where);
  }

  @get('/provinces/{id}', {
    responses: {
      '200': {
        description: 'Province model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Province, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Province, {exclude: 'where'}) filter?: FilterExcludingWhere<Province>
  ): Promise<Province> {
    return this.provinceRepository.findById(id, filter);
  }

  @patch('/provinces/{id}', {
    responses: {
      '204': {
        description: 'Province PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Province, {partial: true}),
        },
      },
    })
    province: Province,
  ): Promise<void> {
    await this.provinceRepository.updateById(id, province);
  }

  @put('/provinces/{id}', {
    responses: {
      '204': {
        description: 'Province PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() province: Province,
  ): Promise<void> {
    await this.provinceRepository.replaceById(id, province);
  }

  @del('/provinces/{id}', {
    responses: {
      '204': {
        description: 'Province DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.provinceRepository.deleteById(id);
  }
}
