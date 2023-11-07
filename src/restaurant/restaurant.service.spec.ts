import { Test } from '@nestjs/testing';
import { RestaurantService } from './restaurant.service';
import { RestaurantRepository } from './restaurant.repository';
import { EntityManager } from 'typeorm';
import mockAxios from 'jest-mock-axios';

afterEach(() => {
  mockAxios.reset();
});

type MockRestaurantRepository = {
  [P in keyof RestaurantRepository]: jest.Mock<any, any>;
};

const mockCategory = {
  id: 1,
  name: '한식',
  restaurants: [],
};

const mockCity = {
  id: 1,
  name: '남양주시',
  restaurants: [],
};

const mockRepository: MockRestaurantRepository = {
  findByUniqueId: jest.fn().mockResolvedValue(null),
  softDeleteRestaurant: jest.fn().mockResolvedValue({ affected: 1 }),
  findOne: jest.fn(),
  assignRelations: jest.fn(),
  findOrCreate: jest.fn().mockResolvedValue({
    wasExisting: false,
    entity: {
      id: 1,
      uniqueId: '3960100-101-2000-00123',
      name: '남양주 맛집',
      address: '경기도 남양주시 화도읍 먹갓로27번길 25 (묵현리)',
      latitude: 37.659391,
      longitude: 127.2720471,
      telephone: '031-1234-5678',
      category: mockCategory,
      city: mockCity,
    },
  }),
  count: jest.fn(),
};

const mockTransactionEntityManager: Partial<jest.Mocked<EntityManager>> = {
  save: jest.fn().mockResolvedValue(true),
};

describe('RestaurantService', () => {
  let service: RestaurantService;
  let mockEntityManager: Partial<jest.Mocked<EntityManager>> &
    Pick<EntityManager, 'transaction'>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RestaurantService,
        {
          provide: RestaurantRepository,
          useValue: mockRepository,
        },
        {
          provide: EntityManager,
          useValue: {} as any,
        },
      ],
    }).compile();

    service = module.get<RestaurantService>(RestaurantService);
    mockEntityManager = {
      ...jest.genMockFromModule<EntityManager>('typeorm'),
      transaction: jest.fn().mockImplementation((arg1: any, arg2?: any) => {
        if (typeof arg1 === 'string' && arg2) {
          return arg2(mockTransactionEntityManager as unknown as EntityManager);
        }
        if (typeof arg1 === 'function' && !arg2) {
          return arg1(mockTransactionEntityManager as unknown as EntityManager);
        }
        throw new Error(
          'Invalid arguments passed to transaction mock implementation',
        );
      }) as any,
    };
    jest.clearAllMocks();
  });

  it('should save valid restaurant data from API and return true', async () => {
    const restaurantData1 = {
      UNITY_BSN_STATE_NM: '영업/정상',
      MANAGE_NO: '3960100-101-2000-00123',
      BIZPLC_NM: '남양주 맛집',
      REFINE_ROADNM_ADDR: '경기도 남양주시 화도읍 먹갓로27번길 25 (묵현리)',
      REFINE_WGS84_LAT: '37.659391',
      REFINE_WGS84_LOGT: '127.2720471',
      LOCPLC_FACLT_TELNO: '031-1234-5678',
      SANITTN_BIZCOND_NM: '한식',
      REFINE_LOTNO_ADDR: '경기도 남양주시 화도읍 묵현리 588번지',
      SIGUN_NM: '남양주시',
    };

    const mockTransactionalEntityManager = {
      save: jest.fn().mockResolvedValue(true),
    };

    mockEntityManager.transaction.mockImplementation(
      (isolationLevelOrCallback: any, maybeCallback?: any) => {
        let callback: (entityManager: EntityManager) => Promise<any>;
        if (
          typeof isolationLevelOrCallback === 'function' &&
          maybeCallback === undefined
        ) {
          callback = isolationLevelOrCallback;
        } else if (typeof maybeCallback === 'function') {
          callback = maybeCallback;
        } else {
          throw new Error(
            'Invalid arguments for transaction mock implementation',
          );
        }
        return callback(
          mockTransactionalEntityManager as unknown as EntityManager,
        );
      },
    );

    await service['processSingleRestaurantData'](
      restaurantData1,
      mockTransactionalEntityManager as any,
    );

    mockTransactionalEntityManager.save.mockResolvedValue({
      id: 1,
      uniqueId: '3960100-101-2000-00123',
      name: '남양주 맛집',
      address: '경기도 남양주시 화도읍 먹갓로27번길 25 (묵현리)',
      latitude: 37.659391,
      longitude: 127.2720471,
      telephone: '031-1234-5678',
      category: mockCategory,
      city: mockCity,
    });

    expect(mockTransactionalEntityManager.save).toHaveBeenCalledTimes(1);
    expect((service as any).activeCount).toBe(1);
  });

  it('should increment noDataCount when invalid latitude and longitude are provided', async () => {
    const invalidRestaurantData = {
      UNITY_BSN_STATE_NM: '영업/정상',
      MANAGE_NO: '3960100-101-2000-00123',
      BIZPLC_NM: '남양주 맛집',
      REFINE_ROADNM_ADDR: '경기도 남양주시 화도읍 먹갓로27번길 25 (묵현리)',
      REFINE_WGS84_LAT: null,
      REFINE_WGS84_LOGT: null,
      LOCPLC_FACLT_TELNO: '031-1234-5678',
      SANITTN_BIZCOND_NM: '한식',
      REFINE_LOTNO_ADDR: '경기도 남양주시 화도읍 묵현리 588번지',
      SIGUN_NM: null,
    };

    await service['processSingleRestaurantData'](
      invalidRestaurantData,
      mockTransactionEntityManager as unknown as EntityManager,
    );

    expect((service as any).noDataCount).toBe(1);
  });
});
