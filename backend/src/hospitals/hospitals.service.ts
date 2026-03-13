import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hospital } from './entities/hospital.entity';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';

@Injectable()
export class HospitalsService {
  constructor(
    @InjectRepository(Hospital)
    private hospitalRepository: Repository<Hospital>,
  ) {}

  create(createHospitalDto: CreateHospitalDto) {
    const hospital = this.hospitalRepository.create(createHospitalDto);
    return this.hospitalRepository.save(hospital);
  }

  findAll() {
    return this.hospitalRepository.find({ relations: ['specialty'] });
  }

  async findOne(id: string) {
    const hospital = await this.hospitalRepository.findOne({
      where: { id },
      relations: ['specialty'],
    });
    if (!hospital) throw new NotFoundException('Hospital not found');
    return hospital;
  }

  async findBySlug(slug: string) {
    const hospital = await this.hospitalRepository.findOne({
      where: { slug },
      relations: ['specialty'],
    });
    if (!hospital) throw new NotFoundException('Hospital not found');
    return hospital;
  }

  async update(id: string, updateHospitalDto: UpdateHospitalDto) {
    const hospital = await this.findOne(id);
    Object.assign(hospital, updateHospitalDto);
    return this.hospitalRepository.save(hospital);
  }

  async remove(id: string) {
    const hospital = await this.findOne(id);
    return this.hospitalRepository.remove(hospital);
  }
}
