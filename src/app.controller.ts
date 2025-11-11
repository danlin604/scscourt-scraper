import { Controller, Get, Post, Body, HttpCode, HttpStatus, NotFoundException } from '@nestjs/common';
import { AppService } from './app.service';
import { SearchDto } from './dto/search.dto';

@Controller(`/api`)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post(`/search`)
  @HttpCode(HttpStatus.OK)
  async search(@Body() searchDto: SearchDto) {
    // Search for cases
    const { data, sourceUrl } = await this.appService.searchCases(
      searchDto.firstName,
      searchDto.lastName
    );

    // Handle not found
    if (!data || data.length === 0) {
      throw new NotFoundException('No cases found');
    }

    return {
      data,
      metadata: {
        sourceUrl,
        timestamp: new Date().toISOString(),
      }
    };
  }
}
