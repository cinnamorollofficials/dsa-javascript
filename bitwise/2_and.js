// izin_editor = 3   (biner 0011)
// IZIN_HAPUS  = 8   (biner 1000)

let izin_editor = 3;
const IZIN_HAPUS = 8;

/*
  Bitwise AND:
    0011  (Izin Editor: 3)
  & 1000  (Masker: IZIN_HAPUS)
  ------
    0000  (Hasilnya: 0)
*/

// Karena hasilnya 0, cek ini bernilai false.
if ((izin_editor & IZIN_HAPUS) > 0) {
  console.log("Pengguna boleh MENGHAPUS."); // Ini TIDAK akan dieksekusi
} else {
  console.log("Akses Ditolak."); // Ini akan dieksekusi
}