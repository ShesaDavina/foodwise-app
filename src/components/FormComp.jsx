import React, { useState, useEffect, useRef } from 'react';
import {
  FaAppleAlt,
  FaCarrot,
  FaSnowflake,
  FaBeer,
  FaUtensils,
  FaSeedling,
  FaTags,
  FaPlusCircle
} from 'react-icons/fa';
import { GiMilkCarton } from 'react-icons/gi';
import { MdLocalDrink } from 'react-icons/md';

const TambahMakanan = () => {
  const [formData, setFormData] = useState({
    nama: '',
    kategori: '',
    tanggalBeli: '',
    tanggalKadaluarsa: '',
    jumlah: '',        // tambah field jumlah
    satuan: 'pcs'
  });

  const [errors, setErrors] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSatuanDropdownOpen, setIsSatuanDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const satuanDropdownRef = useRef(null);

  const kategoriOptions = [
    { value: 'buah', label: 'Buah', icon: FaAppleAlt },
    { value: 'sayur', label: 'Sayur', icon: FaCarrot },
    { value: 'frozen', label: 'Frozen Food', icon: FaSnowflake },
    { value: 'minumanKaleng', label: 'Minuman Kaleng', icon: FaBeer },
    { value: 'makananJadi', label: 'Makanan Jadi', icon: FaUtensils },
    { value: 'susu', label: 'Susu', icon: GiMilkCarton },
    { value: 'jus', label: 'Jus', icon: MdLocalDrink },
    { value: 'snack', label: 'Snack', icon: FaSeedling }
  ];

  const satuanOptions = [
    { value: 'pcs', label: 'pcs' },
    { value: 'kg', label: 'kg' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (satuanDropdownRef.current && !satuanDropdownRef.current.contains(event.target)) {
        setIsSatuanDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleKategoriSelect = (value) => {
    setFormData(prev => ({ ...prev, kategori: value }));
    setIsDropdownOpen(false);
    if (errors.kategori) {
      setErrors(prev => ({ ...prev, kategori: '' }));
    }
  };

  const handleSatuanSelect = (value) => {
    setFormData(prev => ({ ...prev, satuan: value }));
    setIsSatuanDropdownOpen(false);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nama.trim()) newErrors.nama = 'Nama makanan wajib diisi';
    if (!formData.kategori) newErrors.kategori = 'Pilih kategori';
    if (!formData.tanggalBeli) newErrors.tanggalBeli = 'Tanggal beli wajib diisi';
    if (!formData.tanggalKadaluarsa) newErrors.tanggalKadaluarsa = 'Tanggal kadaluarsa wajib diisi';
    if (!formData.jumlah) newErrors.jumlah = 'Jumlah wajib diisi';
    if (formData.jumlah && isNaN(formData.jumlah)) newErrors.jumlah = 'Jumlah harus berupa angka';

    if (formData.tanggalBeli && formData.tanggalKadaluarsa) {
      if (new Date(formData.tanggalKadaluarsa) < new Date(formData.tanggalBeli)) {
        newErrors.tanggalKadaluarsa = 'Tanggal kadaluarsa tidak boleh sebelum tanggal beli';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const totalDisplay = `${formData.jumlah} ${formData.satuan}`;
      console.log('Data makanan:', { ...formData, total: totalDisplay });
      alert(`✅ Makanan berhasil ditambahkan!\nTotal: ${formData.jumlah} ${formData.satuan}`);
    }
  };

  const getSelectedKategoriIcon = () => {
    const selected = kategoriOptions.find(opt => opt.value === formData.kategori);
    return selected ? selected.icon : FaTags;
  };
  const SelectedIcon = getSelectedKategoriIcon();
  const selectedKategoriLabel = kategoriOptions.find(opt => opt.value === formData.kategori)?.label;

  return (
    <div className="w-full max-w-5xl h-full p-6 overflow-auto">
      <div className="max-w-3xl mx-auto">
        <div className="mb-5">
          <div className="md:my-6 mt-16 md:mt-6 mb-8">
            <h1
              className="text-2xl text-[#2e5b4e]"
              style={{ fontFamily: "'Bowlby One', cursive" }}
            >
              Tambah Makanan / Minuman
            </h1>
          </div>
        </div>

        <div className="bg-gradient-to-b from-[#FFF7ED] to-white rounded-2xl shadow-md overflow-hidden">
          <form onSubmit={handleSubmit} className="px-7 py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-[#1F2D3B] text-sm mb-1.5" >
                  Nama makanan
                </label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  placeholder="Makanan / Minuman"
                  className={`w-full px-4 py-2.5 bg-white border rounded-xl outline-none transition-all focus:border-[#2F5D56] text-sm ${errors.nama ? 'border-red-400' : 'border-gray-300'
                    }`}

                />
                {errors.nama && <p className="text-red-500 text-xs mt-1">{errors.nama}</p>}
              </div>

              <div>
                <label className="block text-[#1F2D3B] text-sm mb-1.5" >
                  Kategori
                </label>
                <div className="relative" ref={dropdownRef}>
                  <div
                    className={`w-full px-4 py-2.5 bg-white border rounded-xl flex items-center justify-between cursor-pointer transition-all ${errors.kategori ? 'border-red-400' : 'border-gray-300'
                      } hover:border-[#2F5D56]`}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <div className="flex items-center gap-2 text-sm" >
                      {formData.kategori ? (
                        <>
                          <SelectedIcon className="text-[#2F5D56] text-sm" />
                          <span>{selectedKategoriLabel}</span>
                        </>
                      ) : (
                        <span className="text-gray-400">Pilih</span>
                      )}
                    </div>
                    <svg className={`w-4 h-4 text-[#2F5D56] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {isDropdownOpen && (
                    <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                      {kategoriOptions.map((option) => (
                        <div
                          key={option.value}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#FFE4C7] cursor-pointer transition-colors text-sm"

                          onClick={() => handleKategoriSelect(option.value)}
                        >
                          <option.icon className="text-[#2F5D56] text-sm" />
                          <span>{option.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {errors.kategori && <p className="text-red-500 text-xs mt-1">{errors.kategori}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-[#1F2D3B] text-sm mb-1.5" >
                  Tanggal Beli
                </label>
                <input
                  type="date"
                  name="tanggalBeli"
                  value={formData.tanggalBeli}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 bg-white border rounded-xl outline-none transition-all focus:border-[#2F5D56] text-sm ${errors.tanggalBeli ? 'border-red-400' : 'border-gray-300'
                    }`}

                />
                {errors.tanggalBeli && <p className="text-red-500 text-xs mt-1">{errors.tanggalBeli}</p>}
              </div>
              <div>
                <label className="block text-[#1F2D3B] text-sm mb-1.5" >
                  Tanggal Kadaluarsa
                </label>
                <input
                  type="date"
                  name="tanggalKadaluarsa"
                  value={formData.tanggalKadaluarsa}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 bg-white border rounded-xl outline-none transition-all focus:border-[#2F5D56] text-sm ${errors.tanggalKadaluarsa ? 'border-red-400' : 'border-gray-300'
                    }`}

                />
                {errors.tanggalKadaluarsa && <p className="text-red-500 text-xs mt-1">{errors.tanggalKadaluarsa}</p>}
              </div>
            </div>

            {/* Total Section - Input angka dulu, baru pilih satuan */}
            <div className="mb-7">
              <label className="block text-[#1F2D3B] text-sm mb-1.5" >
                Total
              </label>
              <div className="flex gap-3">
                {/* Input Jumlah Angka */}
                <div className="flex-1">
                  <input
                    type="number"
                    name="jumlah"
                    value={formData.jumlah}
                    onChange={handleChange}
                    placeholder="Jumlah"
                    className={`w-full px-4 py-2.5 bg-white border rounded-xl outline-none transition-all focus:border-[#2F5D56] text-sm ${errors.jumlah ? 'border-red-400' : 'border-gray-300'
                      }`}

                  />
                  {errors.jumlah && <p className="text-red-500 text-xs mt-1">{errors.jumlah}</p>}
                </div>

                {/* Dropdown Satuan */}
                <div className="w-28 relative" ref={satuanDropdownRef}>
                  <div
                    className={`w-full px-4 py-2.5 bg-white border rounded-xl flex items-center justify-between cursor-pointer transition-all ${errors.satuan ? 'border-red-400' : 'border-gray-300'
                      } hover:border-[#2F5D56]`}
                    onClick={() => setIsSatuanDropdownOpen(!isSatuanDropdownOpen)}
                  >
                    <span className="text-sm" >
                      {formData.satuan === 'pcs' ? 'pcs' : 'kg'}
                    </span>
                    <svg className={`w-4 h-4 text-[#2F5D56] transition-transform ${isSatuanDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {isSatuanDropdownOpen && (
                    <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                      {satuanOptions.map((option) => (
                        <div
                          key={option.value}
                          className="px-4 py-2.5 hover:bg-[#FFE4C7] cursor-pointer transition-colors text-sm text-center"

                          onClick={() => handleSatuanSelect(option.value)}
                        >
                          {option.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#2F5D56] hover:bg-[#1F2D3B] text-white py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md"

            >
              <FaPlusCircle className="text-white text-base" />
              Tambah
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TambahMakanan;