let A = 128; // 10000000
let R = 255; // 11111111
let G = 105; // 01101001
let B = 180; // 10110100

// 1. Geser A ke kiri 24 bit (ke posisi Alpha)
//    (A << 24) -> 10000000 00000000 00000000 00000000

// 2. Geser R ke kiri 16 bit (ke posisi Red)
//    (R << 16) -> 00000000 11111111 00000000 00000000

// 3. Geser G ke kiri 8 bit (ke posisi Green)
//    (G <<  8) -> 00000000 00000000 01101001 00000000

// 4. B tidak perlu digeser (sudah di posisi Blue)
//    (B)       -> 00000000 00000000 00000000 10110100

// 5. Gabungkan semuanya dengan OR (|)
let warnaFinal = (A << 24) | (R << 16) | (G << 8) | B;

/*
  10000000 00000000 00000000 00000000
| 00000000 11111111 00000000 00000000
| 00000000 00000000 01101001 00000000
| 00000000 00000000 00000000 10110100
---------------------------------------
  10000000 11111111 01101001 10110100
*/

// warnaFinal sekarang adalah satu angka 32-bit (2164228532)
// yang siap dikirim ke kartu grafis.
console.log(warnaFinal);