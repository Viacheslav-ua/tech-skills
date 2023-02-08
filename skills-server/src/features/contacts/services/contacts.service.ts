import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExceptionEnum } from 'src/core/helpers/exception.enum';
import { UserService } from 'src/features/users/services/user.service';

import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateContactDto } from '../dto/create-contact.dto';
import { UpdateContactDto } from '../dto/update-contact.dto';
import { Contact } from '../entities/contacts.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
    private readonly userService: UserService,
  ) {}

  async createContact(
    createContactDto: CreateContactDto,
    userId: number,
  ): Promise<Contact> {
    const contact = await this.contactRepository.save(createContactDto);
    const user = await this.userService.getOneUser(userId);
    contact.user = user;
    return await this.contactRepository.save(contact);
  }

  async getOneContact(id: number) {
    const contact = await this.contactRepository.findOne({ where: { id } });
    if (contact) {
      return contact;
    }
    throw new HttpException(ExceptionEnum.CONTACT_N_F, HttpStatus.NOT_FOUND);
  }

  async removeMarkContact(id: number): Promise<DeleteResult> {
    const contact = await this.getOneContact(id);
    if (contact.markForRemove === true) {
      return await this.contactRepository.delete({ id });
    }
    throw new HttpException(
      ExceptionEnum.CONTACT_N_MARKED,
      HttpStatus.NOT_IMPLEMENTED,
    );
  }

  async removeAllMarkContacts(userId: number): Promise<DeleteResult> {
    const user = await this.userService.getOneUser(userId);
    return await this.contactRepository.delete({ user, markForRemove: true });
  }

  async toggleMarkForRemove(id: number): Promise<Contact> {
    const contact = await this.getOneContact(id);
    contact.markForRemove = !contact.markForRemove;
    return this.contactRepository.save(contact);
  }

  async editContact(
    userId: number,
    updateContactDto: UpdateContactDto,
  ): Promise<UpdateResult> {
    const user = await this.userService.getOneUser(userId);
    return await this.contactRepository.update(
      { id: updateContactDto.id, user },
      updateContactDto,
    );
  }
}
