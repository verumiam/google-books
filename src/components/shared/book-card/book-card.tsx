import Image from 'next/image';
import classes from '@/components/shared/book-card/styles/book-card.module.scss';
import thumbnailEmpty from '@/svgs/thumbnail-empty.svg';

interface BookCardProps {
  title: string;
  authors?: string[];
  thumbnail?: string;
  categories?: string[];
}

function BookCard({ title, authors, thumbnail, categories }: BookCardProps) {
  return (
    <article className={classes.card}>
      <Image
        src={thumbnail || thumbnailEmpty}
        className={classes.card_img}
        width={200}
        height={250}
        alt={title}
        priority
      />
      <p className={classes.card_categories}>{categories?.slice(0)}</p>
      <h4 className={classes.card_title}>{title}</h4>
      <p className={classes.card_authors}>{authors?.join(', ')}</p>
    </article>
  );
}

export default BookCard;
