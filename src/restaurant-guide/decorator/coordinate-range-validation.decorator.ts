import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsLatLongInRangeConstraint
  implements ValidatorConstraintInterface
{
  validate(value: number, args: ValidationArguments) {
    if (typeof value !== 'number' || isNaN(value)) {
      return false;
    }

    const [minLatLon, maxLatLon] = args.constraints;

    if (value < minLatLon || value > maxLatLon) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    const [minLatLon, maxLatLon] = args.constraints;
    const propertyName = args.property;

    if (typeof args.value !== 'number' || isNaN(args.value)) {
      return `${propertyName}은(는) 숫자여야 합니다.`;
    }

    return `${propertyName}은(는) ${minLatLon}에서 ${maxLatLon} 사이여야 합니다.`;
  }
}

export function IsLatLongInRange(
  range: [number, number],
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsLatLonInRange',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: range,
      validator: IsLatLongInRangeConstraint,
    });
  };
}
