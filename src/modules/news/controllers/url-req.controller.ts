import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UrlReqService } from '../services/url-req.service';
import { BaseDto } from 'src/common/dtos/base.dto';
import {
  CreateOrUpdateUrlReqDtoIn,
  ResponseUrlReqDtoOut,
  SendUrlForAnalyzeDtoIn,
} from '../dto/url-req.dto';

@ApiTags('Url Request')
@Controller('url-req')
export class UrlReqController {
  constructor(private readonly urlReeqService: UrlReqService) {}

  @Post('/createOrUpdate')
  @ApiOperation({
    summary: 'Create or Update url request',
    description: 'Create Create or Update url request',
  })
  @ApiResponse({
    type: CreateOrUpdateUrlReqDtoIn,
  })
  async createOrUpdate(@Body() dto: CreateOrUpdateUrlReqDtoIn) {
    const foundUrlReq = await this.urlReeqService.createOrUpdate(dto);
    return new BaseDto(foundUrlReq.message, foundUrlReq.data);
  }

  @Post('/sendUrl')
  @ApiOperation({
    summary: 'Sending Url for analyze',
    description: 'Create Sending Url for analyze',
  })
  @ApiResponse({
    type: CreateOrUpdateUrlReqDtoIn,
  })
  async sendUrl(@Body() dto: SendUrlForAnalyzeDtoIn) {
    const foundUrlReq = await this.urlReeqService.sendUrlForAnalyze(dto);
    // return new BaseDto(foundUrlReq.message, foundUrlReq.data);
    return foundUrlReq;
  }

  @Get('/get-by-user/:userId')
  @ApiOperation({
    summary: 'Get all url request',
    description: 'Get all url request',
  })
  @ApiResponse({
    type: ResponseUrlReqDtoOut,
  })
  async getNewsWithUrlReqByUserId(@Param('userId') userId: string) {
    console.log('daricontoller', userId);
    const data = await this.urlReeqService.findUrlRequestByUserId(userId);
    return new BaseDto('Success Get One Data', data);
  }

  @Get('/getAll')
  @ApiOperation({
    summary: 'Get all url request',
    description: 'Get all url request',
  })
  @ApiResponse({
    type: ResponseUrlReqDtoOut,
  })
  async findAll() {
    const foundUrlReq = await this.urlReeqService.findAll();
    return new BaseDto('Success Get All Data', foundUrlReq);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get url request by id',
    description: 'Get url request by id',
  })
  @ApiResponse({
    type: ResponseUrlReqDtoOut,
  })
  async findOne(@Param('id') id: string) {
    const foundUrlReq = await this.urlReeqService.findOne(id);
    return new BaseDto('Success Get One Data', foundUrlReq);
  }

  @Get('/delete/:id')
  @ApiOperation({
    summary: 'Delete url request',
    description: 'Delete url request',
  })
  @ApiResponse({
    type: ResponseUrlReqDtoOut,
  })
  async delete(@Param('id') id: string) {
    const foundUrlReq = await this.urlReeqService.delete(id);
    return new BaseDto('Success Delete Data', foundUrlReq);
  }
}
