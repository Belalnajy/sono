import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { Subcategory } from './entities/subcategory.entity';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class SubcategoriesService {
  constructor(
    @InjectRepository(Subcategory)
    private subcategoryRepository: Repository<Subcategory>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createSubcategoryDto: CreateSubcategoryDto): Promise<Subcategory> {
    const category = await this.categoryRepository.findOne({
      where: { id: createSubcategoryDto.categoryId },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${createSubcategoryDto.categoryId} not found`);
    }

    const subcategory = this.subcategoryRepository.create({
      ...createSubcategoryDto,
      category,
    });
    return await this.subcategoryRepository.save(subcategory);
  }

  async findAll(): Promise<Subcategory[]> {
    return await this.subcategoryRepository.find({
      relations: ['category'],
    });
  }

  async findOne(id: string): Promise<Subcategory> {
    const subcategory = await this.subcategoryRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!subcategory) {
      throw new NotFoundException(`Subcategory with ID ${id} not found`);
    }
    return subcategory;
  }

  async findBySlug(slug: string): Promise<Subcategory> {
    const subcategory = await this.subcategoryRepository.findOne({
      where: { slug },
      relations: ['category'],
    });
    if (!subcategory) {
      throw new NotFoundException(`Subcategory with slug ${slug} not found`);
    }
    return subcategory;
  }

  async update(id: string, updateSubcategoryDto: UpdateSubcategoryDto): Promise<Subcategory> {
    const subcategory = await this.findOne(id);
    
    if (updateSubcategoryDto.categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: updateSubcategoryDto.categoryId },
      });
      if (!category) {
        throw new NotFoundException(`Category with ID ${updateSubcategoryDto.categoryId} not found`);
      }
      subcategory.category = category;
    }

    Object.assign(subcategory, updateSubcategoryDto);
    return await this.subcategoryRepository.save(subcategory);
  }

  async remove(id: string): Promise<void> {
    const result = await this.subcategoryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Subcategory with ID ${id} not found`);
    }
  }
}
