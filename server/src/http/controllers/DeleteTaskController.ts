import { Trash } from "../../entities/Trash";
import { DeleteAllTasks } from "../../use-cases/delete-cases/Delete-all-tasks";
import { DeleteTask } from "../../use-cases/delete-cases/Delete-task";
import { CreateAllTrash } from "../../use-cases/trash-cases/Create-all-trash";
import { CreateTrash } from "../../use-cases/trash-cases/Create-trash";
import { TrashViewModel } from "../view-models/Trash-view-model";

export class DeleteTasks {
  async deleteTask(
    req: { params: { id: string } },
    res: { json: (arg0: TrashViewModel | void) => Promise<Trash> }
  ) {
    const id: string = req.params.id;

    const { createTrash } = await CreateTrash.execute(id);
    const { deleteTrash } = await DeleteTask.execute(id);

    return {
      create: res.json(TrashViewModel.toHTTP(createTrash)),
      delete: res.json(deleteTrash),
    };
  }

  async deletedAllTasks(
    req: Request,
    res: {
      json: (arg0: Trash | void) => Promise<Trash[]>;
    }
  ) {
    const { createTrash } = await CreateAllTrash.execute();
    const { deleteTrash } = await DeleteAllTasks.execute();

    return {
      create: res.json(createTrash),
      delete: res.json(deleteTrash),
    };
  }
}
