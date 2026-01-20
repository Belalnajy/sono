import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamMember } from './team.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(TeamMember)
    private teamRepository: Repository<TeamMember>,
  ) {}

  async findAll(): Promise<TeamMember[]> {
    return this.teamRepository.find({
      order: { order: 'ASC', createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<TeamMember> {
    const member = await this.teamRepository.findOne({ where: { id } });
    if (!member) {
      throw new NotFoundException(`Team member with ID "${id}" not found`);
    }
    return member;
  }

  async create(data: Partial<TeamMember>): Promise<TeamMember> {
    const member = this.teamRepository.create(data);
    return this.teamRepository.save(member);
  }

  async update(id: string, data: Partial<TeamMember>): Promise<TeamMember> {
    const member = await this.findOne(id);
    Object.assign(member, data);
    return this.teamRepository.save(member);
  }

  async remove(id: string): Promise<void> {
    const member = await this.findOne(id);
    await this.teamRepository.remove(member);
  }
}
