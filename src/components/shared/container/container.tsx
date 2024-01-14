import { PropsWithChildren } from 'react';
import classes from './container.module.scss';
import clsx from 'clsx';

interface ContainerProps extends PropsWithChildren {
  className?: string;
}

function Container({ children, className }: ContainerProps) {
  return <div className={clsx(classes.container, className)}>{children}</div>;
}

export default Container;
