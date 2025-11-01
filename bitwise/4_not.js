const IZIN_HAPUS = 8;
let izinAdmin = 15; // 1111 (Baca, Tulis, Eksekusi, Hapus)

console.log("Izin Awal:", izinAdmin);

// Pola "Bit Clear" untuk menghapus izin HAPUS
izinAdmin = izinAdmin & (~IZIN_HAPUS); 

console.log("Izin Baru:", izinAdmin); // Output: 7 (Baca, Tulis, Eksekusi)