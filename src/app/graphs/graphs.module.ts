import { NgModule } from "@angular/core";

import { BarGraphComponent } from './bar/barGraph.component';
import { PctGraphComponent } from './pct/pctGraph.component';

@NgModule({
  declarations: [
    BarGraphComponent,
    PctGraphComponent
  ],
  exports: [
    BarGraphComponent,
    PctGraphComponent
  ]
})
export class GraphsModule {};
