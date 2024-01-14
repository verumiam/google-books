import classes from '@/components/shared/book-card/styles/book-skeleton.module.scss';

function BookSkeleton() {
  return (
    <div className={classes.skeleton}>
      <div className={classes.skeleton_img} />
      <div className={classes.skeleton_title} />
      <div className={classes.skeleton_authors} />
    </div>
  );
}

export default BookSkeleton;
