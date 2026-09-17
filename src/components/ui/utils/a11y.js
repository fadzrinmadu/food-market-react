/**
 * Class Tailwind standar untuk indikator fokus yang terlihat (WCAG 2.4.7),
 * dipakai menggantikan `outline-none` polos pada elemen yang menerima fokus
 * langsung (button, input, textarea). Memakai `shadow-focus-ring` (bukan
 * util `ring-*` bawaan Tailwind 2+) karena project ini masih di Tailwind 1.x
 * yang belum punya plugin ring; warnanya dicocokkan dengan warna brand
 * (`orange-600`) lewat token `boxShadow.focus-ring` di `tailwind.config.js`.
 */
export const focusRingClasses = 'focus:outline-none focus:shadow-focus-ring';

/**
 * Varian `focusRingClasses` untuk wrapper yang membungkus elemen fokusabel
 * (mis. `<input>` di dalam `<div>` berbingkai), memakai `focus-within` agar
 * cincin fokus mengikuti bentuk wrapper, bukan elemen input di dalamnya.
 */
export const focusWithinRingClasses = 'focus-within:shadow-focus-ring';
