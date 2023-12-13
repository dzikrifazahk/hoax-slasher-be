import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DebunkingService } from './debunking.service';

@Controller('debunking')
export class DebunkingController {
  constructor(private readonly debunkingService: DebunkingService) {}

  // @Post()
  // create(@Body() createDebunkingDto: CreateDebunkingDto) {
  //   return this.debunkingService.create(createDebunkingDto);
  // }

  // @Get()
  // findAll() {
  //   return this.debunkingService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.debunkingService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDebunkingDto: UpdateDebunkingDto) {
  //   return this.debunkingService.update(+id, updateDebunkingDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.debunkingService.remove(+id);
  // }
}
