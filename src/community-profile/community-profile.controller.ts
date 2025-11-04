import { Controller, Get, Param } from '@nestjs/common';
import { CommunityProfileService } from './community-profile.service';

@Controller('community-profile')
export class CommunityProfileController {
  constructor(private service: CommunityProfileService) {}

  @Get('slug')
  async getProfile(@Param('slug') slug: string) {
    return this.service.generateCommunityProfile(slug);
  }
}
