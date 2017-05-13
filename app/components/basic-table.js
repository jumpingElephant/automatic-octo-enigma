import Ember from 'ember';
import Row from '../components/classes/row';
import Column from '../components/classes/column';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  isLoading: false,
  rows: [],
  selectedRows: [],
  currentPage: 0,
  rowsPerPage: 2,

  init() {
    this._super(...arguments);
    this.fetchRecords();
  },

  fetchRecords() {
    this.set('isLoading', true);
    return this.get('store').findRecord('automobile', this.automobileId)
      .then((records) => {
        var bills = records.get('bills');
        var rows = bills.sort(function(elem, other) {
          return other.mileage - elem.mileage;
        }).map(function(elem, idx, array) {
          if (idx < array.length - 1) {
            elem.distance = elem.mileage - array[idx + 1].mileage;
          }
          elem.pricePerLiter = elem.price / elem.quantity;
          return elem;
        }).map(function(elem) {
          return Row.create(elem);
        });
        this.set('rows', rows);
      }).finally(() => {
        this.set('isLoading', false);
      });
  },

  columns: Ember.computed(function() {
    var cols = [{
        label: 'Datum',
        valuePath: 'date',
        cells: {
          type: 'date',
          pattern: 'DD.MM.YYYY'
        }
      }, {
        label: 'Kilometerstand',
        valuePath: 'mileage',
        cells: {
          type: 'number',
          postfix: ' km',
          thousSep: '.'
        }
      }, {
        label: 'Distanz',
        valuePath: 'distance',
        cells: {
          type: 'number',
          postfix: ' km'
        }
      }, {
        label: 'Füllmenge',
        valuePath: 'quantity',
        cells: {
          type: 'number',
          digits: 2,
          decSep: ',',
          postfix: ' l'
        }
      }, {
        label: 'Preis',
        valuePath: 'price',
        cells: {
          type: 'number',
          digits: 2,
          decSep: ',',
          postfix: ' €'
        }
      }, {
        label: 'Preis je Liter',
        valuePath: 'pricePerLiter',
        cells: {
          type: 'number',
          digits: 3,
          decSep: ',',
          postfix: ' €'
        }
      }]
      .map((item) => {
        var col = Column.create(item);
        return col;
      });
    return cols;
  }),

  visibleRows: Ember.computed('rows', 'currentPage', 'rowsPerPage', function() {
    var currentPage = this.get('currentPage');
    var rowsPerPage = this.get('rowsPerPage');

    var start = currentPage * rowsPerPage;
    var end = start + rowsPerPage;
    return this.get('rows').slice(start, end);
  }),

  totalNumberOfRows: Ember.computed('rows', function() {
    return this.get('rows').length;
  }),

  numberOfPages: Ember.computed('rows', 'rowsPerPage', function() {
    var rows = this.get('rows');
    if (rows) {
      var rowsPerPage = this.get('rowsPerPage');
      return Math.ceil(rows.length / rowsPerPage);
    } else {
      return 1;
    }
  }),

  actions: {
    selectRow(e, row /* , table */ ) {
      row.toggleProperty('selected');
    },

    navigateToPage(pageNumber) {
      this.set('currentPage', pageNumber);
    }
  }
});
