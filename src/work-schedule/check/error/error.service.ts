import { Injectable } from '@nestjs/common';
import { CreateErrorDto } from './dto/create-error.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Error } from './entities/error.entity';

@Injectable()
export class ErrorService {
  constructor(
    @InjectRepository(Error)
    private readonly errorRepository: Repository<Error>,
  ) {}

  create(createErrorDto: CreateErrorDto[]) {
    return this.errorRepository.save(createErrorDto);
  }
}
