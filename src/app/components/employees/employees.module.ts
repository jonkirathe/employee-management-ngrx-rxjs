import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EffectsModule} from "@ngrx/effects";
import {StoreModule} from "@ngrx/store";
import {EmployeesComponent} from "./employees/employees.component";
import {AddEmployeeComponent} from "./add-employee/add-employee.component";
import {EditEmployeeComponent} from "./edit-employee/edit-employee.component";
import {EmployeeEffects} from "../../store/employee/employee.effects";
import {EMPLOYEE_STATE_NAME} from "../../store/employee/employee.selector";
import {employeeReducer} from "../../store/employee/employee.reducer";
import {MatButtonModule} from "@angular/material/button";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {MatBadgeModule} from "@angular/material/badge";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatChipsModule} from "@angular/material/chips";
import {MatStepperModule} from "@angular/material/stepper";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDividerModule} from "@angular/material/divider";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatNativeDateModule, MatRippleModule} from "@angular/material/core";
import {MatListModule} from "@angular/material/list";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatSliderModule} from "@angular/material/slider";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTabsModule} from "@angular/material/tabs";
import {MatTreeModule} from "@angular/material/tree";
import {NavbarComponent} from "../shared/navbar/navbar.component";


const routes: Routes = [
  {
    path: 'list',
    component: EmployeesComponent,
  },
  {
    path: 'add',
    component: AddEmployeeComponent,
  },
  {
    path: 'edit',
    component: EditEmployeeComponent,
  },
];

@NgModule({
  declarations: [
    EmployeesComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    NavbarComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    CommonModule, RouterModule.forChild(routes),
    EffectsModule.forFeature([EmployeeEffects]),
    StoreModule.forFeature(EMPLOYEE_STATE_NAME, employeeReducer),
  ],
  providers: []
})
export class EmployeesModule { }
