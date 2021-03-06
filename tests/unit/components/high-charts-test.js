import {
  moduleForComponent,
  test
} from 'ember-qunit';
import { initialize } from '../../../initializers/highcharts';

moduleForComponent('high-charts', 'HighChartsComponent', {
  // specify the other units that are required for this test
  setup: function(container) {
    initialize(container);
  },
  needs: ['highcharts-config:application']
});

test('it renders', function() {
  expect(2);

  // creates the component instance
  var component = this.subject();
  equal(component._state, 'preRender');

  // appends the component to the page
  this.append();
  equal(component._state, 'inDOM');
});

test('has default options', function() {
  var element = this.append();
  var credit = element.find(':contains(Highcharts.com)');
  equal(credit.length, 0, 'Highcharts default credits not present');
});

test('has local options', function() {
  var element = this.append();
  var credit = element.find(':contains(ember-highcharts-configured-title)');
  notEqual(credit.length, 0, 'ember-highcharts-configured-title credits present');
});


test('Highstock has navigator', function() {
  this.subject({
    mode: 'StockChart',
    chartOptions: {
      rangeSelector: {
        selected: 1
      },
      title: {
        text: 'AAPL Stock Price'
      }
    },
    content: [{
      name: 'AAPL',
      data: [
        [1147651200000, 67.79],
        [1147737600000, 64.98],
        [1147824000000, 65.26]
      ]
    }]
  });
  var element = this.append();
  var navigator = element.find('.highcharts-navigator');
  notEqual(navigator.length, 0, '.highcharts-navigator present');
});
