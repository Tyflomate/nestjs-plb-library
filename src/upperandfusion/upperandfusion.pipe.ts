import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UpperandfusionPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type == 'body') {
      return value.data.map((element) => element.toUpperCase()).join('-');
    }
    return value;
  }
}
