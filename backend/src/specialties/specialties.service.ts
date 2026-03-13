import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Specialty } from './entities/specialty.entity';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';

@Injectable()
export class SpecialtiesService {
  constructor(
    @InjectRepository(Specialty)
    private specialtyRepository: Repository<Specialty>,
  ) {}

  create(createSpecialtyDto: CreateSpecialtyDto) {
    const specialty = this.specialtyRepository.create(createSpecialtyDto);
    return this.specialtyRepository.save(specialty);
  }

  findAll() {
    return this.specialtyRepository.find({ relations: ['hospitals'] });
  }

  async findOne(id: string) {
    const specialty = await this.specialtyRepository.findOne({
      where: { id },
      relations: ['hospitals'],
    });
    if (!specialty) throw new NotFoundException('Specialty not found');
    return specialty;
  }

  async findBySlug(slug: string) {
    const specialty = await this.specialtyRepository.findOne({
      where: { slug },
      relations: ['hospitals'],
    });
    if (!specialty) throw new NotFoundException('Specialty not found');
    return specialty;
  }

  async update(id: string, updateSpecialtyDto: UpdateSpecialtyDto) {
    const specialty = await this.findOne(id);
    Object.assign(specialty, updateSpecialtyDto);
    return this.specialtyRepository.save(specialty);
  }

  async remove(id: string) {
    const specialty = await this.findOne(id);
    return this.specialtyRepository.remove(specialty);
  }
}
