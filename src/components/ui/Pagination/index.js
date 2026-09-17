import * as React from 'react';
import { bool, func, node, number, oneOf } from 'prop-types';
import FaAngleLeft from '@meronex/icons/fa/FaAngleLeft';
import FaAngleRight from '@meronex/icons/fa/FaAngleRight';

import { classNames } from '../utils/class-names';
import {
  colors,
  getBgColor,
  getBgColorHover,
  getBorderColor,
  getTextColor,
  getTextColorHover,
} from '../utils/colors';

function PaginationButton({ page, isActive, onClick, color = 'orange', disabled = false, label }) {
  const active = isActive && !disabled;

  const classes = classNames(
    active ? `${getBgColor(color)} ${getBgColorHover(color)}` : 'bg-white',
    active ? getBorderColor(color) : 'border-white',
    active && 'text-white',
    disabled ? 'text-gray-300 hover:text-gray-300 cursor-not-allowed' : 'cursor-pointer',
    'p-2',
    'inline-flex',
    'justify-center',
    'items-center',
    'rounded-full',
    'shadow-lg',
    'bg-gray-100',
    'h-6',
    'w-6',
    'text-sm',
    'mx-1'
  );

  const handleClick = () => {
    if (disabled) return;
    onClick();
  };

  const handleKeyDown = event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;

    event.preventDefault();
    handleClick();
  };

  return (
    <div
      className={classes}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || undefined}
      aria-current={active ? 'page' : undefined}
      aria-label={label}
    >
      {page}
    </div>
  );
}

PaginationButton.propTypes = {
  page: node,
  isActive: bool,
  onClick: func,
  color: oneOf(colors),
  disabled: bool,
  label: node,
};

export default function Pagination({
  totalItems,
  perPage = 10,
  page = 1,
  onChange = () => null,
  color = 'orange',
  onPrev = () => null,
  onNext = () => null,
}) {
  const totalPages = Math.ceil(totalItems / perPage);
  const numbers = Array.from({ length: totalPages }).map((_, index) => index + 1);
  const relativeNumbers = numbers.slice(
    page - 4 < 0 ? 0 : page - 3,
    page - 4 < 0 ? 5 : page + 2
  );

  const nextDisabled = page === totalPages || totalItems <= perPage;
  const prevDisabled = page === 1;

  const edgeClasses = disabled =>
    classNames(
      'text-sm',
      'p-1',
      disabled
        ? `${getTextColorHover('gray', 300)} ${getTextColor('gray', 300)} cursor-not-allowed`
        : `${getTextColorHover(color)} cursor-pointer`
    );

  const handleKeyDown = (event, action) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;

    event.preventDefault();
    action();
  };

  const goToFirst = () => onChange(1);
  const goToLast = () => (nextDisabled ? null : onChange(numbers.length));

  return (
    <div className="inline-flex justify-center items-center" role="navigation" aria-label="Paginasi">
      <div
        className={edgeClasses(prevDisabled)}
        onClick={goToFirst}
        onKeyDown={event => handleKeyDown(event, goToFirst)}
        role="button"
        tabIndex={0}
      >
        First
      </div>

      <PaginationButton
        page={<FaAngleLeft />}
        label="Halaman sebelumnya"
        disabled={prevDisabled}
        onClick={onPrev}
        color={color}
      />

      {(numbers.length < 6 ? numbers : relativeNumbers).map(number => (
        <PaginationButton
          page={number}
          key={number}
          label={`Halaman ${number}`}
          isActive={number === page}
          onClick={() => onChange(number)}
          color={color}
        />
      ))}

      <PaginationButton
        page={<FaAngleRight />}
        label="Halaman berikutnya"
        disabled={nextDisabled}
        onClick={onNext}
        color={color}
      />

      <div
        className={edgeClasses(nextDisabled)}
        onClick={goToLast}
        onKeyDown={event => handleKeyDown(event, goToLast)}
        role="button"
        tabIndex={0}
        aria-disabled={nextDisabled || undefined}
      >
        Last
      </div>
    </div>
  );
}

Pagination.propTypes = {
  /** total seluruh item */
  totalItems: number,
  /** jumlah item per halaman */
  perPage: number,
  /** halaman yang sedang aktif */
  page: number,
  /** dipanggil dengan nomor halaman tujuan */
  onChange: func,
  /** dipanggil saat tombol panah kiri diklik */
  onPrev: func,
  /** dipanggil saat tombol panah kanan diklik */
  onNext: func,
  color: oneOf(colors),
};
