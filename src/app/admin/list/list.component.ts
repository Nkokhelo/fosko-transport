import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  Input,
  ChangeDetectorRef,
  AfterContentChecked,
  AfterViewChecked,
  OnChanges
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ListDataSource } from './list-datasource';
import { Listing } from 'src/app/intefaces/listing';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent
  implements AfterViewInit, AfterViewChecked, OnInit, OnChanges {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<Listing>;
  @Input() displayColumnsInput: string[];
  @Input() dataInput: Listing[];
  displayedColumns: string[];

  dataSource: ListDataSource;

  constructor(private changeDetector: ChangeDetectorRef) {
    // this.dataSource = new ListDataSource(this.dataInput);
  } /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */

  ngOnInit() {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }
  ngOnChanges(): void {
    this.dataSource = new ListDataSource(this.dataInput);
    this.displayedColumns = this.displayColumnsInput;
    // this.dataSource = new ListDataSource(this.dataInput);
    this.changeDetector.detectChanges();
  }
}
