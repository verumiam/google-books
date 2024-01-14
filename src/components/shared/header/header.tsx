import Container from '@/components/shared/container';
import classes from './header.module.scss';
import Image from 'next/image';
import logo from '@/svgs/logo.svg';
import SearchInput from '@/components/shared/search-input';
import Link from 'next/link';
import FilterCategory from '@/components/shared/filter-category';
import FilterSort from '@/components/shared/filter-sort';

export default function Header() {
  return (
    <header className={classes.header}>
      <Container className={classes.header_inner}>
        <Link href="/?sort=relevance&filter=all">
          <Image src={logo} width={170} height={48} alt="Reading-books" priority />
        </Link>
        <SearchInput />
        <div className={classes.header_filters}>
          <FilterCategory />
          <FilterSort />
        </div>
      </Container>
    </header>
  );
}
