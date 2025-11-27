import * as React from 'react';
import { any, arrayOf, bool, func, number, oneOfType, shape, string } from 'prop-types';
import BounceLoader from 'react-spinners/BounceLoader';

import Pagination from '../Pagination';
import { classNames } from '../utils/class-names';

/** Lebar kolom bawaan; nilainya mengikuti `defaultColumn.width` react-table. */
const DEFAULT_COLUMN_WIDTH = 150;

const SELECTABLE_COLUMN_ID = 'internal__selectable';

/**
 * Tentukan id sebuah kolom.
 *
 * Aturannya meniru react-table: pakai `id` jika ada, lalu `accessor` jika berupa
 * string, lalu `Header` jika berupa string yang tidak kosong. Beberapa kolom di
 * project ini memang bergantung pada urutan tersebut.
 */
function resolveColumnId(column, index) {
  if (column.id) return column.id;
  if (typeof column.accessor === 'string') return column.accessor;
  if (typeof column.Header === 'string' && column.Header) return column.Header;

  return `column-${index}`;
}

function resolveCellValue(column, item, index) {
  if (typeof column.accessor === 'function') return column.accessor(item, index);
  if (typeof column.accessor === 'string') return item ? item[column.accessor] : undefined;

  return undefined;
}

export default function Table({
  items,
  columns,
  onPageChange,
  page,
  perPage,
  totalItems,
  showPagination,
  selectable,
  onSelectRow,
  selectedRow,
  primaryField,
  isLoading,
}) {
  const builtColumns = React.useMemo(() => {
    if (!selectable) return columns;

    const selectColumn = {
      Header: '',
      id: SELECTABLE_COLUMN_ID,
      width: 5,
      accessor: item => (
        <div>
          <input
            type="radio"
            aria-label="Pilih baris ini"
            checked={Boolean(selectedRow && selectedRow[primaryField] === item[primaryField])}
            onChange={() => onSelectRow && onSelectRow(item)}
          />
        </div>
      ),
    };

    return [selectColumn, ...columns];
  }, [columns, selectable, selectedRow, primaryField, onSelectRow]);

  const tableClasses = 'border-white shadow-lg w-full rounded overflow-hidden';
  const trClasses = classNames('border-b', selectable && 'cursor-pointer');
  const cellClasses = 'p-4 text-left p-2';

  const handleRowClick = item => {
    if (!selectable || !onSelectRow) return;
    onSelectRow(item);
  };

  return (
    <div className="relative">
      {isLoading ? (
        <div className="absolute h-full w-full">
          <div className="absolute h-full w-full bg-white opacity-75" />
          <div className="flex items-center justify-center text-center w-full h-full">
            <BounceLoader color="lightgrey" />
          </div>
        </div>
      ) : null}

      <table className={tableClasses}>
        <thead>
          <tr className="bg-red-600 text-white">
            {builtColumns.map((column, index) => {
              const id = resolveColumnId(column, index);

              return (
                <th
                  key={id}
                  className={cellClasses}
                  style={id === SELECTABLE_COLUMN_ID ? { width: column.width } : {}}
                >
                  {column.Header}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {items.map((item, rowIndex) => (
            <tr key={rowIndex} className={trClasses} onClick={() => handleRowClick(item)}>
              {builtColumns.map((column, columnIndex) => (
                <td
                  key={resolveColumnId(column, columnIndex)}
                  className={cellClasses}
                  style={{ width: column.width || DEFAULT_COLUMN_WIDTH }}
                >
                  {resolveCellValue(column, item, rowIndex)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

        {showPagination ? (
          <tfoot>
            <tr>
              <td className="p-4 text-center border" colSpan={10}>
                <Pagination
                  totalItems={totalItems}
                  perPage={perPage}
                  page={page}
                  onChange={onPageChange}
                  onPrev={() => onPageChange(page - 1)}
                  onNext={() => onPageChange(page + 1)}
                />
              </td>
            </tr>
          </tfoot>
        ) : null}
      </table>
    </div>
  );
}

Table.defaultProps = {
  items: [],
  columns: [],
  showPagination: true,
  perPage: 10,
  isLoading: false,
  primaryField: '_id',
  onPageChange: () => null,
};

Table.propTypes = {
  /** data yang ingin ditampilkan */
  items: arrayOf(any),
  /** definisi kolom: judul dan cara mengambil nilainya */
  columns: arrayOf(
    shape({
      Header: string,
      id: string,
      accessor: oneOfType([func, string]),
      width: number,
    })
  ),
  /** total seluruh item untuk kebutuhan paginasi */
  totalItems: number,
  /** jumlah item per halaman */
  perPage: number,
  /** halaman yang sedang aktif */
  page: number,
  /** tampilkan paginasi di bagian bawah tabel */
  showPagination: bool,
  /** dipanggil dengan nomor halaman tujuan */
  onPageChange: func,
  /** izinkan baris dipilih lewat radio button */
  selectable: bool,
  /** dipanggil dengan item pada baris yang dipilih */
  onSelectRow: func,
  /** item yang sedang terpilih */
  selectedRow: any,
  /** nama field pembeda antar baris */
  primaryField: string,
  /** tampilkan overlay loading di atas tabel */
  isLoading: bool,
};
