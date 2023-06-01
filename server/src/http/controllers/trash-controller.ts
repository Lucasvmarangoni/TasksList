import { Controller, Delete, Get } from "@overnightjs/core";
import { Trash } from "@src/entities/trash";
import { PrismaDeleteTrashRepository } from "@src/prisma/repositories/trash/Prisma-delete-trash-repository";
import { PrismaTrashRepository } from "@src/prisma/repositories/trash/Prisma-trash-repository";
import { DeleteAllTrash } from "@src/use-cases/delete-cases/delete-all-trash";
import { DeleteTrash } from "@src/use-cases/delete-cases/delete-trash";
import { AllTrash } from "@src/use-cases/trash-cases/get-all-trash";
import { TrashViewModel } from "../view-models/trash-view-model";
import { Request } from "express";

@Controller("trash")
export class TrashTasks {

  @Get("all")
  async findAllTrashTasks(
    _: Request,
    res: {
      json: (arg0: TrashViewModel) => Promise<Trash[]>;
    }
  ) {
    const allTrash = new AllTrash(new PrismaTrashRepository());
    const { trash } = await allTrash.execute();
    return { get: res.json(trash.map(TrashViewModel.toHTTP)) };
  }

  @Delete(":id/delete")
  async deletedTrashTask(
    req: { params: { id: string } },
    res: { json: (arg0: void) => Promise<Trash> }
  ) {
    const id: string = req.params.id;
    const deleted = new DeleteTrash(new PrismaDeleteTrashRepository());
    const { deleteTrash } = await deleted.execute(id);

    return { delete: res.json(deleteTrash) };
  }

  @Delete("delete/all")
  async deletedAllTrashTasks(
    _: Request,
    res: { json: (arg0: void) => Promise<Trash> }
  ) {
    const deleteAllTrash = new DeleteAllTrash(
      new PrismaDeleteTrashRepository()
    );
    const { deleteTrash } = await deleteAllTrash.execute();

    return { delete: res.json(deleteTrash) };
  }
}