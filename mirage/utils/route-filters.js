import { get } from '@ember/object';

function execute(handlerName, model, collection, predicate) {
  const result = model.all();
  const ids = collection.models.mapBy('id');
  result.models = result.models.filter(({ id }) => ids.includes(id));
  result.models = result.models[handlerName](predicate);
  return result;
}

export function executeBy(handlerName, model, collection, attribute, value) {
  const formattedValue = formatValue(value);
  return arguments.length < 5 ?
    execute(handlerName, model, collection,
      model => get(model, attribute)
    ) :
    execute(handlerName, model, collection,
      model => get(model, attribute) == formattedValue
    );
}

function formatValue(value) {
  const formattedValue = {
    true: true,
    false: false,
  }[value];
  return formattedValue === undefined ? value : formattedValue;
}

export function filter() {
  return execute('filter', ...arguments);
}
export function reject() {
  return execute('reject', ...arguments);
}

export function filterBy() {
  return executeBy('filter', ...arguments);
}
export function rejectBy() {
  return executeBy('reject', ...arguments);
}

export function maybeFilterBy(model, collection, attribute, value) {
  return value ?
    filterBy(...arguments) :
    collection;
}

export function maybeRejectBy(model, collection, attribute, value) {
  return value ?
    rejectBy(...arguments) :
    collection;
}
