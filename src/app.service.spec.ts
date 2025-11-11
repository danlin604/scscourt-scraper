import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import searchResultsFixture from './fixtures/response-john-smith.json';
import caseDetails10000 from './fixtures/response-john-smith-detail-case-10000.json';
import caseDetails10001 from './fixtures/response-john-smith-detail-case-10001.json';

describe('AppService USE_FIXTURES true', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
    process.env.USE_FIXTURES = 'true';
  });

  afterEach(() => {
    delete process.env.USE_FIXTURES;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return cases with fixture data', async () => {
    const result = await service.searchCases('John', 'Smith');

    expect(result.data).toBeDefined();
    expect(result.data.length).toBe(searchResultsFixture.data.length);
    expect(result.data[0].caseId).toBe(searchResultsFixture.data[0].caseId);
    expect(result.data[1].caseId).toBe(searchResultsFixture.data[1].caseId);
    expect(result.sourceUrl).toContain('firstName=John&lastName=Smith');
  });

  it('should attach case details to each case', async () => {
    const result = await service.searchCases('John', 'Smith');

    expect(result.data[0].details).toBeDefined();
    expect(result.data[0].details.data.id).toBe(caseDetails10000.data.id);
    expect(result.data[1].details).toBeDefined();
    expect(result.data[1].details.data.id).toBe(caseDetails10001.data.id);
  });
});

describe('AppService USE_FIXTURES false', () => {
  let service: AppService;
  let fetchSpy: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
    process.env.USE_FIXTURES = 'false';
    fetchSpy = jest.spyOn(global, 'fetch').mockImplementation();
  });

  afterEach(() => {
    fetchSpy.mockRestore();
    delete process.env.USE_FIXTURES;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call fetch with correct params for cases', async () => {
    const mockResponse = {
      ok: true,
      json: async () => searchResultsFixture,
    };
    fetchSpy.mockResolvedValue(mockResponse as any);

    await service.searchCases('John', 'Smith');

    expect(fetchSpy).toHaveBeenCalledWith(
      'https://portal.scscourt.org/api/cases/byparty',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json;charset=utf-8',
        }),
        body: JSON.stringify({ firstName: 'John', lastName: 'Smith' }),
      })
    );
  });

  it('should call fetch for case details', async () => {
    const mockCasesResponse = {
      ok: true,
      json: async () => searchResultsFixture,
    };
    const mockDetailsResponse = {
      ok: true,
      json: async () => caseDetails10000,
    };

    fetchSpy
      .mockResolvedValueOnce(mockCasesResponse as any)
      .mockResolvedValueOnce(mockDetailsResponse as any)
      .mockResolvedValueOnce(mockDetailsResponse as any);

    await service.searchCases('John', 'Smith');

    expect(fetchSpy).toHaveBeenCalledTimes(3);
  });

  it('should throw error when fetch fails', async () => {
    const mockResponse = {
      ok: false,
      status: 500,
    };
    fetchSpy.mockResolvedValue(mockResponse as any);

    await expect(service.searchCases('John', 'Smith')).rejects.toThrow();
  });
});