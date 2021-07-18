import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DEFAULT_PAGE_SIZE} from '../page';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html'
})

export class PaginationComponent {
  @Input()
  total!: number;

  @Input()
  pageIndex!: number;

  @Input()
  pageSize = DEFAULT_PAGE_SIZE;

  pageSizeOptions = [10, 20, 30, 40];

  @Output()
  pageChange: EventEmitter<any> = new EventEmitter();

  indexChange(index: number) {
    this.pageChange.emit({pageIndex: index, pageSize: this.pageSize});
  }

  sizeChange(size: number) {
    this.pageChange.emit({pageIndex: 1, pageSize: size});
  }
}
