/*global Highcharts:false*/
/*global $:false*/
'use strict';

angular.module('basic')
  .controller('BasicCtrl',
  function ($scope, uiGmapGoogleMapApi) {


    uiGmapGoogleMapApi.then(function (/*maps*/) {
      $scope.map = {center: {latitude: 40.1451, longitude: -99.6680}, zoom: 4};
    });
    $scope.polylines = [
      {
        id: 1,
        path: [
          {
            latitude: 45,
            longitude: -74
          },
          {
            latitude: 30,
            longitude: -89
          },
          {
            latitude: 37,
            longitude: -122
          },
          {
            latitude: 60,
            longitude: -95
          }
        ],
        stroke: {
          color: '#6060FB',
          weight: 3
        },
        editable: true,
        draggable: true,
        geodesic: true,
        visible: true,
        icons: [{
          offset: '25px',
          repeat: '50px'
        }]
      }];

    $scope.myData = [10, 20, 50, 30, 15, 77];

    $(function () {
      Highcharts.data({
        csv: document.getElementById('kicountryall').innerHTML,
        itemDelimiter: '\t',
        parsed: function (columns) {

          // Read the columns into the data array
          var data = [];
          $.each(columns[0], function (i, code) {
            if (i > 0) {
              data.push({
                code: code.toUpperCase(),
                value: parseFloat(columns[3][i]),
                name: code.toUpperCase()
              });
            }
          });


          // Initiate the chart
          $('#mapcontainer').highcharts('Map', {
            chart: {
              borderWidth: 1
            },
            exporting: {
              enabled: false
            },
            colors: ['rgba(19,64,117,0.05)', 'rgba(19,64,117,0.2)', 'rgba(19,64,117,0.4)',
              'rgba(19,64,117,0.5)', 'rgba(19,64,117,0.6)', 'rgba(19,64,117,0.8)', 'rgba(19,64,117,1)'],

            title: {
              text: 'Revenue by country'
            },

            mapNavigation: {
              enabled: true
            },

            legend: {
              title: {
                text: 'CHF',
                style: {
                  color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                }
              },
              align: 'left',
              verticalAlign: 'bottom',
              floating: true,
              layout: 'vertical',
              valueDecimals: 0,
              backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'rgba(255, 255, 255, 0.85)',
              symbolRadius: 0,
              symbolHeight: 14
            },

            colorAxis: {
              dataClasses: [{
                to: 50
              }, {
                from: 50,
                to: 1000
              }, {
                from: 1000,
                to: 5000
              }, {
                from: 5000,
                to: 10000
              }, {
                from: 10000,
                to: 30000
              }, {
                from: 30000,
                to: 100000
              }, {
                from: 100000
              }]
            },

            series: [{
              data: data,
              mapData: Highcharts.maps['custom/world'],
              joinBy: ['iso-a2', 'code'],
              animation: true,
              name: 'Umsatz',
              states: {
                hover: {
                  color: '#BADA55'
                }
              },
              tooltip: {
                valueSuffix: ' CHF'
              }
            }]
          });
        },
        error: function () {
          $('#container').html('<div class="loading">' +
          '<i class="icon-frown icon-large"></i> ' +
          'Error loading data from Google Spreadsheets' +
          '</div>');
        }
      });

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
                  format: '{point.name}: {point.y:.2f} <br/>({point.percentage:.2f}%)'
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

    $(function () {
      Highcharts.data({
        csv: document.getElementById('touristsluonly0').innerHTML,
        itemDelimiter: '\t',
        parsed: function (columns) {

          var tourists = {},
            countryData = [],
            mccDrilldownData = {},
            mccDrilldownSeries = [],
            mccs = [];

          // Parse percentage strings
          $.each(columns[1], function (i, country) {
            if (i > 0) {

              // Create the main data
              var avt = parseFloat(columns[2][i]);
              var numtrx = parseFloat(columns[3][i]);
              var sumamt = avt * numtrx;
              if (!tourists[country]) {
                tourists[country] = sumamt;
              } else {
                tourists[country] += sumamt;
              }

              var mcc = columns[0][i];
              if (!mccs[country]) {
                mccs[country] = [];
              }

              if (!mccs[country][mcc]) {
                mccs[country][mcc] = sumamt;
              } else {
                mccs[country][mcc] += sumamt;
              }

              if (!mccDrilldownData[country]) {
                mccDrilldownData[country] = [];
              }
              var brandUnblendingSum = mccs[country][mcc];
              mccDrilldownData[country][mcc] = brandUnblendingSum;
            }

          });

          $.each(tourists, function (name, y) {
            countryData.push({
              name: name,
              y: y,
              drilldown: mccDrilldownData[name] ? name : null
            });
          });
          $.each(mccDrilldownData, function (key, value) {
            var data = [];
            for (var mcc in value) {
              if (value.hasOwnProperty(mcc)) {
                var sum = value[mcc];
                data.push([mcc, sum]);
              }
            }
            mccDrilldownSeries.push({
              name: key,
              id: key,
              data: data
            });
          });

          // Create the chart
          $('#touristslu').highcharts({
            exporting: {
              enabled: false
            },
            chart: {
              type: 'pie'
            },
            title: {
              text: 'Touristen in Luzern'
            },
            subtitle: {
              text: 'Klicken für Drilldown'
            },
            plotOptions: {
              series: {
                dataLabels: {
                  enabled: true,
                  format: '{point.name}: {point.y:.0f} <br/>({point.percentage:.2f}%)'
                }
              }
            },

            tooltip: {
              enabled: false,
              headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
              pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.0f}</b> ({point.percentage:.2f}% of total)<br/>'
            },

            series: [{
              name: 'Brands',
              colorByPoint: true,
              data: countryData
            }],
            drilldown: {
              series: mccDrilldownSeries
            }
          });
        }
      });

    });


  })
;
