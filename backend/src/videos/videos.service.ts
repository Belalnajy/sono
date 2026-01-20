import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Video } from './entities/video.entity';
import { Category } from '../categories/entities/category.entity';
import { Subcategory } from '../subcategories/entities/subcategory.entity';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private videoRepository: Repository<Video>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Subcategory)
    private subcategoryRepository: Repository<Subcategory>,
  ) {}

  async create(createVideoDto: CreateVideoDto): Promise<Video> {
    const category = await this.categoryRepository.findOne({
      where: { id: createVideoDto.categoryId },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${createVideoDto.categoryId} not found`);
    }

    let subcategory: Subcategory | undefined = undefined;
    if (createVideoDto.subcategoryId) {
      const sub = await this.subcategoryRepository.findOne({
        where: { id: createVideoDto.subcategoryId },
      });
      if (!sub) {
        throw new NotFoundException(`Subcategory with ID ${createVideoDto.subcategoryId} not found`);
      }
      subcategory = sub;
    }

    const video = this.videoRepository.create({
      ...createVideoDto,
      category,
      subcategory,
    });
    return await this.videoRepository.save(video);
  }

  async findAll(categoryId?: string, subcategoryId?: string): Promise<Video[]> {
    const query = this.videoRepository.createQueryBuilder('video')
      .leftJoinAndSelect('video.category', 'category')
      .leftJoinAndSelect('video.subcategory', 'subcategory')
      .orderBy('video.created_at', 'DESC');

    if (categoryId) {
      query.andWhere('video.categoryId = :categoryId', { categoryId });
    }
    if (subcategoryId) {
      query.andWhere('video.subcategoryId = :subcategoryId', { subcategoryId });
    }

    return await query.getMany();
  }

  async findOne(id: string): Promise<Video> {
    const video = await this.videoRepository.findOne({
      where: { id },
      relations: ['category', 'subcategory'],
    });
    if (!video) {
      throw new NotFoundException(`Video with ID ${id} not found`);
    }
    return video;
  }

  async update(id: string, updateVideoDto: UpdateVideoDto): Promise<Video> {
    const video = await this.findOne(id);

    if (updateVideoDto.categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: updateVideoDto.categoryId },
      });
      if (!category) {
        throw new NotFoundException(`Category with ID ${updateVideoDto.categoryId} not found`);
      }
      video.category = category;
    }

    if (updateVideoDto.subcategoryId) {
      const subcategory = await this.subcategoryRepository.findOne({
        where: { id: updateVideoDto.subcategoryId },
      });
      if (!subcategory) {
        throw new NotFoundException(`Subcategory with ID ${updateVideoDto.subcategoryId} not found`);
      }
      video.subcategory = subcategory;
    }

    Object.assign(video, updateVideoDto);
    return await this.videoRepository.save(video);
  }

  async remove(id: string): Promise<void> {
    const result = await this.videoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Video with ID ${id} not found`);
    }
  }
}
