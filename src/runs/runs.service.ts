import { Injectable, NotFoundException } from '@nestjs/common';
// import { CreateRunDto } from './dto/create-run.dto';
// import { UpdateRunDto } from './dto/update-run.dto';
import {Run} from './runs.model';

@Injectable()
export class RunsService {

  private runs: Run[] = [
    {
      id: 1,
      time: 100,
      distance: 2,
    },
    {
      id: 2,
      time: 200,
      distance: 2,
    },
    {
      id: 3,
      time: 250,
      distance: 2,
    },
  ];

  createRun(distance: number, time: number) {
    const nextId = this.runs[this.runs.length - 1].id + 1;

    this.runs.push({
      id: nextId,
      time,
      distance,
    });
    //console.log(this.runs)

    return { newId: nextId };
  }

  getAllRuns() {
    return [...this.runs];
  }
  findRun(id: number) {
    return this.runs.find((value) => value.id == id);
  }
  getRun(id: number) {
    const run = this.findRun(id);
    if (run == null) {
      throw new NotFoundException('Run not found');
    }
    return { ...run };
  }

  updateRun(id: number, payload: Run) {
    const currentRun = this.findRun(id);
    if (currentRun === null) {
      throw new NotFoundException('Can not find Run with id:' + id);
    }
    console.log(payload)
    console.log(currentRun)
    const updatedRun = {
      ...currentRun,
      ...payload,
    };
    this.update(updatedRun);
    return updatedRun;
  }

  update(updatedRun: Run) {
    const index = this.runs.findIndex((item) => item.id === updatedRun.id);
    this.runs[index] = updatedRun;
  }
  
  deleteRun(id: number) {
    const index = this.runs.findIndex((run) => run.id == id);
    if (index == -1) {
      throw new NotFoundException('Run not found');
    }
    this.runs.splice(index, 1);
    return id;
  }
}
