import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RunsService } from './runs.service';
import { Run } from './runs.model';

@Controller('runs')
export class RunsController {
  constructor(private readonly runsService: RunsService) {}

  @Get()
  getAllRuns() {
    return this.runsService.getAllRuns();
  }

  @Get(':id')
  getRun(@Param('id') id: number) {
    return this.runsService.getRun(id);
  }

  @Post()
  createRun(
    @Body('time') time: number,
    @Body('distance') distance: number,
  ) {
    return this.runsService.createRun(distance, time);
  }

  @Patch(':id')
  updateRun(@Param('id') id: number, @Body() dto: Run) {
    return this.runsService.updateRun(id, dto);
  }

  @Delete(':id')
  deleteRun(@Param('id') id: number) {
    return this.runsService.deleteRun(id);
  }
}
