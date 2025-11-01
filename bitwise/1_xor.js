/**
 * Fungsi untuk menemukan satu angka unik dalam array
 * di mana semua angka lain muncul dua kali.
 */

function temukanAngkaUnik(arr) {
  let hasilXOR = 0;

  for (let i = 0; i < arr.length; i++) {
    hasilXOR = hasilXOR ^ arr[i];
    
    // Logika proses:
    // Iterasi 1: hasilXOR = 0 ^ 2  (hasil = 2)
    // Iterasi 2: hasilXOR = 2 ^ 6  (hasil = 4)
    // Iterasi 3: hasilXOR = 4 ^ 4  (hasil = 0)  <- 4 saling membatalkan
    // Iterasi 4: hasilXOR = 0 ^ 8  (hasil = 8)
    // Iterasi 5: hasilXOR = 8 ^ 2  (hasil = 10)
    // Iterasi 6: hasilXOR = 10 ^ 4 (hasil = 14)
    // Iterasi 7: hasilXOR = 14 ^ 6 (hasil = 8) <- (urutan tidak masalah, hasil akhirnya sama)
  }

  return hasilXOR;
}

const angka = [2, 6, 4, 8, 2, 4, 6, 7, 8];

const unik = temukanAngkaUnik(angka);
console.log("Angka uniknya adalah:", unik); // Output: Angka uniknya adalah: 7