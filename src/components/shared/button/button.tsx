import { HTMLAttributes } from 'react';
import clsx from 'clsx';
import classes from './button.module.scss';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
}

function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button className={clsx(classes.button, className)} {...props}>
      {children}
    </button>
  );
}

export default Button;
