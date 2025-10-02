import { Injectable } from '@nestjs/common';
import { CommunitiesRepository } from '../database/postgres/repositories/communities.repository';
import { MembersRepository } from '../database/postgres/repositories/members.repository';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { Community, Role, Member } from '@prisma/client';

@Injectable()
export class CommunitiesService {
  constructor(
    private communitiesRepository: CommunitiesRepository,
    private membersRepository: MembersRepository,
  ) {}

  //CRUD COMMUNITY (jisus 3:37AM i wanna die)
  async createCommunity(data: CreateCommunityDto): Promise<Community> {
    return this.communitiesRepository.create(data);
  }

  async findById(id: number): Promise<Community | null> {
    return this.communitiesRepository.findById(id);
  }

  async findAll(): Promise<Community[]> {
    return this.communitiesRepository.findAll();
  }

  async update(
    id: number,
    data: UpdateCommunityDto,
  ): Promise<Community | null> {
    return this.communitiesRepository.update(id, data);
  }

  async delete(id: number): Promise<boolean> {
    try {
      const result = await this.communitiesRepository.delete(id);
      return !!result;
    } catch (error) {
      return false;
    }
  }
  //Join logic

  async JoinCommunity(communityId: number, userId: number): Promise<Member> {
    const community = await this.communitiesRepository.findById(communityId);
    if (!community) {
      throw new Error("Comunidad no encontrada :D");
    }

    const existMember = await this.membersRepository.findMember(userId, communityId);
    if (existMember) {
      throw new Error("Ya eres miembro!! >:C");
    }

    return this.membersRepository.addMember(userId, communityId, Role.MEMBER)
  }

  async getCommunityMembers(communityId: number): Promise<Member[]>{
    return this.membersRepository.getMembersByCommunity(communityId);
  }

  async leaveCommunity(communityId: number, userId: number): Promise<boolean>{
    const member = await this.membersRepository.findMember(userId, communityId);

    //idk if i need that but... in any case
    if (!member) {
      throw new Error("Ya eres miembro!! >:C");
    }

    if (member.role == Role.OWNER) {
      throw new Error("eres admin, no podes irte >:C");
    }

    await this.membersRepository.delete(member.id);

    return true;
  }

  async isUserMember(communityId: number, userId: number): Promise<boolean>{
    const member = await this.membersRepository.findMember(userId,communityId);
    //reminder "!!" convert to boolean 
    return !!member;
  }
}
