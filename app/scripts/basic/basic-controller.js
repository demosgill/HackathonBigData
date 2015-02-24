/*global Highcharts:false*/
/*global $:false*/
'use strict';

angular.module('basic')
  .controller('BasicCtrl',
  function ($scope) {
    $scope.myData = [10, 20, 50, 30, 15, 77];

    $(function () {

      Highcharts.data({
        csv: document.getElementById('mccs').innerHTML,
        itemDelimiter: '\t',
        parsed: function (columns) {

          var mccs = {},
            brandsData = [],
            drilldownData = {},
            drilldownSeries = [],
            partnerNames = [];

          // Parse percentage strings
          $.each(columns[1], function (i, mcc) {
            if (i > 0) {

              // Create the main data
              var val = parseFloat(columns[2][i]);
              if (!mccs[mcc]) {
                mccs[mcc] = val;
              } else {
                mccs[mcc] += val;
              }

              var partnerName = columns[0][i];
              if (!partnerNames[mcc]) {
                partnerNames[mcc] = [];
              }

              if (!partnerNames[mcc][partnerName]) {
                partnerNames[mcc][partnerName] = val;
              } else {
                partnerNames[mcc][partnerName] += val;
              }

              if (!drilldownData[mcc]) {
                drilldownData[mcc] = [];
              }
              var brandUnblendingSum = partnerNames[mcc][partnerName];
              drilldownData[mcc][partnerName] = brandUnblendingSum;
            }

          });

          $.each(mccs, function (name, y) {
            brandsData.push({
              name: name,
              y: y,
              drilldown: drilldownData[name] ? name : null
            });
          });
          $.each(drilldownData, function (key, value) {
            var data = [];
            for (var unblending in value) {
              if (value.hasOwnProperty(unblending)) {
                var sum = value[unblending];
                data.push([unblending, sum]);
              }
            }
            drilldownSeries.push({
              name: key,
              id: key,
              data: data
            });
          });

          // Create the chart
          $('#mccpie').highcharts({
            exporting: {
              enabled: false
            },
            chart: {
              type: 'pie'
            },
            title: {
              text: 'Highcharts Grafik'
            },
            subtitle: {
              text: 'Klicken für Drilldown'
            },
            plotOptions: {
              series: {
                dataLabels: {
                  enabled: true,
                  format: '{point.name}: {point.y:.2f} Fr.<br/>({point.percentage:.2f}%)'
                }
              }
            },

            tooltip: {
              enabled: false,
              headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
              pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> ({point.percentage:.2f}% of total)<br/>'
            },

            series: [{
              name: 'Brands',
              colorByPoint: true,
              data: brandsData
            }],
            drilldown: {
              series: drilldownSeries
            }
          });
        }
      });
    });

  });
