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
import {ContactabilityRegistration} from '../models';
import {ContactabilityRegistrationRepository} from '../repositories';

export class ContactabilityRegistrationController {
  constructor(
    @repository(ContactabilityRegistrationRepository)
    public contactabilityRegistrationRepository : ContactabilityRegistrationRepository,
  ) {}

  @post('/contactability-registrations', {
    responses: {
      '200': {
        description: 'ContactabilityRegistration model instance',
        content: {'application/json': {schema: getModelSchemaRef(ContactabilityRegistration)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ContactabilityRegistration, {
            title: 'NewContactabilityRegistration',
            exclude: ['id'],
          }),
        },
      },
    })
    contactabilityRegistration: Omit<ContactabilityRegistration, 'id'>,
  ): Promise<ContactabilityRegistration> {
    return this.contactabilityRegistrationRepository.create(contactabilityRegistration);
  }

  @get('/contactability-registrations/count', {
    responses: {
      '200': {
        description: 'ContactabilityRegistration model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(ContactabilityRegistration) where?: Where<ContactabilityRegistration>,
  ): Promise<Count> {
    return this.contactabilityRegistrationRepository.count(where);
  }

  @get('/contactability-registrations', {
    responses: {
      '200': {
        description: 'Array of ContactabilityRegistration model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ContactabilityRegistration, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(ContactabilityRegistration) filter?: Filter<ContactabilityRegistration>,
  ): Promise<ContactabilityRegistration[]> {
    return this.contactabilityRegistrationRepository.find(filter);
  }

  @patch('/contactability-registrations', {
    responses: {
      '200': {
        description: 'ContactabilityRegistration PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ContactabilityRegistration, {partial: true}),
        },
      },
    })
    contactabilityRegistration: ContactabilityRegistration,
    @param.where(ContactabilityRegistration) where?: Where<ContactabilityRegistration>,
  ): Promise<Count> {
    return this.contactabilityRegistrationRepository.updateAll(contactabilityRegistration, where);
  }

  @get('/contactability-registrations/{id}', {
    responses: {
      '200': {
        description: 'ContactabilityRegistration model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ContactabilityRegistration, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ContactabilityRegistration, {exclude: 'where'}) filter?: FilterExcludingWhere<ContactabilityRegistration>
  ): Promise<ContactabilityRegistration> {
    return this.contactabilityRegistrationRepository.findById(id, filter);
  }

  @patch('/contactability-registrations/{id}', {
    responses: {
      '204': {
        description: 'ContactabilityRegistration PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ContactabilityRegistration, {partial: true}),
        },
      },
    })
    contactabilityRegistration: ContactabilityRegistration,
  ): Promise<void> {
    await this.contactabilityRegistrationRepository.updateById(id, contactabilityRegistration);
  }

  @put('/contactability-registrations/{id}', {
    responses: {
      '204': {
        description: 'ContactabilityRegistration PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() contactabilityRegistration: ContactabilityRegistration,
  ): Promise<void> {
    await this.contactabilityRegistrationRepository.replaceById(id, contactabilityRegistration);
  }

  @del('/contactability-registrations/{id}', {
    responses: {
      '204': {
        description: 'ContactabilityRegistration DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.contactabilityRegistrationRepository.deleteById(id);
  }
}
