import { Dates } from "../../helpers/Dates";
import { PrismaTaskQueryRepository } from "../../prisma/repositories/tasks/Prisma-query-repository";
import { GetTasksResponse } from "./Get-all";

interface GetTaskRequest {
  month: number;
  year: number;
}

export class QueryByMonth {
  constructor(private findRecipientRepository: PrismaTaskQueryRepository) {}

  public async execute(date: GetTaskRequest): Promise<GetTasksResponse> {
    const days: number[] = new Dates().getDays;
    return {
      tasks: await this.findRecipientRepository.findByMonth(
        date.month,
        days,
        date.year
      ),
    };
  }
}
