import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class ResponseEntity<T> {
  @Exclude() private readonly _statusCode: HttpStatus;
  @Exclude() private readonly _message: string;
  @Exclude() private readonly _data: T;

  private constructor(statusCode: HttpStatus, message: string, data: T) {
    this._statusCode = statusCode;
    this._message = message;
    this._data = data;
  }

  static OK(message: string): ResponseEntity<string> {
    return new ResponseEntity(HttpStatus.OK, message, '');
  }

  static OK_WITH<T>(message: string, data: T): ResponseEntity<T> {
    return new ResponseEntity(HttpStatus.OK, message, data);
  }

  static CREATED(message: string): ResponseEntity<string> {
    return new ResponseEntity(HttpStatus.CREATED, message, '');
  }

  static CREATED_WITH<T>(message: string, data: T): ResponseEntity<T> {
    return new ResponseEntity(HttpStatus.CREATED, message, data);
  }

  @ApiProperty()
  @Expose()
  get statusCode(): HttpStatus {
    return this._statusCode;
  }

  @ApiProperty()
  @Expose()
  get message(): string {
    return this._message;
  }

  @ApiProperty()
  @Expose()
  get data(): T {
    return this._data;
  }
}
