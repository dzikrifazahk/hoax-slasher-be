import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator, MaxFileSizeValidator } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDtoIn } from './dto/dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseDto } from 'src/common/dtos/base.dto';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventService: EventsService) {}
 
  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({
    summary: 'Create news not labeled',
    description: 'Create news not labeled',
  })
  @ApiResponse({
    type: CreateEventDtoIn,
  })
  async create(
    @Body() dto: CreateEventDtoIn,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 105242880 }), // 100MB
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|mp4|quicktime)$/ }),
        ],
      }),
    )
    file?: Express.Multer.File,
  ) {
    const create = await this.eventService.create(dto, file);
    return create;
  }

  @Get('/getAll')
  @ApiOperation({
    summary: 'Get all Event',
    description: 'Get all Event',
  })
  @ApiResponse({
    type: CreateEventDtoIn,
  })
  async findAll() {
    const getAll = await this.eventService.findAll();

    return new BaseDto('Success Get All Event', getAll);
  }
  
  @Get(':id')
  @ApiOperation({
    summary: 'Get one Event',
    description: 'Get one Event',
  })
  @ApiResponse({
    type: CreateEventDtoIn,
  })
  async findOne(@Param('id') id: string) {
    const getOne = await this.eventService.findOne(id);
    return new BaseDto('Success Get One Event', getOne);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update one news not labeled',
    description: 'Update one news not labeled',
  })
  @ApiResponse({
    type: CreateEventDtoIn,
  })
  async update(@Param('id') id: string, @Body() dto: CreateEventDtoIn) {
    const update = await this.eventService.update(id, dto);
    return new BaseDto('Success Update One News Not Labeled', update);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete one Event',
    description: 'Delete one Event',
  })
  @ApiResponse({
    type: CreateEventDtoIn,
  })
  async delete(@Param('id') id: string) {
    const deleteData = await this.eventService.delete(id);
    return new BaseDto('Success Delete one Event', deleteData);
  }
}
