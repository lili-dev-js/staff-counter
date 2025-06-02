import { CreateErrorDto } from './dto/create-error.dto';
import { ErrorService } from './error.service';
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ErrorService', () => {
  let service: ErrorService;
  let repository: Repository<Error>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ErrorService,
        {
          provide: getRepositoryToken(Error),
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ErrorService>(ErrorService);
    repository = module.get<Repository<Error>>(getRepositoryToken(Error));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call repository.save with createErrorDto array and return the result', async () => {
      const createErrorDto: CreateErrorDto[] = [
        {
          startFirstShift: 8,
          endLastShift: 16,
          error: 'Sample error',
          employee: { id: 234 },
          workSchedule: { id: 234 },
        },
      ];

      const savedErrors = [
        {
          id: 1,
          ...createErrorDto[0],
        },
      ];

      (repository.save as jest.Mock).mockResolvedValue(savedErrors);

      const result = await service.create(createErrorDto);

      expect(repository.save).toHaveBeenCalledWith(createErrorDto);
      expect(result).toEqual(savedErrors);
    });
  });
});
