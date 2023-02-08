import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/features/auth/services/jwt-auth.guard';
import { ApiTextEnum } from 'src/core/helpers/api-text.enum';
import { EndpointEnum } from 'src/core/helpers/endpoint.enum';
import { UserService } from 'src/features/users/services/user.service';
import { DeleteResult } from 'typeorm';
import { CreateContactDto } from '../dto/create-contact.dto';
import { UpdateContactDto } from '../dto/update-contact.dto';
import { Contact } from '../entities/contacts.entity';
import { ContactsService } from '../services/contacts.service';

@ApiTags(ApiTextEnum.CONTACTS)
@Controller(EndpointEnum.CONTACTS)
export class ContactsController {
  constructor(
    private contactsService: ContactsService,
    private userService: UserService,
  ) {}

  @ApiOperation({ summary: ApiTextEnum.CREATE_CONTACT })
  @ApiResponse({ status: 201, type: Contact })
  @UseGuards(JwtAuthGuard)
  @Post()
  createContact(@Body() createContactDto: CreateContactDto, @Request() req) {
    return this.contactsService.createContact(createContactDto, req.user.id);
  }

  @ApiOperation({ summary: ApiTextEnum.GET_CONTACTS_USER })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Get()
  getContacts(@Request() req) {
    return this.userService.getContactsByUser(req.user.id);
  }

  @ApiOperation({ summary: ApiTextEnum.REMOVE_MARK_ID })
  @ApiResponse({ status: 200, type: DeleteResult })
  @UseGuards(JwtAuthGuard)
  @Delete(EndpointEnum.ID)
  removeContact(@Param(EndpointEnum.PARAM_ID) id: number) {
    return this.contactsService.removeMarkContact(id);
  }

  @ApiOperation({ summary: ApiTextEnum.REMOVE_M_CONTACTS })
  @ApiResponse({ status: 200, type: DeleteResult })
  @UseGuards(JwtAuthGuard)
  @Delete()
  removeAllContacts(@Request() req) {
    return this.contactsService.removeAllMarkContacts(req.user.id);
  }

  @ApiOperation({ summary: ApiTextEnum.TOGGLE_MARK_REMOVE })
  @ApiResponse({ status: 200, type: Contact })
  @UseGuards(JwtAuthGuard)
  @Patch(EndpointEnum.MARK_ID)
  toggleMark(@Param(EndpointEnum.PARAM_ID) id: number) {
    return this.contactsService.toggleMarkForRemove(id);
  }

  @ApiOperation({ summary: ApiTextEnum.EDIT_CONTACT })
  @ApiResponse({ status: 200, type: Contact })
  @UseGuards(JwtAuthGuard)
  @Patch(EndpointEnum.EDIT)
  editContact(@Request() req, @Body() updateContactDto: UpdateContactDto) {
    return this.contactsService.editContact(req.user.id, updateContactDto);
  }
}
