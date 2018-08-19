import { NgModule } from "@angular/core";

import { BarGraphComponent } from './bar/barGraph.component';

@NgModule({
  declarations: [
    BarGraphComponent
  ],
  exports: [
    BarGraphComponent
  ]
})
export class GraphsModule {};
