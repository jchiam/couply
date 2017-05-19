import mirrorCreator from 'mirror-creator';

const DataStates = mirrorCreator([
  'Unfetched',
  'Fetching',
  'Fetched',
  'Error'
]);

export default DataStates;
