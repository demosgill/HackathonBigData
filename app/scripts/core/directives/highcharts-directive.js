/*global Highcharts:false*/
'use strict';

var highcharts = angular.module('highcharts-directive', []);


function toColorsArray(colorsRgb) {
  if (!colorsRgb) {
    return undefined;
  }
  var colors = [];
  for (var i = 0; i < colorsRgb.length; i++) {
    colors[i] = 'rgba('+ colorsRgb[i].rgb + ',1.0)';
  }
  return colors;
}

function formatPercentage(v) {
  return (Math.round(v * 100) / 100) + '%';
}
highcharts.directive('drawPieChart', ['$filter', function ($filter) {
    // return the directive link function. (compile function not needed)
    return {
      restrict: 'E',
      template: '<div></div>',
      scope: {
        chartContainer: '=chartContainer'
      },
      link: function (scope, element, attrs) {

        var container = element.find('div')[0];

        // watch the expression, and update the UI on change.
        scope.$watch('chartContainer', function () {
          drawPlot();
        }, true);

        var drawPlot = function () {
          var chart;
          chart = new Highcharts.Chart({
            exporting: {
              enabled: false
            },
            chart: {
              renderTo: container,
              width: attrs.width || 100,
              height: attrs.height || 100
            },
            credits: {
              enabled: false
            },
            title: {
              text: ''
            },
            tooltip: {
              formatter: function() {
                return '<b>' + this.point.name + ':</b><br><span style="color:gray;">' + formatPercentage(this.point.percentage) + '</span> (' + $filter('currency')(this.point.y, '') + ' )';
              }
            },
            legend: {
              enabled: false,
              itemStyle: {
                color: '#333333',
                cursor: 'pointer',
                fontSize: '12px',
                fontFamily: 'Arial',
                fontWeight: 200
              }
            },
            plotOptions: {
              pie: {
                animation: true,
                colors: toColorsArray(scope.chartContainer.chart.colors),
                showInLegend: true,
                dataLabels: {
                  enabled: true,
                  crop: false,
                  overflow: 'justify',
                  distance: 25,
                  softConnector: true,
                  /*backgroundColor: 'rgba(255,255,255,0.4)',
                  borderRadius: 3,*/
                  formatter: function() {
                    return '<b>' + this.point.name + '<br>' + formatPercentage(this.point.percentage);
                  }
                }
              }
            },
            series: [
              {
                size: '80%',
                innerSize: '45%',
                type: 'pie',
                name: 'Total',
                data: scope.chartContainer && scope.chartContainer.chart && scope.chartContainer.chart.data
              }
            ]
          });
        };
      }
    };
  }]);


highcharts.directive('drawLineChart', ['$filter', function ($filter) {
  // return the directive link function. (compile function not needed)
  return {
    restrict: 'E',
    template: '<div></div>',
    scope: {
      chartContainer: '=chartContainer'
    },
    link: function (scope, element, attrs) {

      var container = element.find('div')[0];
      var chart;

      // watch the expression, and update the UI on change.
      scope.$watch('chartContainer', function () {
        chart = drawPlot();
      }, true);

      var drawPlot = function () {
        return new Highcharts.Chart({
          exporting: {
            enabled: false
          },
          chart: {
            renderTo: container,
            width: attrs.width || 100,
            height: attrs.height || 100
          },
          credits: {
            enabled: false
          },
          title: {
            text: ''
          },
          tooltip: {
            formatter: function() {
              return '<b>' + this.point.name + '</b><br/>' + $filter('currency')(this.point.y, this.series.name);
            }
          },
          legend: {
            enabled: true,
            margin: 5,
            itemStyle: {
              color: '#333333',
              cursor: 'pointer',
              fontSize: '12px',
              fontFamily: 'Arial',
              fontWeight: 200
            }
          },
          plotOptions: {
            spline: {
              animation: true,
              dataLabels: {
                enabled: false,
                crop: false,
                overflow: 'justify',
                formatter: function() {
                  return $filter('currency')(this.point.y, this.series.name);
                }
              }
            }
          },
          series: scope.chartContainer && scope.chartContainer.chart && scope.chartContainer.chart.data,
          yAxis: {
            min: 0,
            title: ' ',
            tickPixelInterval: 30,
            gridLineColor: '#dfdfdf'
          },
          xAxis: {
            labels: {
              formatter: function() {
                return scope.chartContainer.chart.labels[this.value];
              }
            }
          }
        });
      };
    }
  };
}]);
