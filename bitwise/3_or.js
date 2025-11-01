// Izin awal pengguna (hanya BACA)
let izin_user_A = 1; // Biner: 0001

// Kita ingin MENAMBAHKAN IZIN_TULIS (nilai 2, biner 0010)
const IZIN_TULIS = 2;

// Gabungkan izin lama dengan izin baru menggunakan OR
izin_user_A = izin_user_A | IZIN_TULIS;

/*
  Perhitungan Bitwise:
    0001  (Izin lama: BACA)
  | 0010  (Izin baru: TULIS)
  ------
    0011  (Hasil: 3)
*/

// Sekarang, nilai izin_user_A adalah 3
console.log(izin_user_A); // Output: 3