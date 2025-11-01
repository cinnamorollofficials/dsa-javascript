// warnaFinal = 2164228532 (biner: 10000000 11111111 01101001 10110100)
let warnaFinal = 2164228532;

// 1. Geser nilai Red (11111111) ke posisi paling kanan
let redShifted = warnaFinal >> 16;
// redShifted sekarang: 10000000 11111111 (binernya)
//                     (Nilai A) (Nilai R)

// 2. Kita hanya mau 8 bit terakhir (nilai R). Kita 'mask' dengan 0xFF
let redValue = redShifted & 0xFF; // 0xFF = 255 = 11111111
/*
  ...10000000 11111111  (redShifted)
& ...00000000 11111111  (Mask 0xFF)
-----------------------
  ...00000000 11111111  (Hasil: 255)
*/

console.log(redValue); // Output: 255