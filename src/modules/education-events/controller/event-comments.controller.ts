import {
  Controller,
  Get,
  Post,
  Body,
  //   Param,
  //   Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BaseDto } from 'src/common/dtos/base.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import {
  CreateOrUpdateDtoIn,
  EventCommentsResponseDtoOut,
} from '../dto/event-comments.dto';
import { EventCommentsService } from '../services/event-comments.service';

@ApiTags('Event Comments')
@Controller('event-comments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class EventsCommentsController {
  constructor(private readonly eventCommentsService: EventCommentsService) {}

  @Post('/createOrUpdate')
  @ApiOperation({
    summary: '** Create Or Update ** (ATTENTION PLEASE READ DESCRIPTION)',
    description:
      'Create Or Update Event Comment, Delete (id) from body json for create data || make sure value is UUID for userId and educationEvent',
  })
  @ApiResponse({
    type: CreateOrUpdateDtoIn,
  })
  async create(@Body() dto: CreateOrUpdateDtoIn) {
    const data = await this.eventCommentsService.createOrUpdate(dto);

    return new BaseDto(data.message, data.data);
  }

  @Get('/getAll')
  @ApiOperation({
    summary: 'Get all event comments',
    description: 'Get all event comments',
  })
  @ApiResponse({
    type: EventCommentsResponseDtoOut,
  })
  async findAll() {
    const getAll = await this.eventCommentsService.findAll();

    return new BaseDto('Success Get All Education Events', getAll);
  }

  //   @Get(':id')
  //   @ApiOperation({
  //     summary: 'Get one education events',
  //     description: 'Get one education events',
  //   })
  //   @ApiResponse({
  //     type: EducationEventResponseDtoOut,
  //   })
  //   async findOne(@Param('id') id: string) {
  //     const getOne = await this.eventCommentsService.findOne(id);

  //     return new BaseDto('Success Get One Education Event', getOne);
  //   }

  //   @Delete(':id')
  //   @ApiOperation({
  //     summary: 'Delete one education events',
  //     description: 'Delete one education events',
  //   })
  //   @ApiResponse({
  //     type: EducationEventResponseDtoOut,
  //   })
  //   async remove(@Param('id') id: string) {
  //     const remove = await this.eventCommentsService.remove(id);

  //     return new BaseDto('Success Delete Education Event', remove);
  //   }
}
