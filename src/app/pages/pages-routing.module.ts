import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CrudComponent } from "./crud/crud.component";
import { PagesComponent } from "./pages.component";

const routes: Routes = [
	{
		path: '',
		component: PagesComponent,
        children: [
			{
				path: 'crud',
				component: CrudComponent,
			},
        ],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PagesRoutingModule { }
