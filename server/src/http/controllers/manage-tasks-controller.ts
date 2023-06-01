import { Task } from "@src/entities/task";
import { PrismaManageRepository } from "@src/prisma/repositories/tasks/Prisma-manage-repository";
import { TaskStatus } from "@src/use-cases/manage-cases/chance-condition";
import { CreateTask } from "@src/use-cases/manage-cases/create";
import { FullUpdate } from "@src/use-cases/manage-cases/update";
import { TaskBody } from "../dtos/create-task-body";
import { TaskViewModel } from "../view-models/task-view-model";
import { Controller, Patch, Post, Put } from '@overnightjs/core';

@Controller('tasks')
export class ManageTasks {

  @Post('create')
  async create(
    req: { body: TaskBody },
    res: { json: (arg0: TaskViewModel) => Promise<Task> }
  ) {
    const { title, content, date, done } = req.body;
    const createTask = new CreateTask(new PrismaManageRepository());
    const { task } = await createTask.execute({
      title,
      content,
      date,
      done,
    });

    return { task: res.json(TaskViewModel.toHTTP(task)) };
  }

  @Patch('change/:id')
  async updateCondition(
    req: { params: { id: string } },
    res: { json: (arg0: TaskViewModel) => Promise<Task> }
  ) {
    const id: string = req.params.id;
    const taskStatus = new TaskStatus(new PrismaManageRepository());
    const { task } = await taskStatus.execute(id);

    return { task: res.json(TaskViewModel.toHTTP(task)) };
  }

  @Put('fullChange/:id')
  async updateTasks(
    req: {
      params: { id: string };
      body: TaskBody;
    },
    res: { json: (arg0: TaskViewModel) => Promise<Task> }
  ) {
    const id: string = req.params.id;
    const { title, content, date, done } = req.body;
    const fullUpdate = new FullUpdate(new PrismaManageRepository());
    const { task } = await fullUpdate.execute(id, {
      title,
      content,
      date,
      done,
    });

    return { task: res.json(TaskViewModel.toHTTP(task)) };
  }
}