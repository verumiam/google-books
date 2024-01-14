import classes from './result-panel.module.scss';

function ResultPanel({ total }: { total: number }) {
  return <p className={classes.result}>Found {total} results</p>;
}

export default ResultPanel;
