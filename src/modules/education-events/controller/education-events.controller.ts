import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { EducationEventsService } from '../services/education-events.service';
import {
  CreateEducationEventDtoIn,
  EducationEventResponseDtoOut,
} from '../dto/education-event.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BaseDto } from 'src/common/dtos/base.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@ApiTags('Education Events')
@Controller('education-events')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class EducationEventsController {
  constructor(
    private readonly educationEventsService: EducationEventsService,
  ) {}

  @Post('/createOrUpdate')
  @ApiOperation({
    summary: '** Create Or Update ** (ATTENTION PLEASE READ DESCRIPTION)',
    description:
      'Create Or Update Education Event, Delete (id) from body json for create data || isOnline, links, reminderDate, filePath, filePath are optional',
  })
  @ApiResponse({
    type: CreateEducationEventDtoIn,
  })
  async create(@Body() dto: CreateEducationEventDtoIn) {
    const data = await this.educationEventsService.createOrUpdate(dto);

    return new BaseDto(data.message, data.data);
  }

  @Get('/getAll')
  @ApiOperation({
    summary: 'Get all education events',
    description: 'Get all education events',
  })
  @ApiResponse({
    type: EducationEventResponseDtoOut,
  })
  async findAll() {
    const getAll = await this.educationEventsService.findAll();

    return new BaseDto('Success Get All Education Events', getAll);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get one education events',
    description: 'Get one education events',
  })
  @ApiResponse({
    type: EducationEventResponseDtoOut,
  })
  async findOne(@Param('id') id: string) {
    const getOne = await this.educationEventsService.findOne(id);

    return new BaseDto('Success Get One Education Event', getOne);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete one education events',
    description: 'Delete one education events',
  })
  @ApiResponse({
    type: EducationEventResponseDtoOut,
  })
  async remove(@Param('id') id: string) {
    const remove = await this.educationEventsService.remove(id);

    return new BaseDto('Success Delete Education Event', remove);
  }
}
