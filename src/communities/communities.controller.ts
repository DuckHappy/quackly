import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { JoinCommunityDto } from './dto/join-community.dto';
import { Community, Member } from '@prisma/client';

@Controller('communities')
export class CommunitiesController {
  constructor(private readonly communitiesService: CommunitiesService) { }

  @Post()
  create(@Body() createCommunityDto: CreateCommunityDto) {
    return this.communitiesService.createCommunity(createCommunityDto);
  }

  @Get()
  findAll(): Promise<Community[]> {
    return this.communitiesService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): Promise<Community | null> {
    return this.communitiesService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommunityDto: UpdateCommunityDto,
  ) {
    return this.communitiesService.update(+id, updateCommunityDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.communitiesService.delete(id);
  }

  //ENDPOINT for community
  @Post(":id/join")
  @HttpCode(HttpStatus.CREATED)
  JoinCommunity(
    @Param('id', ParseIntPipe) communityId: number,
    @Body() JoinCommunityDto: JoinCommunityDto,
  ): Promise<Member> {
    return this.communitiesService.JoinCommunity(communityId, JoinCommunityDto.userId)
  }

  //ENDPOINT for list members (members details)
  @Get(':id/members')
  getCommunityMembers(
    @Param('id', ParseIntPipe) communityId: number,
  ): Promise<Member[]> {
    return this.communitiesService.getCommunityMembers(communityId);
  }

  //ENDPOINT for quit community
  @Delete(':id/leave')
  @HttpCode(HttpStatus.NO_CONTENT)
  async leaveCommunity(
    @Param('id', ParseIntPipe) communityId: number,
    @Body() JoinCommunityDto: JoinCommunityDto,
  ): Promise<void> {
    await this.communitiesService.leaveCommunity(communityId, JoinCommunityDto.userId);
  }
}
