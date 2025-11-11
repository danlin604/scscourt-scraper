import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import johnSmithFixture from './fixtures/response-john-smith.json';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('When searched for first and last name', () => {
    it('should return success when searching for John Smith', async () => {
      const searchDto = { firstName: 'John', lastName: 'Smith' };

      // Mock service response with cases and sourceUrl
      const mockResponse = {
        data: johnSmithFixture.data,
        sourceUrl: 'https://portal.scscourt.org/search/party?firstName=John&lastName=Smith'
      };

      jest.spyOn(appService, 'searchCases').mockResolvedValue(mockResponse);

      // Act
      const result = await appController.search(searchDto);

      // Assert
      expect(appService.searchCases).toHaveBeenCalledWith('John', 'Smith');
      expect(result.data).toEqual(johnSmithFixture.data);
      expect(result.metadata.sourceUrl).toBe(mockResponse.sourceUrl);
      expect(result.metadata.timestamp).toBeDefined();
    });

    it('should throw NotFoundException when no cases found', async () => {
      const searchDto = { firstName: 'Nonexistent', lastName: 'Person' };

      // Mock service to return empty data array
      const mockResponse = {
        data: [],
        sourceUrl: 'https://portal.scscourt.org/search/party?firstName=Nonexistent&lastName=Person'
      };

      jest.spyOn(appService, 'searchCases').mockResolvedValue(mockResponse);

      await expect(appController.search(searchDto)).rejects.toThrow(NotFoundException);
    });
  });

});