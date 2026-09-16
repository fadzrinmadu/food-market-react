import * as React from 'react';
import { bool, func, number, oneOfType, string } from 'prop-types';

import { classNames } from '../utils/class-names';
import { focusRingClasses } from '../utils/a11y';

const Textarea = React.forwardRef(function Textarea(
  { value, onChange, placeholder, fullRound, fitContainer, rows, ...props },
  ref
) {
  const textareaClasses = classNames(
    'border',
    'px-5',
    'py-2',
    fullRound ? 'rounded-full' : 'rounded',
    fitContainer && 'w-full',
    focusRingClasses
  );

  return (
    <textarea
      {...props}
      className={textareaClasses}
      ref={ref}
      value={value}
      rows={rows}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
});

Textarea.defaultProps = {
  onChange: () => null,
  rows: 4,
};

Textarea.propTypes = {
  placeholder: string,
  value: oneOfType([string, number]),
  onChange: func,
  /** lebarkan textarea selebar container */
  fitContainer: bool,
  /** jumlah baris textarea */
  rows: number,
  /** bentuk border penuh membulat */
  fullRound: bool,
};

export default Textarea;
