import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Table from './index';

const items = [
  { _id: '1', nama: 'Rumah', detail: 'Jalan Merdeka' },
  { _id: '2', nama: 'Kantor', detail: 'Jalan Sudirman' },
];

const columns = [
  { Header: 'Nama', accessor: 'nama' },
  { Header: 'Detail', accessor: alamat => <span>{alamat.detail}</span> },
];

test('merender header dan isi tabel', () => {
  const { getByText } = render(<Table items={items} columns={columns} showPagination={false} />);

  expect(getByText('Nama')).toBeInTheDocument();
  expect(getByText('Rumah')).toBeInTheDocument();
  expect(getByText('Jalan Sudirman')).toBeInTheDocument();
});

test('memakai lebar kolom bawaan seperti sebelumnya', () => {
  const { container } = render(<Table items={items} columns={columns} showPagination={false} />);

  expect(container.querySelector('td').style.width).toBe('150px');
});

test('mendukung accessor berupa string maupun fungsi', () => {
  const { getByText } = render(
    <Table
      items={[{ label: 'Subtotal', value: 'Rp 25.000' }]}
      columns={[
        { Header: '', accessor: 'label' },
        { Header: '', accessor: 'value' },
      ]}
      showPagination={false}
    />
  );

  expect(getByText('Subtotal')).toBeInTheDocument();
  expect(getByText('Rp 25.000')).toBeInTheDocument();
});

test('tidak menampilkan paginasi saat showPagination bernilai false', () => {
  const { queryByText } = render(<Table items={items} columns={columns} showPagination={false} />);
  expect(queryByText('First')).not.toBeInTheDocument();
});

test('menampilkan paginasi dan meneruskan perubahan halaman', () => {
  const onPageChange = jest.fn();
  const { getByLabelText } = render(
    <Table
      items={items}
      columns={columns}
      totalItems={30}
      perPage={10}
      page={2}
      onPageChange={onPageChange}
    />
  );

  fireEvent.click(getByLabelText('Halaman berikutnya'));
  expect(onPageChange).toHaveBeenCalledWith(3);

  fireEvent.click(getByLabelText('Halaman sebelumnya'));
  expect(onPageChange).toHaveBeenCalledWith(1);
});

test('menampilkan overlay loading saat isLoading', () => {
  const { container } = render(
    <Table items={items} columns={columns} showPagination={false} isLoading />
  );

  expect(container.querySelector('.absolute.h-full.w-full')).toBeInTheDocument();
});

test('menambahkan kolom radio dan menandai baris terpilih saat selectable', () => {
  const { getAllByLabelText, container } = render(
    <Table
      items={items}
      columns={columns}
      showPagination={false}
      selectable
      selectedRow={items[1]}
    />
  );

  const radios = getAllByLabelText('Pilih baris ini');

  expect(radios).toHaveLength(2);
  expect(radios[0].checked).toBe(false);
  expect(radios[1].checked).toBe(true);
  expect(container.querySelector('th').style.width).toBe('5px');
});

test('memilih baris lewat klik baris maupun lewat radio', () => {
  const onSelectRow = jest.fn();
  const { getByText, getAllByLabelText } = render(
    <Table
      items={items}
      columns={columns}
      showPagination={false}
      selectable
      onSelectRow={onSelectRow}
    />
  );

  fireEvent.click(getByText('Rumah'));
  expect(onSelectRow).toHaveBeenCalledWith(items[0]);

  fireEvent.click(getAllByLabelText('Pilih baris ini')[1]);
  expect(onSelectRow).toHaveBeenCalledWith(items[1]);
});

test('tidak memanggil onSelectRow saat tabel tidak selectable', () => {
  const onSelectRow = jest.fn();
  const { getByText } = render(
    <Table items={items} columns={columns} showPagination={false} onSelectRow={onSelectRow} />
  );

  fireEvent.click(getByText('Rumah'));
  expect(onSelectRow).not.toHaveBeenCalled();
});

test('memakai Header sebagai id kolom saat accessor berupa fungsi tanpa id', () => {
  const { container } = render(
    <Table
      items={[{ nama: 'Rumah' }]}
      columns={[{ Header: 'Nama alamat', accessor: alamat => alamat.nama }]}
      showPagination={false}
    />
  );

  expect(container.querySelectorAll('th')).toHaveLength(1);
  expect(container.querySelector('td').textContent).toBe('Rumah');
});
