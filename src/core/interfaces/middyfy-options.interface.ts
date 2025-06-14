import { ClassConstructor } from 'class-transformer/types/interfaces';

export interface MiddyfyOptions {
  bodySchema?: ClassConstructor<unknown>;
}