import {Component, OnInit} from '@angular/core';
import * as echarts from 'echarts';

type EChartsOption = echarts.EChartsOption;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  chartDom: any;
  myChart: any;
  option!: EChartsOption;

  hours = [
    '12a', '1a', '2a', '3a', '4a', '5a', '6a',
    '7a', '8a', '9a','10a','11a',
    '12p', '1p', '2p', '3p', '4p', '5p',
    '6p', '7p', '8p', '9p', '10p', '11p'
  ];

  days = [
    'Saturday', 'Friday', 'Thursday',
    'Wednesday', 'Tuesday', 'Monday', 'Sunday'
  ];

  data = [[0,0,2],[0,1,2],[0,2,3]]
    .map(function (item) {
      return [item[1], item[0], item[2] || '-'];
    });

  ngOnInit(): void {
    this.setOptions();
    this.chartDom = document.getElementById('canvas-container');
    this.myChart = echarts.init(this.chartDom);
    this.option && this.myChart.setOption(this.option);
    window.addEventListener('resize', this.myChart.resize);
  }

  setOptions(): void {
    this.option = {
      tooltip: {
        position: 'top'
      },
      grid: {
        height: '50%',
        top: '10%'
      },
      xAxis: {
        type: 'category',
        data: this.hours,
        splitArea: {
          show: true
        }
      },
      yAxis: {
        type: 'category',
        data: this.days,
        splitArea: {
          show: true
        }
      },
      visualMap: {
        min: 0,
        max: 6,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '15%'
      },
      series: [
        {
          name: 'Punch Card',
          type: 'heatmap',
          data: this.data,
          label: {
            show: true
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }
}
