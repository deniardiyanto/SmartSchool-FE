// Isi halaman Bantuan. Ubah teks di sini tanpa menyentuh tampilan.
// Hanya fitur yang sudah ada di aplikasi yang boleh dituliskan.

export const CONTACT = {
  name: 'Deni',
  handle: '@ruang_nalar',
};

export const ROLE_GUIDES = [
  {
    icon: '🛠️',
    title: 'Admin Sekolah',
    steps: [
      'Buka Pengaturan dan isi Aturan Presensi (jam masuk dan pulang dalam WIB, toleransi, poin). Scan barcode tidak bisa dipakai sebelum aturan ini disimpan.',
      'Tambahkan siswa di Data Siswa. Kelas dan wali murid harus sudah ada sebelumnya.',
      'Pantau Dashboard: statistik hari ini, rekap presensi, kelas terbaik, dan monitoring peserta didik.',
      'Lihat riwayat kehadiran per tanggal di menu Presensi.',
      'Setelah jam pulang, klik Tutup Hari di menu Presensi supaya siswa yang tidak scan ditandai Alpa.',
      'Unduh rekap bulanan di menu Laporan dalam bentuk Excel.',
    ],
  },
  {
    icon: '📷',
    title: 'Petugas Scan',
    steps: [
      'Scan barcode kartu siswa saat datang. Status Hadir atau Terlambat ditentukan otomatis dari jam scan.',
      'Scan kartu yang sama lagi setelah jam pulang dibuka untuk mencatat jam pulang.',
      'Jika muncul pesan penolakan, baca arti pesannya di bagian Presensi pada FAQ di bawah.',
    ],
    note: 'Halaman Petugas Scan masih dalam pengembangan.',
  },
  {
    icon: '👨‍👩‍👧',
    title: 'Wali Murid',
    steps: [
      'Masuk lewat halaman login wali.',
      'Menu Presensi menampilkan kehadiran anak, dan menu Poin menampilkan poin pelanggarannya.',
      'Menu KAIH dan Profil akan tersedia setelah dikembangkan.',
    ],
    note: 'Halaman Wali Murid masih dalam pengembangan, sehingga tampilannya dapat berubah.',
  },
];

export const FAQ_GROUPS = [
  {
    title: 'Presensi',
    items: [
      {
        q: 'Kapan siswa dihitung Hadir atau Terlambat?',
        a: 'Siswa Hadir jika scan masuk dilakukan sampai Batas Tepat Waktu ditambah Toleransi Terlambat. Setelah itu siswa dihitung Terlambat. Semua jam memakai WIB dan diatur di Pengaturan, bagian Aturan Presensi.',
      },
      {
        q: 'Kenapa muncul pesan "Belum waktunya presensi"?',
        a: 'Scan dilakukan sebelum jam Mulai Masuk. Scan baru diterima setelah jam tersebut tiba.',
      },
      {
        q: 'Kenapa muncul pesan "Belum waktunya pulang"?',
        a: 'Scan kedua (pulang) dilakukan sebelum jam Mulai Pulang. Scan pulang baru diterima setelah jam tersebut tiba.',
      },
      {
        q: 'Apa arti "Attendance hari ini sudah selesai"?',
        a: 'Siswa sudah tercatat masuk dan pulang pada hari itu, sehingga scan berikutnya ditolak.',
      },
      {
        q: 'Apa arti "Siswa sudah ditandai alpa hari ini"?',
        a: 'Hari tersebut sudah ditutup lewat Tutup Hari dan siswa belum scan sebelumnya, sehingga tercatat Alpa. Scan sesudahnya ditolak. Hubungi admin untuk mengoreksi presensi.',
      },
      {
        q: 'Apa arti pesan "Barcode tidak ditemukan", "tidak aktif", atau "expired"?',
        a: 'Barcode belum terdaftar, sudah dinonaktifkan, atau sudah melewati tanggal kedaluwarsa. Hubungi admin untuk memeriksa data kartu siswa.',
      },
      {
        q: 'Apa itu Tutup Hari?',
        a: 'Tombol di menu Presensi yang menandai Alpa semua siswa aktif yang belum punya presensi pada tanggal terpilih, lengkap dengan poin Alpa dari Pengaturan. Aman diulang karena siswa yang sudah punya presensi dilewati.',
      },
      {
        q: 'Kenapa Tutup Hari ditolak?',
        a: 'Ada tiga kemungkinan: hari ini belum melewati jam Mulai Pulang, tanggalnya belum punya satu pun presensi (dianggap bukan hari efektif), atau tanggalnya di masa depan.',
      },
    ],
  },
  {
    title: 'Poin dan status siswa',
    items: [
      {
        q: 'Apa arti poin pelanggaran?',
        a: 'Semakin besar poin, semakin banyak pelanggaran. Poin bertambah, misalnya saat siswa terlambat, sesuai nilai di Aturan Presensi. Koreksi bernilai negatif mengurangi total, dan total tidak pernah di bawah 0.',
      },
      {
        q: 'Apa arti status Aktif, Peringatan, dan Pembinaan?',
        a: 'Status ditentukan dari total poin pelanggaran siswa. Di bawah batas Peringatan berstatus Aktif, mulai batas Peringatan berstatus Peringatan, dan mulai batas Pembinaan berstatus Pembinaan. Jika belum diubah, batasnya 15 dan 25. Batas ini dapat diatur di Pengaturan, bagian Ambang Status Siswa.',
      },
      {
        q: 'Bagaimana persentase presensi di Dashboard dihitung?',
        a: 'Jumlah hari Hadir ditambah Terlambat dalam bulan berjalan, dibagi hari efektif. Hari efektif adalah tanggal yang punya data presensi.',
      },
      {
        q: 'Apa arti "Belum tercatat" pada Rekap Presensi?',
        a: 'Jumlah siswa aktif yang belum punya data presensi hari itu.',
      },
    ],
  },
  {
    title: 'KAIH',
    items: [
      {
        q: 'Apa itu KAIH?',
        a: '7 Kebiasaan Anak Indonesia Hebat: bangun pagi, beribadah, berolahraga, makan sehat, belajar, bermasyarakat, dan tidur cepat.',
      },
      {
        q: 'Kenapa angka KAIH masih 0%?',
        a: 'Fitur pengisian KAIH belum tersedia di aplikasi, jadi belum ada data yang bisa dihitung.',
      },
    ],
  },
  {
    title: 'Laporan',
    items: [
      {
        q: 'Bagaimana mengunduh laporan ke Excel?',
        a: 'Buka menu Laporan, pilih tab (Presensi, Poin Pelanggaran, atau KAIH), atur periode dan kelas, lalu klik Ekspor Excel. Semua baris pada filter itu ikut diunduh, bukan hanya halaman yang tampil. Tombol CSV tersedia untuk format teks.',
      },
      {
        q: 'Kenapa laporan Poin Pelanggaran tidak memuat semua siswa?',
        a: 'Laporan ini hanya menampilkan siswa yang punya poin pelanggaran lebih dari 0 pada periode terpilih.',
      },
    ],
  },
  {
    title: 'Data siswa',
    items: [
      {
        q: 'Kenapa saya tidak bisa menambah siswa?',
        a: 'Form membutuhkan kelas dan wali murid. Pastikan keduanya sudah terdaftar, lalu isi semua kolom yang wajib.',
      },
    ],
  },
];
