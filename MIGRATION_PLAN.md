# Rencana Migrasi: Lepas Ketergantungan Library UI Pihak Ketiga

Dokumen ini melacak proses penggantian library UI pihak ketiga dengan komponen
internal milik project.

## 1. Ringkasan Project

| Aspek | Nilai |
| --- | --- |
| Framework | React 16.13 (Create React App / `react-scripts` 3.4.1) |
| Bahasa | JavaScript (bukan TypeScript), JSX |
| Styling | Tailwind CSS 1.9 (`tailwind.config.js` = konfigurasi default penuh, tanpa `prefix`) |
| Sumber CSS | `src/styles/index.css` → digenerate ke `src/styles/tailwind.css` (file hasil generate **ikut di-commit**) via `npm run build:styles` |
| Validasi tipe props | `prop-types` (dipakai di komponen `src/components/*`) |
| Konvensi komponen | 1 folder per komponen: `src/components/<Nama>/index.js`, `export default function <Nama>()` |
| Konvensi halaman | `src/pages/<Nama>/index.js` |
| State | Redux + redux-thunk (`src/features/*`, `src/app/store.js`) |
| Lint | `eslintConfig: { extends: "react-app" }` (tidak ada script lint terpisah; lint dijalankan oleh `react-scripts`) |
| Type check | Tidak ada (project JavaScript) |
| Test | `react-scripts test` (Jest + @testing-library/react 9) |
| Build | `react-scripts build` |
| Package manager | **npm** (hanya ada `package-lock.json`) |

### Aturan commit (`scripts/commit.mjs`)

Script ini **tidak boleh diubah**. Perilakunya:

- Dipakai dengan `node scripts/commit.mjs "<pesan commit>"`.
- Script melakukan `git add -A` sendiri, lalu `git commit -m "<pesan>"`.
- Script mengatur tanggal commit otomatis (maksimal 5 commit per hari, lanjut dari
  tanggal commit terakhir).
- Script **tidak memvalidasi format pesan** (tidak ada aturan tipe/scope/panjang
  yang dipaksakan). Namun riwayat commit yang ada konsisten memakai
  **Conventional Commits berbahasa Inggris**, contoh: `feat: add env file`,
  `fix: clean up code`, `docs: update README with new features and bug list`.
  Gaya itu yang dipakai di tugas ini.
- Konsekuensi penting: karena `git add -A`, **satu commit = satu satuan kerja
  utuh**. Karena itu setiap komponen dikerjakan sampai selesai (komponen internal
  + migrasi pemakaian + update dokumen ini) lalu langsung di-commit, sebelum
  komponen berikutnya disentuh.

### Kondisi awal (baseline) sebelum migrasi

| Pengecekan | Hasil awal |
| --- | --- |
| `npm run build` | **Berhasil** (butuh `NODE_OPTIONS=--openssl-legacy-provider` karena Node lokal v24 sedangkan `engines` project = Node 16) |
| `react-scripts test` | **1 test gagal** — `src/App.test.js` masih test bawaan CRA (`renders learn react link`) dan sudah gagal sebelum migrasi. Kegagalan ini **pre-existing**, tidak dihapus, dan tidak dianggap regresi. |
| Type check | Tidak berlaku |

## 2. Library UI yang Terdeteksi

| Library | Peran | Jumlah file pemakai | Siklus |
| --- | --- | --- | --- |
| `upkit` ^0.17.10 | Library komponen UI utama (button, card, table, form, layout, dll) | 13 file | **Siklus 1 (dikerjakan lebih dulu)** |
| `react-spinners` ^0.9.0 | Komponen loading spinner (`BounceLoader`) | 3 file | Siklus 2 |
| `@meronex/icons` ^4.0.0 | Library ikon (Font Awesome) | 6 file | Siklus 3 |

`upkit` dipilih lebih dulu karena paling banyak dipakai dan karena `react-spinners`
+ `@meronex/icons` juga merupakan dependensi internal `upkit` — keduanya baru bisa
dinilai ulang setelah `upkit` hilang.

Catatan: `upkit` sendiri menarik `react-select` dan `react-table` sebagai
dependensinya. Keduanya tidak pernah diimport langsung oleh project ini.

## 3. Lokasi Komponen Internal

Komponen internal ditempatkan di:

```
src/components/ui/<Nama>/index.js
src/components/ui/index.js        <- barrel export
```

Alasan:

- Mengikuti konvensi project yang sudah ada (satu folder per komponen, `index.js`,
  default export, `prop-types`).
- Subfolder `ui/` memisahkan komponen presentasi generik dari komponen aplikasi
  (`Cart`, `TopBar`, `StatusLabel`, ...) yang sudah ada di `src/components/`.
- Barrel `src/components/ui/index.js` memakai **named export**, sehingga bentuk
  import di file pemakai nyaris tidak berubah:
  `import { Button, Text } from 'upkit'` → `import { Button, Text } from '../../components/ui'`.

## 4. Inventaris Komponen `upkit`

### 4.1 Komponen yang benar-benar dipakai

| Komponen | File pemakai | Jumlah | Props/API yang benar-benar dipakai |
| --- | --- | --- | --- |
| `LayoutOne` | Checkout, Invoice, Login, Logout, Register, RegisterSuccess, UserAccount, UserAddress, UserAddressAdd, UserOrders | 10 | `size` (`small`/`large`/default `large`), `children` |
| `Button` | Cart, Checkout, Invoice, Login, Register, RegisterSuccess, UserAddress, UserAddressAdd, UserOrders | 9 | `text`, `children`, `onClick`, `color` (`red`/`gray`), `size` (`large`), `fitContainer`, `disabled`, `iconBefore`, `iconAfter` |
| `Text` | Cart, Checkout, Invoice, RegisterSuccess, UserAccount, UserAddress, UserOrders | 7 | `as` (`h3`/`h4`/`h5`), `children` |
| `Table` | Checkout (3×), Invoice, UserAddress, UserOrders | 6 | `items`, `columns` (`Header`, `accessor` string/fungsi, `id`), `perPage`, `page`, `totalItems`, `onPageChange`, `showPagination`, `isLoading`, `selectable`, `selectedRow`, `onSelectRow`, `primaryKey`* |
| `Card` | Login, Register, RegisterSuccess, UserAccount | 4 | `color` (`white`), `header`, `body`, `children` |
| `FormControl` | Login (2×), Register (4×), UserAddressAdd (6×) | 3 file | `label`, `errorMessage`, `color` (`black`), `children` |
| `InputText` | Home, Login, Register (2×), UserAddressAdd | 4 file | `placeholder`, `value`, `onChange`, `fitContainer`, `fullRound`, `name`, **`ref`** (react-hook-form) |
| `Responsive` | TopBar, Checkout (3×), Home, UserAccount | 4 file | `desktop`, `tablet`, `mobile`, `justify`, `items`, `children` |
| `InputPassword` | Login, Register (2×) | 2 file | `placeholder`, `name`, `fitContainer`, **`ref`** |
| `CardItem` | Cart | 1 | `imgUrl`, `name`, `qty`, `color`, `onInc`, `onDec` |
| `CardProduct` | Home | 1 | `title`, `imgUrl`, `price`, `onAddToCart` |
| `Pagination` | Home | 1 | `totalItems`, `page`, `perPage`, `onChange`, `onNext`, `onPrev` |
| `Pill` | Home | 1 | `text`, `icon`, `isActive`, `onClick` |
| `SideNav` | Home | 1 | `items` (`{icon,label,id}`), `verticalAlign`, `active`, `onChange` |
| `LayoutSidebar` | Home | 1 | `sidebar`, `content`, `sidebarSize` |
| `Steps` | Checkout | 1 | `steps` (`{label, icon}`), `active` |
| `Badge` | StatusLabel | 1 | `color` (orange/green/yellow/blue/red), `children` |
| `Textarea` | UserAddressAdd | 1 | `placeholder`, `fitContainer`, `name`, **`ref`** |
| `ButtonCircle` | TopBar | 1 | `icon` |
| `Select` | SelectWilayah | 1 | `options`, `onChange`, `value`, `isLoading`, `isDisabled` |

\* `primaryKey` — lihat catatan ambiguitas di bagian 7.

### 4.2 Komponen internal tambahan (dipakai komponen lain, bukan langsung oleh app)

| Komponen | Dipakai oleh |
| --- | --- |
| `InputNumber` | `CardItem` (tombol +/- qty di keranjang) |

### 4.3 Ekspor `upkit` yang TIDAK dipakai

`CardAlert`, `CardError`, `CardInfo`, `SelectAsync` — tidak dibuat ulang.

### 4.4 Hook / utilitas / provider / theme dari `upkit`

- **Tidak ada** hook, context, atau provider yang diexport maupun dipakai.
- **Tidak ada** theme provider. `upkit` memakai Tailwind, warnanya dipilih lewat
  helper internal (`getBgColor`, `getTextColor`, ...) yang menyusun nama class
  Tailwind seperti `bg-red-600`, `text-orange-900`.

## 5. Ketergantungan Tersembunyi

| Hal | Temuan | Dampak & penanganan |
| --- | --- | --- |
| Global CSS | `src/App.js` mengimport `'upkit/dist/style.min.css'` | File itu adalah **build Tailwind (preflight + utilities) dengan konfigurasi default**, praktis identik dengan `src/styles/tailwind.css` milik project yang sudah diimport di `src/index.js`. Sudah diverifikasi: seluruh class yang dipakai komponen `upkit` tersedia di `src/styles/tailwind.css`. Import ini dihapus pada tahap pembersihan. |
| Design token | Tidak ada token terpisah — `upkit` memakai palet Tailwind default (`red-600`, `gray-300`, dst) yang **sama persis** dengan `tailwind.config.js` project | Tidak perlu ekstraksi token baru. Fondasi cukup berupa helper warna internal yang menghasilkan nama class Tailwind yang sama. |
| Portal | **Tidak ada** modal/tooltip/popover/dropdown ber-portal, kecuali menu dropdown `react-select` di dalam `Select` | Hanya relevan untuk `Select`. |
| Animasi | Hanya animasi `BounceLoader` (`react-spinners`, keyframes emotion) di dalam `Table` saat `isLoading` | Pada siklus 1 `Table` internal tetap memakai `react-spinners/BounceLoader` dengan `color="lightgrey"` — persis seperti `upkit`. Penggantiannya ditangani di siklus 2 agar siklus 1 tetap fokus pada satu library. |
| Focus trap / keyboard nav | **Tidak ada** di `upkit`. Bahkan beberapa elemen interaktif `upkit` dibuat dari `<div onClick>` tanpa atribut ARIA (`Pagination`, `Pill`, `Steps`, `SideNav`, `CardProduct`) | Komponen internal **menaikkan** aksesibilitas (elemen semantik `<button>` / `role` + dukungan keyboard) tanpa mengubah tampilan. Lihat bagian 8. |
| Ref forwarding | `InputText`, `InputPassword`, `Textarea`, `InputNumber` memakai `forwardRef`, dan react-hook-form (`ref={register(...)}`) bergantung pada itu | Komponen internal wajib `React.forwardRef` ke elemen `<input>`/`<textarea>` aslinya. |
| Dependensi transitif | `upkit` menarik `react-select`, `react-table`, `react-spinners`, `@meronex/icons` | `react-select` & `react-table` hilang otomatis saat `upkit` di-uninstall. `react-spinners` & `@meronex/icons` tetap ada karena masih dipakai langsung project (siklus 2 & 3). |
| Ikon di dalam komponen | `FormControl` memakai `FaExclamationTriangle`, `Pagination` memakai `FaAngleLeft`/`FaAngleRight`, `CardProduct` memakai `FaCartPlus` | Komponen internal mengimport ikon yang sama dari `@meronex/icons/fa` (library ikon baru ditangani di siklus 3, agar siklus 1 tetap fokus). |
| Format mata uang | `CardProduct` memakai `toRupiah` internal `upkit` (`maximumSignificantDigits: 3`), sedangkan project punya `formatRupiah` (`maximumSignificantDigits: 2`) | **Angka yang tampil bisa berbeda.** `CardProduct` internal memakai formatter dengan opsi yang sama dengan `upkit` agar tampilan tidak berubah. Lihat bagian 7. |

## 6. Urutan Migrasi & Status

Urutan disusun dari komponen paling sederhana / tidak bergantung ke paling
kompleks. Setiap baris = satu commit.

| # | Komponen | Bergantung pada | Status |
| --- | --- | --- | --- |
| 0 | Fondasi (helper warna + `classNames`) | — | ✅ Selesai |
| 1 | `Text` | — | ✅ Selesai |
| 2 | `Badge` | — | ✅ Selesai |
| 3 | `Button` | — | ✅ Selesai |
| 4 | `ButtonCircle` | — | ✅ Selesai |
| 5 | `Card` | — | ✅ Selesai |
| 6 | `LayoutOne` | — | ✅ Selesai |
| 7 | `LayoutSidebar` | — | ✅ Selesai |
| 8 | `Responsive` | — | ✅ Selesai |
| 9 | `Pill` | — | ✅ Selesai |
| 10 | `Steps` | — | ✅ Selesai |
| 11 | `SideNav` | — | ✅ Selesai |
| 12 | `InputText` + `InputPassword` | — | ✅ Selesai |
| 13 | `Textarea` | — | ✅ Selesai |
| 14 | `FormControl` | — | ✅ Selesai |
| 15 | `InputNumber` | `ButtonCircle` | ✅ Selesai |
| 16 | `CardItem` | `InputNumber` | ✅ Selesai |
| 17 | `CardProduct` | `Card`, `Text` | ✅ Selesai |
| 18 | `Pagination` | — | ✅ Selesai |
| 19 | `Table` | `Pagination` | ✅ Selesai |
| 20 | `Select` | — | ✅ Selesai (keputusan: bungkus `react-select`) |
| 21 | Pembersihan `upkit` | seluruhnya | ⬜ Belum |

`InputText` & `InputPassword` digabung dalam satu commit karena `InputPassword`
pada `upkit` hanyalah `InputText` dengan `type="password"` — memisahkannya akan
menghasilkan commit yang tidak bisa berdiri sendiri.

## 7. Risiko, Ambiguitas, dan Keputusan

| # | Hal | Keputusan |
| --- | --- | --- |
| R1 | **`Select` memakai `react-select`.** `react-select` adalah combobox lengkap (dropdown ber-portal, pencarian ketik, navigasi keyboard, state loading/disabled, styling emotion). Membuat ulang dengan perilaku & tampilan identik **berisiko tinggi**. | **Berhenti dan tunggu keputusan pemilik project.** Lihat bagian 9. |
| R2 | **`Table` memakai `react-table` v7 (`useTable`).** | Fitur react-table yang terpakai sangat terbatas: hanya render kolom + baris, tanpa sorting/filter/grouping/resize. Aman dibuat ulang. Detail yang wajib ditiru: resolusi `id` kolom ala react-table — `column.id` → kalau `accessor` berupa string pakai string itu → kalau tidak, pakai `Header` (string). Beberapa kolom di project **bergantung pada fallback `Header` ini** (mis. `addressColumns` di Checkout, kolom `Items`/`Total`/`Invoice` di UserOrders). |
| R3 | `Table` `upkit` menerima prop `primaryField`, tetapi `src/pages/Checkout/index.js` mengirim `primaryKey={'_id'}` | Prop `primaryKey` selama ini **diabaikan** oleh `upkit`; nilai efektifnya jatuh ke default `'_id'` — kebetulan sama. Komponen internal tetap memakai nama `primaryField` (default `'_id'`), dan pemanggilan di Checkout diperbaiki menjadi `primaryField="_id"`. **Perilaku tidak berubah**, hanya prop mati yang dihilangkan. |
| R4 | `Table` dipanggil tanpa `showPagination={false}` di UserOrders/UserAddress, tetapi `totalItems` bisa `0`/`undefined` di render pertama sehingga `Math.ceil(totalItems/perPage)` = `0`/`NaN` | Perilaku ini **dipertahankan apa adanya** (Pagination merender "First/Last" + panah tanpa angka). Tidak diperbaiki karena di luar lingkup migrasi. |
| R5 | `CardProduct` memformat harga dengan `maximumSignificantDigits: 3`, berbeda dari `formatRupiah` project (`2`) | Komponen internal **meniru `upkit` (`3`)** agar tampilan katalog di halaman Home tidak berubah. Sengaja **tidak** memakai `formatRupiah` project. Dicatat sebagai perbedaan yang disengaja. |
| R6 | `Responsive` `upkit` membungkus tiap anak dalam `<div>` kolom, dan mendeteksi "banyak anak" lewat `children.length` | `children.length` bernilai truthy juga untuk **string** (`"abc".length`). Di project, `Responsive` selalu menerima elemen/array elemen, jadi tidak jadi masalah. Komponen internal memakai `React.Children.count(children) > 1` yang lebih benar **dan menghasilkan markup identik untuk semua pemakaian di project ini**. |
| R7 | `Responsive` default `justify: ''` menghasilkan class tidak valid `"justify-"`; `Pill` memakai class `border-full` yang tidak ada di Tailwind; `Pagination` memakai `border-3` dan `hover:text-grey-300` (typo, warna `grey` tidak ada) | Class-class mati ini **tidak ikut dibawa** ke komponen internal karena tidak menghasilkan style apa pun. Tampilan tidak berubah. |
| R8 | `upkit` memakai `<div onClick>` untuk elemen interaktif (`Pagination`, `Pill`, `Steps`, `SideNav`, tombol keranjang `CardProduct`) tanpa peran/ARIA/keyboard | Komponen internal memakai `<button type="button">` atau menambahkan `role`/`tabIndex`/handler keyboard, **dengan class Tailwind yang sama plus reset agar tampilan tetap identik** (`<button>` perlu `focus:outline-none`-equivalent & tidak mewarisi style default). Ini peningkatan aksesibilitas yang disengaja. |
| R9 | `src/App.test.js` (test bawaan CRA) sudah gagal sebelum migrasi | Tidak dihapus dan tidak diubah. Test baru untuk komponen internal ditambahkan terpisah. Kegagalan pre-existing ini dilaporkan apa adanya. |
| R10 | Node lokal (v24) tidak cocok dengan `engines` project (Node 16) sehingga webpack 4 gagal karena OpenSSL 3 | Verifikasi build dijalankan dengan `NODE_OPTIONS=--openssl-legacy-provider`. **Tidak ada file project yang diubah** untuk ini. |
| R11 | `src/styles/tailwind.css` adalah file hasil generate yang ikut di-commit, dan `npm run build` **tidak** meregenerasinya | Semua class Tailwind yang dipakai komponen internal sudah diverifikasi ada di `src/styles/tailwind.css` (file itu build penuh tanpa purge). Jadi file ini **tidak perlu** diregenerasi. |

## 8. Perbedaan yang Disengaja


### `Text`

- `upkit` selalu merender `<div>` apa pun nilai `as`. Komponen internal merender
  tag heading asli (`<h1>`..`<h6>`) untuk varian heading, dan tetap `<div>` untuk
  varian lain (`body`, `small`, `info`, `warning`, `error`).
- **Tampilan tidak berubah**: Tailwind preflight yang sudah aktif di project
  mereset `h1`–`h6` menjadi `font-size: inherit; font-weight: inherit; margin: 0`,
  sehingga heading merender identik dengan `<div>`. Yang berubah hanya struktur
  dokumen agar pembaca layar dan SEO mendapat hierarki judul yang benar.

### `Button`

- Atribut `type` **sengaja tidak di-set** (sama seperti `upkit`). Beberapa form
  (Login, Register, UserAddressAdd) mengandalkan perilaku bawaan `<button>` di
  dalam `<form>` yang otomatis men-submit. Menambahkan `type="button"` akan
  merusak form tersebut.
- Ikon (`iconBefore`/`iconAfter`) diberi `aria-hidden="true"` karena hanya
  dekorasi di samping label teks. Tidak ada perubahan tampilan.
- Props sisa diteruskan ke elemen `<button>` (`...props`) supaya atribut seperti
  `aria-label` bisa ditambahkan tanpa mengubah komponen.

### `ButtonCircle`

- Sama seperti `Button`, atribut `type` tidak di-set agar perilaku identik dengan
  `upkit`.
- Props sisa diteruskan ke `<button>` sehingga `aria-label` bisa ditambahkan di
  tempat pemakaian bila dibutuhkan (tombol ini isinya hanya ikon).

### `Card`

- Jika `onClick` diberikan, kartu kini mendapat `role="button"`, `tabIndex={0}`,
  dan bisa diaktifkan dengan tombol Enter/Spasi. `upkit` hanya memasang `onClick`
  pada `<div>` biasa sehingga tidak bisa dijangkau keyboard.
- Elemen tetap `<div>` (bukan `<button>`) agar kotak dan spasi render persis sama
  dengan sebelumnya. Tanpa `onClick`, tidak ada atribut tambahan sama sekali.

### `LayoutSidebar`

- Class `justify-stretch` yang dipasang `upkit` **tidak dibawa**. Class itu tidak
  ada di Tailwind v1 (yang tersedia hanya `justify-start`/`end`/`center`/
  `between`/`around`), sudah diverifikasi tidak ada di `src/styles/tailwind.css`,
  jadi selama ini tidak menghasilkan style apa pun. Tampilan tidak berubah.

### `Responsive`

- Perilaku aneh `upkit` **sengaja dipertahankan**: hanya kata `flex` yang diberi
  prefix breakpoint, sementara `flex-wrap` tidak (`"md:" + "flex flex-wrap"` →
  `"md:flex flex-wrap"`). Layout halaman yang ada bergantung pada hasil ini, jadi
  tidak diperbaiki.
- Class mati `"md:"`/`"lg:"` (saat breakpoint = 1) dan `"justify-"` (saat
  `justify` kosong) tidak lagi ikut dirender karena tidak menghasilkan style apa
  pun.
- Deteksi jumlah anak memakai `React.Children.toArray` (bukan `children.length`
  seperti `upkit`, yang keliru untuk anak berupa string). Sudah dicek: untuk semua
  pemakaian di project ini — termasuk daftar produk kosong dan daftar berisi satu
  item — DOM yang dihasilkan identik.

### `Pill`

- Class mati `border-full` (tidak ada di Tailwind) tidak dibawa.
- Pill kini punya `role="button"`, `tabIndex={0}`, dukungan Enter/Spasi, dan
  `aria-pressed` yang mencerminkan status filter aktif. Sebelumnya hanya `<div>`
  dengan `onClick`. Elemen tetap `<div>` agar tampilan identik.

### `Steps`

- `upkit` selalu memasang `onClick` (default-nya fungsi kosong) sehingga langkah
  terlihat bisa diklik padahal tidak melakukan apa-apa. Komponen internal hanya
  memasang handler + `role="button"`/`tabIndex`/keyboard **jika `onChange` benar-
  benar diberikan**. Di halaman Checkout `onChange` tidak diberikan, jadi
  perilakunya tetap sama persis (klik tidak melakukan apa pun), tapi elemen tidak
  lagi mengumumkan diri sebagai tombol palsu ke pembaca layar.
- Langkah aktif diberi `aria-current="step"`; ikon diberi `aria-hidden="true"`
  karena label teks sudah ada di bawahnya.
- Class `cursor-pointer` tetap dipertahankan agar tampilan tidak berubah.

### `SideNav`

- Elemen pembungkus berubah dari `<div>` menjadi `<nav>` (tetap `display:flex`
  karena class `flex`, jadi tampilan identik) agar menu kategori dikenali sebagai
  navigasi.
- Item menu mendapat `role="button"`, `tabIndex`, dukungan Enter/Spasi, dan
  `aria-current="page"` untuk item aktif.
- Ikon gambar kini punya `alt=""` (dekoratif) karena label teksnya sudah dirender
  tepat di bawahnya; sebelumnya `<img>` tanpa `alt` sama sekali.
- `upkit` menyisipkan literal `"false"` ke daftar class item yang tidak aktif
  (hasil `[...classes, false].join(" ")`). Class itu tidak berarti apa-apa dan
  tidak dibawa.

### `InputText` & `InputPassword`

- Keduanya memakai `React.forwardRef` ke elemen `<input>` asli — wajib, karena
  Login, Register, dan UserAddressAdd memakai `ref={register(...)}` dari
  react-hook-form.
- Pembungkus ikon diberi `aria-hidden="true"` (ikon hanya dekorasi). Pembungkus
  ini tetap dirender walau kosong (dengan class `hidden`), persis seperti `upkit`.
- `InputPassword` tetap punya default `onChange` berupa fungsi kosong seperti
  `upkit`, agar input tanpa `onChange` di Register berperilaku sama.

### `FormControl`

- Area pesan error diberi `role="alert"` supaya pembaca layar mengumumkan error
  validasi saat muncul. Saat tidak ada error, area itu tetap memakai class
  `invisible` (`visibility: hidden`) seperti sebelumnya, sehingga juga tidak
  terbaca pembaca layar — tinggi 8 tetap dipesan agar layout tidak melompat.
- `<label>` masih **tidak** terhubung ke input lewat `htmlFor`/`id`, sama seperti
  `upkit`. Menghubungkannya butuh perubahan struktur/kontrak komponen yang
  menyentuh juga `SelectWilayah`, jadi ditunda agar migrasi ini tetap netral
  terhadap perilaku. Dicatat sebagai perbaikan lanjutan.
- Ikon peringatan masih diambil dari `@meronex/icons/fa`, sama seperti `upkit`.
  Penggantiannya masuk siklus 3.

### `InputNumber`

- Tombol `+` dan `-` kini punya `aria-label` ("Tambah jumlah" / "Kurangi
  jumlah"). Sebelumnya isinya hanya karakter `+`/`-` tanpa konteks.
- `onSetValue` sekarang punya default berupa fungsi kosong. Pada `upkit` prop ini
  wajib tapi `CardItem` tidak pernah mengirimnya, sehingga **mengetik angka
  langsung di kolom jumlah keranjang akan melempar `TypeError`**. Dengan default
  ini, mengetik langsung tidak melakukan apa-apa (nilai tetap dikendalikan Redux)
  — perilaku yang memang dituju, tanpa crash. Perbedaan yang disengaja.

### `CardProduct`

- Hanya props yang benar-benar dipakai halaman Home yang didukung: `title`,
  `imgUrl`, `price`, `color`, `onAddToCart`. Props `upkit` yang tidak pernah
  dipakai (`subText`, `imgOverflow`, `onClick`, `withFavorite`,
  `onFavoriteClick`) tidak dibawa — termasuk ikon `FaHeart` yang menyertainya.
- Dua elemen kosong **tetap dirender**: slot tombol favorit dan baris `subText`.
  Slot favorit wajib ada karena barisnya memakai `justify-between` — tanpa elemen
  kosong itu gambar produk akan pindah ke kiri.
- Harga tetap diformat dengan `maximumSignificantDigits: 3` (fungsi `toRupiah`
  lokal), **bukan** `formatRupiah` project yang memakai `2`, supaya angka di
  katalog persis sama seperti sebelumnya.
- Tombol tambah ke keranjang mendapat `role="button"`, `tabIndex`, dukungan
  Enter/Spasi, dan `aria-label` berisi nama produk. Sebelumnya hanya `<div>`
  berisi ikon tanpa teks sama sekali.

### `Pagination`

- Class mati tidak dibawa: `border-3` (tidak ada di Tailwind) dan
  `hover:text-grey-300` (salah tulis — Tailwind memakai `gray`, bukan `grey`).
- Urutan class `bg-*` sengaja dipertahankan persis seperti `upkit`
  (`bg-red-600 ... bg-gray-100`). Yang menentukan warna akhir adalah urutan aturan
  di `tailwind.css`, bukan urutan di atribut `class`, jadi menghapus salah satunya
  berisiko mengubah warna.
- Tombol angka/panah kini punya `role="button"`, `tabIndex`, dukungan Enter/Spasi,
  `aria-label` ("Halaman 3", "Halaman berikutnya", ...), `aria-current="page"`
  untuk halaman aktif, dan `aria-disabled` untuk panah yang mati. Wadahnya diberi
  `role="navigation"` + `aria-label="Paginasi"`.
- Tombol "First" tetap memanggil `onChange(1)` walau sedang di halaman pertama —
  sama seperti `upkit`, tidak diubah.

### `Table`

- `react-table` tidak lagi dipakai; render tabel dibuat langsung dengan elemen
  `<table>/<thead>/<tbody>/<tfoot>` standar. Detail react-table yang **ditiru
  persis** karena tampilan bergantung padanya:
  - resolusi id kolom: `id` → `accessor` (jika string) → `Header` (jika string);
  - lebar kolom bawaan `150` yang dipasang sebagai `style="width: 150px"` di
    setiap `<td>`, dan `width: 5` untuk kolom radio;
  - daftar class yang sama, termasuk `p-4 ... p-2` yang saling menimpa.
- Atribut `role="table"/"row"/"cell"` yang ditambahkan react-table tidak dibawa.
  Atribut itu hanya mengulang semantik bawaan elemen tabel HTML, jadi tidak ada
  yang hilang.
- `style={{ textAlign: "center !important" }}` pada header kolom radio tidak
  dibawa: nilai itu ditolak CSSOM sehingga selama ini tidak berefek apa pun.
- Accessor berupa string hanya mendukung nama field datar (bukan jalur bertitik
  seperti `a.b`). Seluruh kolom di project ini memakai field datar.
- Radio pemilih baris kini punya `aria-label` dan benar-benar memanggil
  `onSelectRow` lewat `onChange`, sehingga baris bisa dipilih dengan keyboard.
  Sebelumnya radio hanya hiasan (`onClick`/`onChange` di-`preventDefault`) dan
  pemilihan hanya bisa lewat klik baris. Klik baris tetap berfungsi seperti dulu.
- Pemanggilan di `src/pages/Checkout/index.js` diubah dari `primaryKey={"_id"}`
  menjadi `primaryField="_id"`. Prop `primaryKey` tidak pernah dikenali `upkit`;
  nilainya jatuh ke default `"_id"` — kebetulan sama — jadi perilakunya tidak
  berubah, hanya prop mati yang dihilangkan.
- `onPageChange` diberi default fungsi kosong agar tombol paginasi tidak
  melempar error bila tabel dirender tanpa handler. Semua pemakaian di project
  ini sudah mengirimkannya.

### `Select`

- Komponen internal ini **membungkus `react-select`**, sama seperti `upkit` yang
  juga hanya pembungkus tipis. `react-select` kini menjadi dependensi langsung
  project, dipin ke versi `3.1.0` — versi yang sama persis dengan yang selama ini
  ditarik `upkit`, termasuk `react-input-autosize@2.2.2` — supaya tidak ada
  perubahan tampilan maupun perilaku.
- `upkit` memakai `require("react-select")` lalu `ReactSelect["default"]` untuk
  menyiasati bundler CRA. Komponen internal memakai `import` ESM biasa, yang
  sudah aman di CRA versi project ini.

## 9. Komponen yang Ditahan

### `Select` (`src/components/SelectWilayah/index.js`)

`upkit`'s `Select` hanyalah pembungkus tipis di atas **`react-select` v3**:

```js
var Select = ({ options, onChange, value, isMulti, ...props }) =>
  <ReactSelect options={options} onChange={onChange} value={value} isMulti={isMulti} {...props} />
```

Project memakainya di `SelectWilayah` dengan `options`, `value`, `onChange`,
`isLoading`, `isDisabled` — dan komponen ini dipakai 4× di halaman
"Tambah alamat pengiriman" (provinsi → kabupaten → kecamatan → kelurahan),
dengan daftar yang bisa berisi ribuan opsi (data wilayah Indonesia).

Membuat ulang `react-select` dengan **perilaku dan tampilan identik** berisiko
tinggi karena mencakup: input pencarian/filter ketik, dropdown ber-portal dengan
deteksi posisi, navigasi keyboard penuh (panah/Enter/Esc/Tab/Home/End),
`aria-activedescendant` + live region untuk screen reader, indikator loading &
disabled, animasi, serta styling emotion yang khas (tinggi kontrol 38px, warna
border `#cccccc`/`#2684FF`, indikator separator, dll).

**Keputusan pemilik project: bungkus `react-select`.** `upkit` dicopot, dan
`react-select` dipasang sebagai dependensi langsung (versi dipin ke `3.1.0`,
sama persis dengan yang selama ini ditarik `upkit`, agar tidak ada perubahan
perilaku). Komponen internal `src/components/ui/Select` membungkusnya dengan API
yang sama seperti `Select` milik `upkit`.

Konsekuensi: tampilan, pencarian ketik, navigasi keyboard, dan aksesibilitas
combobox tetap persis sama, dan `upkit` tetap bisa dihapus seluruhnya. Yang masih
tersisa hanyalah satu library fungsional (`react-select`), bukan UI kit.

