import classes from '@/components/shared/book-card/skeleton-card.module.scss';

function SkeletonCard() {
  return (
    <div className={classes.skeleton}>
      <div className={classes.skeleton_img} />
      <div className={classes.skeleton_title} />
      <div className={classes.skeleton_authors} />
    </div>
  );
}

export default SkeletonCard;
