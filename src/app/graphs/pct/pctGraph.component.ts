import { Component, OnChanges, OnInit, SimpleChanges, Input, ElementRef, OnDestroy } from "@angular/core";
import { PctGraphModel } from './pctGraph.model';
import * as d3 from "d3";
import $ from 'jquery';

@Component({
  selector: 'app-pct-graph',
  template: `<div style="position:relative">
              <div class="apg-tooltip">
                <div class="apg-tooltip-title"></div>
                <div class="apg-tooltip-content"></div>
              </div>
              <svg></svg>
            </div>`
})
export class PctGraphComponent implements OnInit, OnChanges, OnDestroy {
  @Input() data: [PctGraphModel];
  @Input() id: string;
  @Input() pct: boolean = true;
  @Input() colorRange: string[] = ['#2DB8D8', '#1EA0B8', '#1D778C', '#186172', '#10414C'];
  svgGroup: any;
  width: number;
  height: number = 400;
  pctValue: number = 100;
  maxValue: number;
  resizeTimeout: any;

  constructor(private $element: ElementRef) {}

  ngOnInit() {
    $(window).resize(() => {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        this.initGraph();
      }, 200);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.hasOwnProperty('data')) {
      if(changes.data.currentValue.length) {
        this.initGraph();
      }
    }

    if(changes.hasOwnProperty('pct')) {
      if(this.data.length) {
        this.initGraph();
      }
    }
  }

  initGraph() {
    this.getMax();
    this.prepareHtmlElement();
    this.generateGraph();
  }

  getMax() {
    const max = this.data.reduce(function(prev, current) {
      return (prev.percentage > current.percentage) ? prev : current
    });

    this.maxValue = max.percentage;
  }

  prepareHtmlElement() {
    this.width = $(this.$element.nativeElement).width();
    this.height = this.width < 400 ? this.width : 400;

    $(this.$element.nativeElement)
      .find('svg')
      .attr('id', `${this.id}-svg`)
      .attr('width', this.width)
      .attr('height', this.height)
      .html('');
  }

  arcTween(transition) {
    transition.attrTween('d', function (d) {
      var interpolate = d3.interpolate(d.endAngleStart, d.endAngle);
      return function (t) {
        d.arcFn.endAngle(interpolate(t));
        return d.arcFn(d);
      }
    });
  }

  generateGraph() {
    const config = {
      startRadius: 15,
      thickness: (((this.height) / 2) - 15) / this.data.length,
      colorRange: this.colorRange.slice(),
      animate: !false
    };

    var tau = 2 * Math.PI;

    const svgGroup = d3.select(`#${this.id}-svg`)
      .on('mouseleave', () => {
        $('.arc').removeClass('highlighted').removeClass('underlighted');
        $(this.$element.nativeElement)
          .find('.apg-tooltip')
          .css('display', 'none')
          .css('opacity', 0)
      })
      .append('g')
      .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`)
      

    const g = svgGroup.selectAll('arc')
      .data(this.data)
      .enter()
      .append('g')
      .attr('id', (d, index) => `arc-${this.id}-${index}`)
      .attr('class', 'arc')
      .on('mouseover', (d, index) => {
        this.arcMouseOver(d, index, config);
      })
  
    const arcPath = g.append('path')
      .attr('d', (d, i) => {
        const percentValue = this.pct ? this.pctValue : this.maxValue + 5;
        const endAngle = d.percentage / percentValue * tau;
        const arc = d3.arc();
        
        arc
        .innerRadius(config.startRadius + i * config.thickness)
        .outerRadius(config.startRadius + (i+1) * config.thickness)
        .startAngle(0)
        .endAngle(endAngle);
        
        d.arcFn = arc;
        
        if (config.animate) {
          arc.endAngle(0);
          d.endAngleStart = 0;
          d.endAngle = endAngle;
        }
        
        return arc();
      })
      .attr('class', 'pct-graph-arc')
      .style('fill', (d, index) => config.colorRange[index] || config.colorRange[0])
      .style('fill-opacity', d => 1)
      .style('stroke-width', 2)
      .style('stroke-opacity', 0.216)
      .style('stroke', 'white');

      const text = g.append('text')
      .attr('class', 'pct-text')
      .attr('x', 5)
      .attr('y', (d, i) => {
        return (-config.startRadius - i * config.thickness) - (config.thickness / 2) + 4;
      })
      .text(d => {
        const pct = `${Math.round(d.percentage)}%`;
        return this.pct ? pct : d.count; 
      });

      if (config.animate) {
        arcPath
        .transition()
        .duration(750)
        .call(this.arcTween)
        .style('fill', (d, index) => config.colorRange[index] || config.colorRange[0])
      }
  }

  arcMouseOver(d, index: number, config) {
    const h = $(this.$element.nativeElement).outerHeight();
    const tpH = $(this.$element.nativeElement).find('.apg-tooltip').height();

    $(this.$element.nativeElement)
      .find('.apg-tooltip')
      .css('display', 'block')
      .css('opacity', 1)
      .css('left', '50%')
      .css('top', () => {
        return ((h / 2) - (config.startRadius + (index * config.thickness)) - tpH - 2 - (config.thickness*2));
      })

    $(this.$element.nativeElement)
      .find('.apg-tooltip-title')
      .html(d.label)

    $(this.$element.nativeElement)
      .find('.apg-tooltip-content')
      .html(`${d.count} items - ${d.percentage}%`);

    $('.arc')
      .removeClass('highlighted')
      .addClass('underlighted');

    $(`#arc-${this.id}-${index}`)
      .removeClass('underlighted')
      .addClass('highlighted');
  }

  ngOnDestroy() {
    $(window).unbind('resize');
  }
}