import * as React from 'react';
import { bool, func, node, string } from 'prop-types';

import { classNames } from '../utils/class-names';

const basePillClasses =
  'inline-flex pr-4 p-1 mr-4 rounded-full items-center shadow-lg border border-white cursor-pointer';

const baseIconClasses =
  'w-8 h-8 bg-white rounded-full text-gray-700 items-center inline-flex justify-center mr-2';

export default function Pill({ text, icon, isActive = false, onClick }) {
  const pillClasses = classNames(
    basePillClasses,
    isActive ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'
  );

  const iconClasses = classNames(baseIconClasses, isActive ? 'border border-red-600' : 'border');

  const handleKeyDown = event => {
    if (!onClick) return;
    if (event.key !== 'Enter' && event.key !== ' ') return;

    event.preventDefault();
    onClick(event);
  };

  return (
    <div
      className={pillClasses}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
    >
      <div className={iconClasses} aria-hidden="true">
        {icon}
      </div>
      <div>{text}</div>
    </div>
  );
}

Pill.propTypes = {
  /** label pill */
  text: string,
  /** ikon di sebelah kiri label */
  icon: node,
  /** tandai pill sedang aktif */
  isActive: bool,
  onClick: func,
};
