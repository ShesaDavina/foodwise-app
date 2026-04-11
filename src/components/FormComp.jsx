import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  FaAppleAlt,
  FaCarrot,
  FaSnowflake,
  FaBeer,
  FaUtensils,
  FaSeedling,
  FaTags,
  FaPlusCircle,
  FaDrumstickBite
} from 'react-icons/fa';
import { GiMilkCarton } from 'react-icons/gi';
import { MdLocalDrink } from 'react-icons/md';

const FormComp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    kategori: '',
    tanggalBeli: '',
    tanggalKadaluarsa: '',
    jumlah: '',
    satuan: 'pcs'
  });

  const [errors, setErrors] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSatuanDropdownOpen, setIsSatuanDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const satuanDropdownRef = useRef(null);

  // Kategori options sesuai dengan database
  const kategoriOptions = [
    { value: 'Frozen', label: 'Frozen', icon: FaSnowflake },
    { value: 'Buah', label: 'Buah', icon: FaAppleAlt },
    { value: 'Sayur', label: 'Sayur', icon: FaCarrot },
    { value: 'Daging', label: 'Daging', icon: FaDrumstickBite },
    { value: 'Masakan jadi', label: 'Masakan Jadi', icon: FaUtensils },
    { value: 'Minuman Kaleng', label: 'Minuman Kaleng', icon: FaBeer },
    { value: 'Susu', label: 'Susu', icon: GiMilkCarton },
    { value: 'Jus', label: 'Jus', icon: MdLocalDrink },
    { value: 'Snack', label: 'Snack', icon: FaSeedling }
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
    if (!formData.jumlah) newErrors.jumlah = 'Jumlah wajib diisi';
    if (formData.jumlah && isNaN(formData.jumlah)) newErrors.jumlah = 'Jumlah harus berupa angka';
    if (parseInt(formData.jumlah) < 1) newErrors.jumlah = 'Jumlah minimal 1';

    if (formData.tanggalBeli && formData.tanggalKadaluarsa) {
      if (new Date(formData.tanggalKadaluarsa) < new Date(formData.tanggalBeli)) {
        newErrors.tanggalKadaluarsa = 'Tanggal kadaluarsa tidak boleh sebelum tanggal beli';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    // Siapkan data untuk backend - langsung pakai value kategori
    const payload = {
      nama: formData.nama,
      jenis: formData.kategori, // Langsung pakai value dari dropdown
      tanggal_beli: formData.tanggalBeli,
      tanggal_kadaluarsa: formData.tanggalKadaluarsa || null,
      jumlah: parseInt(formData.jumlah),
      satuan: formData.satuan
    };

    console.log('Sending payload:', payload);

    try {
      const response = await axios.post('http://localhost:8000/api/foods', payload);
      console.log('Response:', response.data);
      
      alert(`✅ ${response.data.message}\nTotal: ${formData.jumlah} ${formData.satuan}`);
      
      // Reset form
      setFormData({
        nama: '',
        kategori: '',
        tanggalBeli: '',
        tanggalKadaluarsa: '',
        jumlah: '',
        satuan: 'pcs'
      });
      
      // Redirect ke halaman SemuaData setelah 1 detik
      setTimeout(() => {
        navigate('/foods');
      }, 1000);
      
    } catch (error) {
      console.error('Error details:', error.response || error);
      
      if (error.response && error.response.data && error.response.data.errors) {
        const backendErrors = error.response.data.errors;
        const newErrors = {};
        
        if (backendErrors.nama) newErrors.nama = backendErrors.nama[0];
        if (backendErrors.jenis) newErrors.kategori = backendErrors.jenis[0];
        if (backendErrors.tanggal_beli) newErrors.tanggalBeli = backendErrors.tanggal_beli[0];
        if (backendErrors.tanggal_kadaluarsa) newErrors.tanggalKadaluarsa = backendErrors.tanggal_kadaluarsa[0];
        if (backendErrors.jumlah) newErrors.jumlah = backendErrors.jumlah[0];
        
        setErrors(newErrors);
        alert('Gagal menambahkan makanan. Silakan periksa kembali form Anda.');
      } else if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert('Gagal menambahkan makanan. Silakan coba lagi.');
      }
    } finally {
      setLoading(false);
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
                <label className="block text-[#1F2D3B] text-sm mb-1.5">
                  Nama makanan
                </label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  placeholder="Makanan / Minuman"
                  disabled={loading}
                  className={`w-full px-4 py-2.5 bg-white border rounded-xl outline-none transition-all focus:border-[#2F5D56] text-sm ${errors.nama ? 'border-red-400' : 'border-gray-300'
                    } disabled:opacity-50`}
                />
                {errors.nama && <p className="text-red-500 text-xs mt-1">{errors.nama}</p>}
              </div>

              <div>
                <label className="block text-[#1F2D3B] text-sm mb-1.5">
                  Kategori
                </label>
                <div className="relative" ref={dropdownRef}>
                  <div
                    className={`w-full px-4 py-2.5 bg-white border rounded-xl flex items-center justify-between cursor-pointer transition-all ${errors.kategori ? 'border-red-400' : 'border-gray-300'
                      } hover:border-[#2F5D56] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => !loading && setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <div className="flex items-center gap-2 text-sm">
                      {formData.kategori ? (
                        <>
                          <SelectedIcon className="text-[#2F5D56] text-sm" />
                          <span>{selectedKategoriLabel}</span>
                        </>
                      ) : (
                        <span className="text-gray-400">Pilih Kategori</span>
                      )}
                    </div>
                    <svg className={`w-4 h-4 text-[#2F5D56] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {isDropdownOpen && !loading && (
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
                <label className="block text-[#1F2D3B] text-sm mb-1.5">
                  Tanggal Beli
                </label>
                <input
                  type="date"
                  name="tanggalBeli"
                  value={formData.tanggalBeli}
                  onChange={handleChange}
                  disabled={loading}
                  className={`w-full px-4 py-2.5 bg-white border rounded-xl outline-none transition-all focus:border-[#2F5D56] text-sm ${errors.tanggalBeli ? 'border-red-400' : 'border-gray-300'
                    } disabled:opacity-50`}
                />
                {errors.tanggalBeli && <p className="text-red-500 text-xs mt-1">{errors.tanggalBeli}</p>}
              </div>
              <div>
                <label className="block text-[#1F2D3B] text-sm mb-1.5">
                  Tanggal Kadaluarsa (Opsional)
                </label>
                <input
                  type="date"
                  name="tanggalKadaluarsa"
                  value={formData.tanggalKadaluarsa}
                  onChange={handleChange}
                  disabled={loading}
                  className={`w-full px-4 py-2.5 bg-white border rounded-xl outline-none transition-all focus:border-[#2F5D56] text-sm ${errors.tanggalKadaluarsa ? 'border-red-400' : 'border-gray-300'
                    } disabled:opacity-50`}
                />
                {errors.tanggalKadaluarsa && <p className="text-red-500 text-xs mt-1">{errors.tanggalKadaluarsa}</p>}
              </div>
            </div>

            {/* Total Section */}
            <div className="mb-7">
              <label className="block text-[#1F2D3B] text-sm mb-1.5">
                Total
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <input
                    type="number"
                    name="jumlah"
                    value={formData.jumlah}
                    onChange={handleChange}
                    placeholder="Jumlah"
                    disabled={loading}
                    className={`w-full px-4 py-2.5 bg-white border rounded-xl outline-none transition-all focus:border-[#2F5D56] text-sm ${errors.jumlah ? 'border-red-400' : 'border-gray-300'
                      } disabled:opacity-50`}
                  />
                  {errors.jumlah && <p className="text-red-500 text-xs mt-1">{errors.jumlah}</p>}
                </div>

                <div className="w-28 relative" ref={satuanDropdownRef}>
                  <div
                    className={`w-full px-4 py-2.5 bg-white border rounded-xl flex items-center justify-between cursor-pointer transition-all ${errors.satuan ? 'border-red-400' : 'border-gray-300'
                      } hover:border-[#2F5D56] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => !loading && setIsSatuanDropdownOpen(!isSatuanDropdownOpen)}
                  >
                    <span className="text-sm">
                      {formData.satuan === 'pcs' ? 'pcs' : 'kg'}
                    </span>
                    <svg className={`w-4 h-4 text-[#2F5D56] transition-transform ${isSatuanDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {isSatuanDropdownOpen && !loading && (
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
              disabled={loading}
              className="w-full bg-[#2F5D56] hover:bg-[#1F2D3B] text-white py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaPlusCircle className="text-white text-base" />
              {loading ? 'Menyimpan...' : 'Tambah'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormComp;