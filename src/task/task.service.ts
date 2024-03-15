import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Task } from './models/task';
import { TaskDTO } from './dto/task.dto';

@Injectable()
export class TaskService {
  allTasks: Task[] = [];

  getAllTasks() {
    return this.allTasks;
  }

  filterTasks(startYear: number, endYear: number) {
    return this.getAllTasks().filter(
      (task) => task.year >= startYear && task.year <= endYear,
    );
  }

  findTask(id: string) {
    const task = this.allTasks.find((task) => task.id == id);

    if (!task) throw new NotFoundException('Task non trouvée');

    return task;
  }

  findTaskIndex(id: string) {
    return this.allTasks.findIndex((task) => task.id == id);
  }

  createTask(title: string, year: number, status: string) {
    const id = uuidv4();
    const task = new Task(id, title, year, new Date(), status);

    this.allTasks.push(task);
    return task;
  }

  updateTask(id: string, body: TaskDTO) {
    const taskIndex = this.findTaskIndex(id);
    const createdAt = this.findTask(id).createdAt;

    if (taskIndex < 0) throw new NotFoundException('Task non trouvée');

    this.allTasks[taskIndex] = { id, ...body, createdAt };
    return this.allTasks[taskIndex];
  }

  deleteTask(id: string) {
    const taskIndex = this.findTaskIndex(id);

    if (taskIndex < 0) throw new NotFoundException('Task non trouvée');

    return this.allTasks.splice(taskIndex);
  }
}
