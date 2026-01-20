import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamMember } from './team.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  findAll(): Promise<TeamMember[]> {
    return this.teamService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() data: Partial<TeamMember>): Promise<TeamMember> {
    return this.teamService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<TeamMember>,
  ): Promise<TeamMember> {
    return this.teamService.update(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.teamService.remove(id);
  }
}
