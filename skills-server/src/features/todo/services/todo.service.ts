import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExceptionEnum } from 'src/core/helpers/exception.enum';
import { UserService } from 'src/features/users/services/user.service';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { Todo } from '../entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    private readonly userService: UserService,
  ) {}

  async createTask(createTodoDto: CreateTodoDto, userId: number) {
    const todo = await this.todoRepository.save(createTodoDto);
    const receivedUser = await this.userService.getOneUser(userId);
    todo.user = receivedUser;
    const result = await this.todoRepository.save(todo);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { user, ...answer } = result;
    return answer;
  }

  async getOneTask(id: number, userId: number): Promise<Todo> {
    const result = await this.userService.getOneTaskByUser(userId, id);
    if (!result) {
      throw new HttpException(ExceptionEnum.TODO_N_F, HttpStatus.NOT_FOUND);
    }
    return result.tasks[0];
  }

  async getAllTasks(userId: number): Promise<Todo[]> {
    const result = await this.userService.getTasksByUser(userId);
    return result?.tasks;
  }

  async updateTask(
    updateTodoDto: UpdateTodoDto,
    id: number,
    userId: number,
  ): Promise<UpdateResult> {
    const user = await this.userService.getOneUser(userId);
    return await this.todoRepository.update({ id, user }, updateTodoDto);
  }

  async removeTask(id: number, userId: number): Promise<DeleteResult> {
    const user = await this.userService.getOneUser(userId);
    return await this.todoRepository.delete({ id, user });
  }
}
