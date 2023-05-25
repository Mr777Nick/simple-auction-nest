import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiBasicAuth, ApiOkResponse } from '@nestjs/swagger';

import { AppService } from './app.service';

@ApiBasicAuth()
@Controller({ version: VERSION_NEUTRAL })
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Get Hello World message, commonly used for checking if the server is running
   * @returns {string} Hello World message
   */
  @Get()
  @ApiOkResponse({ content: { 'text/html': { schema: { type: 'string' } } } })
  getHello(): string {
    return this.appService.getHello();
  }
}
