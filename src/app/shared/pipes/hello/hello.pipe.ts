import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hello',
})
export class HelloPipe implements PipeTransform {
  transform(text: string, num: number): string {
    return `Hello IN  ${text} My Age IS ${num}`;
  }
}
