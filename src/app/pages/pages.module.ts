import { NgModule } from "@angular/core";
import { ThemeModule } from "../@theme/theme.module";
import { PagesRoutingModule } from "./pages-routing.module";
import { PagesComponent } from "./pages.component";
import { CrudComponent } from "../pages/crud/crud.component";
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";

@NgModule({
	imports: [
        PagesRoutingModule,
        ThemeModule,
		CommonModule,
		ReactiveFormsModule
	],
	declarations: [
		PagesComponent,
		CrudComponent
	],
	providers: []
})
export class PagesModule { }
