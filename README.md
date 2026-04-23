# FoodWise Frontend

## Deskripsi
FoodWise adalah aplikasi berbasis web yang membantu pengguna mencatat stok makanan, memantau masa kedaluwarsa, dan mendapatkan pengingat otomatis melalui integrasi Google Calendar.

---

## Alur Penggunaan Aplikasi

1. **Homepage**
   - Halaman awal aplikasi

2. **Login**
   - Login hanya menggunakan Google
   - Tidak ada proses sign up
   - Setelah login, user langsung masuk ke sistem

3. **Dashboard**
   - Menampilkan:
     - Statistik makanan
     - Chart makanan terbuang
     - Daftar makanan yang hampir kedaluwarsa

4. **Halaman Data Makanan**
   - Menampilkan seluruh data makanan
   - Pagination (10 data per halaman)
   - Filter:
     - Semua
     - Hampir kedaluwarsa
   - Setiap data dapat dilihat detailnya

5. **Tambah Makanan**
   - Input:
     - Nama makanan
     - Jenis
     - Tanggal beli
     - Tanggal kedaluwarsa
     - Jumlah & satuan
   - Khusus buah & sayur:
     - Tanggal kedaluwarsa otomatis (3 hari setelah beli)
   - Integrasi Google Calendar:
     - Reminder 3 hari sebelum kedaluwarsa
     - Buah & sayur: reminder di hari kedaluwarsa

6. **Detail Makanan**
   - Menampilkan:
     - Nama makanan
     - Jenis
     - Tanggal beli
     - Tanggal kedaluwarsa
     - Jumlah
     - Status:
       - Aman
       - Hampir kedaluwarsa
       - Kedaluwarsa
   - Aksi:
     - Sudah dikonsumsi
     - Dibuang
     - Ingatkan lagi (reminder ulang H+1)

7. **Presentasi Bulanan**
   - Menampilkan chart food waste per bulan

---

## Fitur Utama
- Login dengan Google
- Dashboard interaktif
- Manajemen data makanan (CRUD)
- Sistem pengingat otomatis
- Filter makanan hampir kedaluwarsa
- Statistik dan visualisasi data

---

## Teknologi
- React
- Axios
- Tailwind CSS (opsional, jika digunakan)

---

## Cara Menjalankan Project

### 1. Clone Repository
```bash
git clone <link-repo-frontend>
cd FoodWise-Frontend
```

### 2. Install Dependency
```bash
npm install
```
### 3. Jalankan Aplikasi
```bash
npm run dev
```

---

## Aplikasi akan berjalan di:
```bash
http://localhost:5173
```

---

## Konfigurasi API
Aplikasi menggunakan konfigurasi Axios instance untuk menghubungkan ke backend.
Base URL API diatur pada file:
src/utils/axios.js
baseURL: 'http://localhost:8000/api'

---

## Tujuan
Frontend ini dibuat untuk memberikan pengalaman pengguna yang sederhana dan intuitif dalam mengelola stok makanan sehari-hari.
