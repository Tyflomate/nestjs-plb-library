import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  // NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
  // UseInterceptors,
} from '@nestjs/common';
// import { Task } from './models/task';
import { Response } from 'express';
import { TaskDTO } from './dto/task.dto';
import { UpperandfusionPipe } from 'src/upperandfusion/upperandfusion.pipe';
import { TaskService } from './task.service';
import { ApiTags } from '@nestjs/swagger';
// import { DurationInterceptor } from 'src/duration/duration.interceptor';

// @UseInterceptors(DurationInterceptor)
@Controller('task')
@ApiTags('tasks')
export class TaskController {
  @Inject() service: TaskService;

  // @UseInterceptors(DurationInterceptor)
  @Get()
  getAllTasks(@Res() response: Response) {
    return response.json({ tab: this.service.getAllTasks() });
  }

  @Get('filter')
  filterTasks(
    @Query(
      'startYear',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    startYear,
    @Query(
      'endYear',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    endYear,
    @Res() response: Response,
  ) {
    return response.json({
      tab: this.service.filterTasks(startYear, endYear),
    });
  }

  @Get(':id')
  getTaskById(@Res() response: Response, @Param('id') id) {
    return response.json(this.service.findTask(id));
  }

  @Post()
  addTask(@Body() body: TaskDTO, @Res() response: Response) {
    const task = this.service.createTask(body.title, body.year, body.status);

    return response.json({ message: 'Task Added', id: task.id });
  }

  @Put(':id')
  updateTask(@Body() body, @Res() response: Response, @Param('id') id) {
    return response.json({
      message: 'Task updated',
      task: this.service.updateTask(id, body),
    });
  }

  @Delete(':id')
  deleteTask(@Res() response: Response, @Param('id') id) {
    this.service.deleteTask(id);

    return response.json({ message: 'Task deleted' });
  }

  @Post('testpipe')
  testerPipe(@Body(UpperandfusionPipe) body, @Res() response: Response) {
    return response.json(body);
  }
}
