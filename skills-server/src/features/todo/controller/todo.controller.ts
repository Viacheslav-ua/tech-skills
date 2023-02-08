import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Delete,
  Param,
  Get,
  Patch,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiTextEnum } from 'src/core/helpers/api-text.enum';
import { EndpointEnum } from 'src/core/helpers/endpoint.enum';
import { JwtAuthGuard } from 'src/features/auth/services/jwt-auth.guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { Todo } from '../entities/todo.entity';
import { TodoService } from '../services/todo.service';

@ApiTags(ApiTextEnum.TODO)
@Controller(EndpointEnum.TODO)
export class TodoController {
  constructor(private todoService: TodoService) {}

  @ApiOperation({ summary: ApiTextEnum.CREATE_TODO })
  @ApiResponse({ status: 201, type: Todo })
  @UseGuards(JwtAuthGuard)
  @Post()
  createTask(@Body() createTodoDto: CreateTodoDto, @Request() req) {
    return this.todoService.createTask(createTodoDto, req.user.id);
  }

  @ApiOperation({ summary: ApiTextEnum.REMOVE_TODO })
  @ApiResponse({ status: 200, type: DeleteResult })
  @UseGuards(JwtAuthGuard)
  @Delete(EndpointEnum.ID)
  removeTask(@Param(EndpointEnum.PARAM_ID) id: number, @Request() req) {
    return this.todoService.removeTask(id, req.user.id);
  }

  @ApiOperation({ summary: ApiTextEnum.GET_TODO })
  @ApiResponse({ status: 200, type: [Todo] })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(@Request() req) {
    return this.todoService.getAllTasks(req.user.id);
  }

  @ApiOperation({ summary: ApiTextEnum.GET_ONE_TODO })
  @ApiResponse({ status: 200, type: Todo })
  @UseGuards(JwtAuthGuard)
  @Get(EndpointEnum.ID)
  getOne(@Param(EndpointEnum.PARAM_ID) id: number, @Request() req) {
    return this.todoService.getOneTask(id, req.user.id);
  }

  @ApiOperation({ summary: ApiTextEnum.UPDATE_TODO })
  @ApiResponse({ status: 200, type: UpdateResult })
  @UseGuards(JwtAuthGuard)
  @Patch(EndpointEnum.ID)
  updateTask(
    @Body() updateTodoDto: UpdateTodoDto,
    @Param(EndpointEnum.PARAM_ID) id: number,
    @Request() req,
  ) {
    return this.todoService.updateTask(updateTodoDto, id, req.user.id);
  }
}
