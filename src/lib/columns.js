import {keys, contains, filter, sortBy} from 'underscore';
import {UNCATEGORIZED_NAME} from '../helpers';

let COLUMNS = {
  ready: 1,
  'in progress': 2,
  review: 3
};
COLUMNS[UNCATEGORIZED_NAME] = 0;

function isColumn(label) {
  return contains(keys(COLUMNS), label.name);
}

export function filterKanbanLabels(labels) {
  const kanbanColumns = filter(labels, isColumn);
  return sortBy(kanbanColumns, label => COLUMNS[label.name]);
}
