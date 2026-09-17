import * as React from 'react';
import { bool, func, node, oneOfType, number, string } from 'prop-types';

import { classNames } from '../utils/class-names';
import { focusWithinRingClasses } from '../utils/a11y';

const InputText = React.forwardRef(function InputText(
  {
    placeholder,
    value,
    onChange,
    iconBefore,
    iconAfter,
    fitContainer = false,
    fullRound,
    type = 'text',
    ...props
  },
  ref
) {
  const hasIcon = Boolean(iconBefore || iconAfter);

  const wrapperClasses = classNames(
    fitContainer ? 'flex' : 'inline-flex',
    hasIcon ? 'py-1' : 'py-2',
    iconBefore ? 'pl-1' : 'pl-5',
    iconAfter ? 'pr-1' : 'pr-3',
    'bg-white border border-gray-200 shadow-sm',
    fullRound ? 'rounded-full' : 'rounded',
    focusWithinRingClasses
  );

  const iconClasses = icon =>
    classNames(icon ? 'inline-flex' : 'hidden', 'items-center', 'justify-center', 'h-8', 'w-8');

  return (
    <div className={wrapperClasses}>
      <div className={iconClasses(iconBefore)} aria-hidden="true">
        {iconBefore}
      </div>
      <input
        {...props}
        type={type}
        className="outline-none flex-1 bg-transparent"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        ref={ref}
      />
      <div className={iconClasses(iconAfter)} aria-hidden="true">
        {iconAfter}
      </div>
    </div>
  );
});

InputText.propTypes = {
  placeholder: string,
  value: oneOfType([string, number]),
  onChange: func,
  /** ikon di sebelah kiri input */
  iconBefore: node,
  /** ikon di sebelah kanan input */
  iconAfter: node,
  /** lebarkan input selebar container */
  fitContainer: bool,
  /** bentuk border penuh membulat */
  fullRound: bool,
  type: string,
};

export default InputText;
