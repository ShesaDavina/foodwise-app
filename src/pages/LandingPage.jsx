import NavComp from "../components/NavComp";
import Footer from "../components/FooterComp";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#2F5D56]">
      <NavComp />

      {/* HERO SECTION */}
      <section id="hero" className="relative flex flex-col items-center justify-center min-h-[500px] py-12 overflow-hidden bg-white">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Ring 1 */}
          <div className="absolute w-[550px] h-[550px] border border-[#2F5D56] border-opacity-20 rounded-full animate-[spin_25s_linear_infinite_reverse]">
            <img
              src="/public/images/hero/corn.jpeg"
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full border-2 border-white shadow-lg"
              alt=""
            />
            <img
              src="/public/images/hero/write.jpeg"
              className="absolute top-[75%] right-[2%] -translate-y-1/2 w-10 h-10 rounded-full border-4 border-white shadow-lg"
              alt=""
            />
            <img
              src="/public/images/hero/bowl.jpeg"
              className="absolute top-[75%] left-[2%] -translate-y-1/2 w-10 h-10 rounded-full border-2 border-white shadow-lg"
              alt=""
            />
          </div>

          {/* Ring 2 */}
          <div className="absolute w-[670px] h-[670px] border border-[#2F5D56] border-opacity-10 rounded-full animate-[spin_35s_linear_infinite]">
            <img
              src="/public/images/hero/salad.jpeg"
              className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-2 border-white shadow-lg"
              alt=""
            />
            <img
              src="/public/images/hero/calendar.jpeg"
              className="absolute top-[10%] right-[20%] translate-x-1/2 -translate-y-1/2 w-13 h-13 rounded-full border-4 border-white shadow-xl"
              alt=""
            />
            <img
              src="/public/images/hero/strawberry.jpeg"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-11 h-11 rounded-full border-2 border-white shadow-lg"
              alt=""
            />
          </div>

          {/* Ring 3 */}
          <div className="absolute w-[800px] h-[800px] border border-[#2F5D56] border-opacity-5 rounded-full animate-[spin_50s_linear_infinite_reverse]">
            <img
              src="/public/images/hero/milk.jpeg"
              className="absolute top-[10%] right-[15%] w-10 h-10 rounded-full border-4 border-white shadow-lg object-cover"
              alt=""
            />
            <img
              src="/public/images/hero/juice.jpeg"
              className="absolute bottom-[12%] left-[10%] w-14 h-14 rounded-full border-4 border-white shadow-lg object-cover"
              alt=""
            />
            <img
              src="/public/images/hero/waste.jpeg"
              className="absolute top-[13%] left-[10%] w-12 h-12 rounded-full border-2 border-white shadow-lg object-cover"
              alt=""
            />
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center max-w-2xl px-6 flex flex-col items-center"
        >
          <h1 className="text-4xl md:text-4xl font-black text-[#F59E0B] leading-tight mb-4 drop-shadow-md">
            Cara Cerdas <br />
            <span className="text-[#2F5D56]">Mengelola Makanan</span>
          </h1>
          <p className="text-[#2F5D56] text-opacity-80 text-base mb-8 leading-relaxed max-w-sm font-medium">
            FoodWise membantumu mencatat belanjaan, memantau tanggal
            kedaluwarsa, dan mengirimkan pengingat agar tidak ada yang terbuang
            percuma.
          </p>
          <Link to="/signup" className="group relative bg-[#2F5D56] text-white px-8 py-2 rounded-full font-bold text-xl overflow-hidden transition-all shadow-2xl hover:shadow-[#2F5D56]/40 active:scale-95">
            <span className="relative z-10">Mulai Tracking</span>
            <div className="absolute inset-0 bg-[#F59E0B] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"></div>
          </Link>
        </motion.div>
      </section>

      {/* APA ITU FOODWISE SECTION */}
      <section id="about" className="max-w-7xl mx-auto px-6 md:px-12 overflow-hidden">
        <section className="py-12 grid md:grid-cols-2 gap-16 items-center relative">
          <motion.div
            animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-10 left-10 w-20 h-20 bg-[#F59E0B]/10 rounded-full blur-3xl"
          />

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-left relative z-10"
          >
            <h2 className="text-3xl md:text-4xl font-black text-[#2F5D56] mb-6 leading-[1.2]">
              Apa Itu <span className="text-[#F59E0B]">FoodWise?</span>
            </h2>
            <p className="text-[#2F5D56]/80 leading-relaxed text-lg md:text-1xl text-justify mb-4">
              FoodWise merupakan aplikasi berbasis web yang dikembangkan untuk
              membantu pengguna dalam mengelola persediaan makanan secara
              efektif. Sistem ini memungkinkan pengguna untuk mencatat, memantau
              tanggal kedaluwarsa, serta menerima notifikasi pengingat.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative flex justify-center items-center group"
          >
            <motion.div
              animate={{ rotate: [-2, 2, -2] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute bg-[#F59E0B] w-[90%] h-[85%] shadow-2xl"
              style={{ borderRadius: "60px 20px 80px 40px" }}
            />
            <div className="overflow-hidden rounded-[45px] relative z-10 shadow-2xl border-4 border-white">
              <img
                src="/public/images/apaitu.jpeg"
                alt="Food Prep"
                className="w-full max-w-[400px] aspect-[4/3] object-cover"
              />
            </div>
          </motion.div>
        </section>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          className="h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-8"
        />
      </section>

      {/* KENAPA PENGELOLAAN PENTING */}
      <section id="reasons" className="py-12 bg-white overflow-hidden px-3">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-black text-[#2F5D56] leading-tight">
              Kenapa Pengelolaan <br />
              <span className="text-[#F59E0B]">Makanan Itu Penting?</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.3 },
              },
            }}
            className="grid md:grid-cols-3 gap-12"
          >
            {/* CARD 1: HEMAT BIAYA */}
            <motion.div
              variants={{
                hidden: { y: 30, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.8 } },
              }}
              className="flex flex-col items-center text-center group"
            >
              <div className="relative w-56 h-56 mb-6 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#F59E0B]/30" />
                <div className="relative w-40 h-40 rounded-full overflow-hidden z-10 shadow-2xl border-4 border-white group-hover:border-[#F59E0B]/30 transition-all duration-500">
                  <img
                    src="/images/reason/hematbiaya.jpeg"
                    className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-700"
                    alt="Hemat Biaya"
                  />
                </div>
                <div className="absolute w-32 h-32 bg-[#F59E0B]/5 blur-3xl rounded-full -z-10 group-hover:bg-[#F59E0B]/15 transition-all" />
              </div>
              <h3 className="text-2xl font-bold text-[#2F5D56] mb-2 group-hover:text-[#F59E0B] transition-colors">
                Hemat Biaya
              </h3>
              <p className="text-gray-500 leading-relaxed text-sm md:text-base px-4">
                Pengolahan yang baik mencegah pemborosan uang akibat membuang
                bahan makanan yang rusak atau kedaluwarsa.
              </p>
            </motion.div>

            {/* CARD 2: JAGA LINGKUNGAN */}
            <motion.div
              variants={{
                hidden: { y: 30, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.8 } },
              }}
              className="flex flex-col items-center text-center group"
            >
              <div className="relative w-56 h-56 mb-6 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#F59E0B]/30" />
                <div className="relative w-40 h-40 rounded-full overflow-hidden z-10 shadow-2xl border-4 border-white group-hover:border-[#F59E0B]/30 transition-all duration-500">
                  <img
                    src="/images/reason/jagalingkungan.jpeg"
                    className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-700"
                    alt="Jaga Lingkungan"
                  />
                </div>
                <div className="absolute w-32 h-32 bg-[#F59E0B]/5 blur-3xl rounded-full -z-10 group-hover:bg-[#F59E0B]/15 transition-all" />
              </div>
              <h3 className="text-2xl font-bold text-[#2F5D56] mb-2 group-hover:text-[#F59E0B] transition-colors">
                Jaga Lingkungan
              </h3>
              <p className="text-gray-500 leading-relaxed text-sm md:text-base px-4">
                Mengurangi sampah makanan akan meminimalisir produksi gas metana
                di TPA yang menjadi pemicu pemanasan global.
              </p>
            </motion.div>

            {/* CARD 3: KONSERVASI SUMBER DAYA */}
            <motion.div
              variants={{
                hidden: { y: 30, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.8 } },
              }}
              className="flex flex-col items-center text-center group"
            >
              <div className="relative w-56 h-56 mb-6 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#F59E0B]/30" />
                <div className="relative w-40 h-40 rounded-full overflow-hidden z-10 shadow-2xl border-4 border-white group-hover:border-[#F59E0B]/30 transition-all duration-500">
                  <img
                    src="/images/reason/konservasi.jpeg"
                    className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-700"
                    alt="Konservasi Sumber Daya"
                  />
                </div>
                <div className="absolute w-32 h-32 bg-[#F59E0B]/5 blur-3xl rounded-full -z-10 group-hover:bg-[#F59E0B]/15 transition-all" />
              </div>
              <h3 className="text-2xl font-bold text-[#2F5D56] mb-2 group-hover:text-[#F59E0B] transition-colors">
                Konservasi Sumber Daya
              </h3>
              <p className="text-gray-500 leading-relaxed text-sm md:text-base px-4">
                Langkah ini membantu menyelamatkan air, lahan, dan energi yang
                telah digunakan dalam seluruh proses produksi pangan.
              </p>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "100%", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
            className="h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-12"
          />
        </div>
      </section>

      {/* PANDUAN */}
      <section id="guidelines" className="py-12 md:py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-11">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-center mb-8 md:mb-12 text-[#2F5D56]"
          >
            Panduan
          </motion.h2>

          <div className="bg-[#fdf8f1] rounded-[30px] md:rounded-[40px] p-6 md:p-14 shadow-sm relative border border-gray-100">
            <div className="relative mb-8 md:mb-12">
              <div className="hidden md:block absolute top-6 left-[12.5%] right-[12.5%] h-1.5 bg-gray-200 z-0">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  viewport={{ once: true }}
                  className="h-full bg-[#2F5D56]"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 relative z-10">
                {/* Step 1 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-[#2F5D56] text-white flex items-center justify-center font-bold text-xl mb-4 md:mb-6 shadow-md border-4 border-[#fdf8f1]">
                    1
                  </div>
                  <h4 className="font-black text-[#2F5D56] text-lg mb-2">
                    Step 1
                  </h4>
                  <p className="text-gray-600 text-sm font-medium px-4 md:px-2">
                    Buat akun menggunakan email aktif
                  </p>
                </motion.div>

                {/* Step 2 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-[#4A726C] text-white flex items-center justify-center font-bold text-xl mb-4 md:mb-6 shadow-md border-4 border-[#fdf8f1]">
                    2
                  </div>
                  <h4 className="font-black text-[#2F5D56] text-lg mb-2">
                    Step 2
                  </h4>
                  <p className="text-gray-600 text-sm font-medium px-4 md:px-2">
                    Tambahkan list makanan yang ingin anda kelola
                  </p>
                </motion.div>

                {/* Step 3 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-[#8EA7A3] text-white flex items-center justify-center font-bold text-xl mb-4 md:mb-6 shadow-md border-4 border-[#fdf8f1]">
                    3
                  </div>
                  <h4 className="font-black text-[#2F5D56] text-lg mb-2">
                    Step 3
                  </h4>
                  <p className="text-gray-600 text-sm font-medium px-4 md:px-2">
                    Terima peringatan kadaluarsa dari Google Kalender
                  </p>
                </motion.div>

                {/* Step 4 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-[#C1CDCB] text-white flex items-center justify-center font-bold text-xl mb-4 md:mb-6 shadow-md border-4 border-[#fdf8f1]">
                    4
                  </div>
                  <h4 className="font-black text-[#2F5D56] text-lg mb-2">
                    Step 4
                  </h4>
                  <p className="text-gray-600 text-sm font-medium px-4 md:px-2">
                    Hapus makanan dari list jika sudah habis
                  </p>
                </motion.div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#2F5D56] rounded-[25px] md:rounded-[30px] p-5 md:p-10 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 shadow-2xl"
            >
              <div className="aspect-[4/5] bg-white rounded-xl md:rounded-2xl overflow-hidden border-2 md:border-4 border-[#2F5D56] group relative">
                <img
                  src="/images/guide/daftar.png"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt="Daftar Akun"
                />
              </div>

              <div className="aspect-[4/5] bg-white rounded-xl md:rounded-2xl overflow-hidden border-2 md:border-4 border-[#2F5D56] group relative">
                <img
                  src="/images/guide/tambah.png"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt="Tambah Makanan"
                />
              </div>

              <div className="aspect-[4/5] bg-white rounded-xl md:rounded-2xl overflow-hidden border-2 md:border-4 border-[#2F5D56] group relative">
                <img
                  src="/images/guide/calendar.png"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt="Notifikasi Kalender"
                />
              </div>

              <div className="aspect-[4/5] bg-white rounded-xl md:rounded-2xl overflow-hidden border-2 md:border-4 border-[#2F5D56] group relative">
                <img
                  src="/images/guide/delete.png"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt="Kelola List"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}