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
import {Canton} from '../models';
import {CantonRepository} from '../repositories';

export class CantonController {
  constructor(
    @repository(CantonRepository)
    public cantonRepository : CantonRepository,
  ) {}

  @post('/cantons', {
    responses: {
      '200': {
        description: 'Canton model instance',
        content: {'application/json': {schema: getModelSchemaRef(Canton)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Canton, {
            title: 'NewCanton',
            exclude: ['id'],
          }),
        },
      },
    })
    canton: Omit<Canton, 'id'>,
  ): Promise<Canton> {
    return this.cantonRepository.create(canton);
  }

  @get('/cantons/count', {
    responses: {
      '200': {
        description: 'Canton model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Canton) where?: Where<Canton>,
  ): Promise<Count> {
    return this.cantonRepository.count(where);
  }

  @get('/cantons', {
    responses: {
      '200': {
        description: 'Array of Canton model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Canton, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Canton) filter?: Filter<Canton>,
  ): Promise<Canton[]> {
    return this.cantonRepository.find(filter);
  }

  @patch('/cantons', {
    responses: {
      '200': {
        description: 'Canton PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Canton, {partial: true}),
        },
      },
    })
    canton: Canton,
    @param.where(Canton) where?: Where<Canton>,
  ): Promise<Count> {
    return this.cantonRepository.updateAll(canton, where);
  }

  @get('/cantons/{id}', {
    responses: {
      '200': {
        description: 'Canton model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Canton, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Canton, {exclude: 'where'}) filter?: FilterExcludingWhere<Canton>
  ): Promise<Canton> {
    return this.cantonRepository.findById(id, filter);
  }

  @patch('/cantons/{id}', {
    responses: {
      '204': {
        description: 'Canton PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Canton, {partial: true}),
        },
      },
    })
    canton: Canton,
  ): Promise<void> {
    await this.cantonRepository.updateById(id, canton);
  }

  @put('/cantons/{id}', {
    responses: {
      '204': {
        description: 'Canton PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() canton: Canton,
  ): Promise<void> {
    await this.cantonRepository.replaceById(id, canton);
  }

  @del('/cantons/{id}', {
    responses: {
      '204': {
        description: 'Canton DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.cantonRepository.deleteById(id);
  }
}
