import { Component, OnChanges, OnInit, SimpleChanges, Input, ElementRef, OnDestroy } from "@angular/core";
import { BarGraphModel } from './barGrap.model';
import * as d3 from "d3";
import $ from 'jquery';

@Component({
  selector: 'app-bar-graph',
  template: '<svg></svg>'
})
export class BarGraphComponent implements OnInit, OnChanges, OnDestroy {
  @Input() data: [BarGraphModel];
  @Input() id: string;
  width: number;
  barWidth: number;
  max: number;
  padding: number = 30;
  height: number = 200;
  ySizing: any; 
  svgGroup: any;
  resizeTimeout: any;

  constructor(private $element: ElementRef) {}

  ngOnInit() {
    $(window).resize(() => {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        this.initGraph(this.data);
      }, 200);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.data.currentValue) {
      if(changes.data.currentValue.length > 0) {
        this.initGraph(changes.data.currentValue);
      }
    }
  }

  initGraph(data: [BarGraphModel]) {
    this.getMax();
    this.prepareHtmlElement();
    this.setSizingFunction();
    this.generateChart();
    this.addAxis();
  }

  getMax() {
    this.max = this.data.reduce(
      (acc, d) => d.count > acc ? d.count : acc, 0);
  }

  setSizingFunction() {
    this.ySizing = d3.scaleLinear()
      .domain([0, this.max])
      .range([0, this.height]);
  }

  prepareHtmlElement() {
    this.width = $(this.$element.nativeElement).width();
    this.barWidth = ((this.width - this.padding * 2) / this.data.length);

    /*if(this.barWidth > 100) {
      this.barWidth = 100;
    }*/
    
    $(this.$element.nativeElement)
      .find('svg')
      .attr('id', `${this.id}-svg`)
      .attr('width', this.width)
      .attr('height', this.height + 20)
      .html('');
  }

  generateChart() {
    this.svgGroup = d3.select(`#${this.id}-svg`).append('g');

    this.svgGroup
      .attr('transform', `translate(${this.padding/2}, 0)`);

    this.svgGroup
      .selectAll('rect')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('class', 'bargraph-bar')
      .attr('y', d => this.height - d.count)
      .attr('height', d => 0)
      .attr('width', this.barWidth - this.padding)
      .attr('transform', (d, i) => {
        const left = (this.barWidth * i) + this.padding;
        const top = 0;
        return `translate(${left}, ${top})`
      })
      .transition()
      .attr('height', d => this.ySizing(d.count))
      .attr('y', d => this.height - this.ySizing(d.count))
      .duration(800);
    
      this.svgGroup
      .selectAll('text')
      .data(this.data)
      .enter()
      .append('text')
      .attr('alignment-baseline', 'middle')
      .attr('text-anchor', 'middle')
      .text(d => d.count)
      .attr('class', 'bar-text')
      .attr('x', (d, i) => ((this.barWidth * i) + this.padding/2) + this.barWidth/2)
      .attr('y', d => (this.height - 15))
      
  }

  addAxis() {
    const domain = this.data.map(d => d.label);
    const range = [0, this.barWidth * (this.data.length - 1)];
    const scale = d3.scalePoint().domain(domain).range(range);
    const axisLen = this.barWidth * this.data.length + this.padding;
    const left = this.padding + (this.barWidth - this.padding) / 2 ;
    const top = this.height;

    const xAxis = d3.axisBottom(scale);
    this.svgGroup
      .append('g')
      .attr('transform', `translate(${left}, ${top})`);
    
    this.svgGroup
      .append('g')
      .append('line')
      .attr('class', 'axis-line')
      .attr('x1', 0)
      .attr('x2', axisLen)
      .attr('y1', this.height)
      .attr('y2', this.height);

    this.svgGroup
      .append('g')
      .call(xAxis)
      .attr('transform', `translate(${left}, ${top})`);
  }

  ngOnDestroy() {
    $(window).unbind('resize');
  }
}
