import { Controller, Get, Param } from '@nestjs/common';
import { CommunityProfileService } from './community-profile.service';

@Controller('community-profile')
export class CommunityProfileController {
  constructor(private service: CommunityProfileService) {}

  @Get(':id')
  async getProfile(@Param('id') id: string) {
    return this.service.generateCommunityProfile(+id);
  }
}
