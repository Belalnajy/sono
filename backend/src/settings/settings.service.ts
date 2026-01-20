import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setting } from './entities/setting.entity';

@Injectable()
export class SettingsService implements OnModuleInit {
  constructor(
    @InjectRepository(Setting)
    private settingsRepository: Repository<Setting>,
  ) {}

  async onModuleInit() {
    await this.initializeSettings();
  }

  private async initializeSettings() {
    const defaultSettings = [
      { key: 'facebook_url', value: '#' },
      { key: 'twitter_url', value: '#' },
      { key: 'instagram_url', value: '#' },
      { key: 'youtube_url', value: '#' },
      {
        key: 'news_ticker',
        value:
          'أحدث الدراسات الطبية تؤكد فعالية التغذية السليمة في تحسين المناعة العامة | المؤتمر الصحي العالمي يناقش تحديات الرعاية الصحية في الشرق الأوسط',
      },
      // Contact Information
      { key: 'contact_address_line1', value: 'مبنى الصحافة الطبية' },
      { key: 'contact_address_line2', value: '123 شارع الصحة' },
      { key: 'contact_address_line3', value: 'القاهرة، مصر' },
      { key: 'contact_email', value: 'editorial@sono.news' },
      { key: 'contact_phone', value: '+20 123 456 7890' },
      // Site Info
      { key: 'site_name', value: 'سونو' },
      { key: 'site_slogan', value: 'الصحه حضارة ... مصر اصلها' },
      { key: 'site_description', value: 'مصدرك الموثوق للأخبار الطبية الموثوقة والأبحاث المتطورة والتحليلات من الخبراء. نربط الفجوة بين العلوم الطبية والفهم العام.' },
    ];

    for (const setting of defaultSettings) {
      const exists = await this.settingsRepository.findOne({
        where: { key: setting.key },
      });
      if (!exists) {
        await this.settingsRepository.save(
          this.settingsRepository.create(setting),
        );
        console.log(`Initialized setting: ${setting.key}`);
      }
    }
  }

  async findAll() {
    const settings = await this.settingsRepository.find();
    // Convert to a simple object for easier frontend consumption
    return settings.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
  }

  async update(key: string, value: string) {
    let setting = await this.settingsRepository.findOne({ where: { key } });
    if (setting) {
      setting.value = value;
    } else {
      setting = this.settingsRepository.create({ key, value });
    }
    return await this.settingsRepository.save(setting);
  }

  async updateMany(settings: Record<string, string>) {
    const results = [];
    for (const [key, value] of Object.entries(settings)) {
      results.push(await this.update(key, value));
    }
    return results;
  }
}
