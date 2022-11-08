import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Employee} from "../../../models/Employee";
import {selectAllEmployees} from "../../../store/employee/employee.selector";
import {AppState} from "../../../store/app.state";
import {loadEmployees} from "../../../store/employee/employee.action";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit, OnDestroy {
  private allEmployees$ = this.store.select(selectAllEmployees);
  private $unSubscribe = new Subject<void>();
  employees!: Employee[];
  dataSourceFilters: any;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'contactNumber', 'age', 'dob', 'salary', 'address', 'action'];

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.select(selectAllEmployees);
    this.store.dispatch(loadEmployees());
    this.allEmployees$.pipe(takeUntil(this.$unSubscribe)).subscribe(data => {
      this.employees = data;
      this.dataSource = new MatTableDataSource(this.employees);
      this.dataSourceFilters = new MatTableDataSource(this.employees);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    this.$unSubscribe.next();
    this.$unSubscribe.complete();
  }

}
