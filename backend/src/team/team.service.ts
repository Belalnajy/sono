import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamMember } from './team.entity';

@Injectable()
export class TeamService implements OnModuleInit {
  constructor(
    @InjectRepository(TeamMember)
    private teamRepository: Repository<TeamMember>,
  ) {}

  async onModuleInit() {
    const supervisionCount = await this.teamRepository.count({ where: { type: 'supervision' } });
    const editorInChiefCount = await this.teamRepository.count({ where: { type: 'editor_in_chief' } });
    
    if (supervisionCount === 0 && editorInChiefCount === 0) {
      const initialTeam = [
        {
          name: 'أ.د/ نائلة عمارة',
          role: 'عميد كلية الاعلام وفنون الاتصال - جامعة فاروس',
          imageUrl: 'https://placehold.co/400x400/0b1829/white?text=General+Supervision',
          order: 1,
          type: 'supervision',
        },
        {
          name: 'أ.م.د/ إبراهيم التوام',
          role: 'رئيس قسم الصحافة والنشر الرقمي - جامعة فاروس',
          imageUrl: 'https://placehold.co/400x400/0b1829/white?text=General+Supervision',
          order: 2,
          type: 'supervision',
        },
        {
          name: 'د/ جيهان أشرف',
          role: 'المدرس بقسم الصحافة والنشر الرقمي - جامعة فاروس',
          imageUrl: 'https://placehold.co/400x400/BF9B50/white?text=Editor+in+Chief',
          order: 1,
          type: 'editor_in_chief',
        },
      ];
      await this.teamRepository.save(this.teamRepository.create(initialTeam));
    }
  }

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
