import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  findAll() {
    return this.settingsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  updateMany(@Body() settings: Record<string, string>) {
    return this.settingsService.updateMany(settings);
  }
}
