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
      name: '남양주네집',
      address: '경기도 남양주시 화도읍 먹갓로27번길 25 (묵현리)',
      lat: 37.659391,
      lon: 127.2720471,
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
  });

  describe('processSingleRestaurantData 메소드 테스트', () => {
    it('유효한 데이터가 제공될 때 activeCount가 증가해야합니다.', async () => {
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

      await service['processSingleRestaurantData'](
        restaurantData1,
        mockTransactionalEntityManager as any,
      );

      mockTransactionalEntityManager.save.mockResolvedValue({
        id: 1,
        uniqueId: '3960100-101-2000-00123',
        name: '남양주 맛집',
        address: '경기도 남양주시 화도읍 먹갓로27번길 25 (묵현리)',
        lat: 37.659391,
        lon: 127.2720471,
        telephone: '031-1234-5678',
        category: mockCategory,
        city: mockCity,
      });

      expect(mockTransactionalEntityManager.save).toHaveBeenCalledTimes(1);
      expect((service as any).activeCount).toBe(1);
    });

    it('유효하지 않은 위도와 경도가 제공될 때 noDataCount가 증가해야합니다.', async () => {
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

  describe('validateAndFormatTelephone', () => {
    it('유효한 시작 번호를 가진 전화번호를 올바른 형식으로 내보냅니다.', () => {
      const validTelephones = [
        '031-1234-5678',
        '032-1234-5678',
        '02-1234-5678',
        '070-1234-5678',
        '050-1234-5678',
      ];

      validTelephones.forEach((number) => {
        expect(service['validateAndFormatTelephone'](number)).toBe(number);
      });
    });

    it('유효하지 않은 시작 번호를 가진 전화번호에 "031"을 붙여줍니다', () => {
      const invalidTelephones = [
        '123-4567-8901',
        '041-1234-5678',
        '330-1234-5678',
      ];

      invalidTelephones.forEach((number) => {
        expect(service['validateAndFormatTelephone'](number)).toBe(
          `031${number}`,
        );
      });
    });
  });
});
