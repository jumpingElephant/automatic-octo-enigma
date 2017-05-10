import Ember from 'ember';
import Row from '../components/classes/row';
import Column from '../components/classes/column';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  isLoading: false,
  rows: [],
  selectedRows: [],
  page: 1,
  rowsPerPage: 3,

  init() {
    this._super(...arguments);
    this.fetchRecords();
  },

  fetchRecords() {
    this.set('isLoading', true);
    return this.get('store').findRecord('automobile', this.automobileId)
      .then((records) => {
        var bills = records.get('bills');
        var rows = bills.map(function(item) {
          return Row.create(item);
        });
        this.set('rows', rows);
      }).finally(() => {
        this.set('isLoading', false);
      });
  },

  columns: Ember.computed(function() {
    var cols = [{
        label: 'Datum',
        valuePath: 'date'
      }, {
        label: 'Kilometerstand',
        valuePath: 'mileage'
      }]
      .map((item) => {
        var col = Column.create(item);
        return col;
      });
    return cols;
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
      this.set('page', pageNumber);
    }
  }
});
