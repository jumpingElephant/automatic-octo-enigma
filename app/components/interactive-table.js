import Ember from 'ember';
import Columns from '../mixins/columns';
import EmberDataTable from '../mixins/ember-data-table';
import layout from '../templates/components/interactive-table';
import { Table } from 'ember-semantic-ui-table';

export default Ember.Component.extend(Columns, EmberDataTable, {
  layout,

  init() {
    this._super(...arguments);
    this.fetchRecords();
  },

  table: Ember.computed(function() {
    let columns = this.get('columns');
    columns[0].sortable = true;
    columns[1].sortable = true;
    return new Table(columns, []);
  }),

  actions: {
    sortColumn(e, column, table) {
      if (!column.get('sortable')) {
        return;
      }

      table.get('sortedColumns').setEach('sorted', false);

      column.setProperties({
        sorted: true,
        direction: column.get('direction') === 'ascending' ? 'descending' : 'ascending'
      });
      this.fetchRecords();
    },

    selectRow(e, row /* , table */ ) {
      row.toggleProperty('selected');
    },

    doubleClickCell(r, row, column /* , table */ ) {
      let content = row.get(column.valuePath);
      window.alert(`double click on ${content}`);
    }
  }
});
