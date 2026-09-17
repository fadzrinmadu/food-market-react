import * as React from 'react';
import { arrayOf, func, node, number, shape, string } from 'prop-types';

import { classNames } from '../utils/class-names';

const baseStepClasses = 'p-4 mx-4 text-center shadow rounded cursor-pointer w-40';

export default function Steps({ steps = [], active = 0, onChange }) {
  const isInteractive = typeof onChange === 'function';

  const handleKeyDown = (event, index) => {
    if (!isInteractive) return;
    if (event.key !== 'Enter' && event.key !== ' ') return;

    event.preventDefault();
    onChange(index);
  };

  return (
    <div className="flex w-full justify-around items-center">
      {steps.map((step, index) => {
        const isActive = active === index;

        const item = (
          <div
            key={`step-${index}`}
            className={classNames(baseStepClasses, isActive && 'bg-orange-600 text-white font-bold')}
            onClick={isInteractive ? () => onChange(index) : undefined}
            onKeyDown={isInteractive ? event => handleKeyDown(event, index) : undefined}
            role={isInteractive ? 'button' : undefined}
            tabIndex={isInteractive ? 0 : undefined}
            aria-current={isActive ? 'step' : undefined}
          >
            <div
              className={classNames('border-2 rounded-full p-2', isActive && 'border-white')}
              aria-hidden="true"
            >
              {step.icon}
            </div>
            <div className="pt-4 text-sm">{step.label}</div>
          </div>
        );

        if (index === steps.length - 1) return item;

        return [item, <div className="w-64 h-1 bg-orange-600" key={`separator-${index}`} />];
      })}
    </div>
  );
}

Steps.propTypes = {
  /** daftar langkah yang ingin ditampilkan */
  steps: arrayOf(
    shape({
      label: string.isRequired,
      icon: node,
    })
  ),
  /** indeks langkah yang sedang aktif */
  active: number,
  /** dipanggil saat sebuah langkah diklik */
  onChange: func,
};
