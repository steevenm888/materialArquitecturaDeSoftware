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
import {Campaign} from '../models';
import {CampaignRepository} from '../repositories';

export class CampaignController {
  constructor(
    @repository(CampaignRepository)
    public campaignRepository : CampaignRepository,
  ) {}

  @post('/campaigns', {
    responses: {
      '200': {
        description: 'Campaign model instance',
        content: {'application/json': {schema: getModelSchemaRef(Campaign)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Campaign, {
            title: 'NewCampaign',
            exclude: ['id'],
          }),
        },
      },
    })
    campaign: Omit<Campaign, 'id'>,
  ): Promise<Campaign> {
    return this.campaignRepository.create(campaign);
  }

  @get('/campaigns/count', {
    responses: {
      '200': {
        description: 'Campaign model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Campaign) where?: Where<Campaign>,
  ): Promise<Count> {
    return this.campaignRepository.count(where);
  }

  @get('/campaigns', {
    responses: {
      '200': {
        description: 'Array of Campaign model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Campaign, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Campaign) filter?: Filter<Campaign>,
  ): Promise<Campaign[]> {
    return this.campaignRepository.find(filter);
  }

  @patch('/campaigns', {
    responses: {
      '200': {
        description: 'Campaign PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Campaign, {partial: true}),
        },
      },
    })
    campaign: Campaign,
    @param.where(Campaign) where?: Where<Campaign>,
  ): Promise<Count> {
    return this.campaignRepository.updateAll(campaign, where);
  }

  @get('/campaigns/{id}', {
    responses: {
      '200': {
        description: 'Campaign model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Campaign, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Campaign, {exclude: 'where'}) filter?: FilterExcludingWhere<Campaign>
  ): Promise<Campaign> {
    return this.campaignRepository.findById(id, filter);
  }

  @patch('/campaigns/{id}', {
    responses: {
      '204': {
        description: 'Campaign PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Campaign, {partial: true}),
        },
      },
    })
    campaign: Campaign,
  ): Promise<void> {
    await this.campaignRepository.updateById(id, campaign);
  }

  @put('/campaigns/{id}', {
    responses: {
      '204': {
        description: 'Campaign PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() campaign: Campaign,
  ): Promise<void> {
    await this.campaignRepository.replaceById(id, campaign);
  }

  @del('/campaigns/{id}', {
    responses: {
      '204': {
        description: 'Campaign DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.campaignRepository.deleteById(id);
  }
}
