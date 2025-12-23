// File: src/admin/vite.config.js

const vite = require('vite');

module.exports = (config) => {
  // Penting: Selalu kembalikan config yang sudah dimodifikasi
  return vite.mergeConfig(config, {
    // BAGIAN 1: Konfigurasi Bawaan (Alias)
    resolve: {
      alias: {
        '@': '/src',
      },
    },

    // BAGIAN 2: Konfigurasi Tambahan (Untuk Ngrok)
    server: {
      // Masukkan URL Ngrok Anda di sini
      allowedHosts: ['starr-unwindowed-unboldly.ngrok-free.dev'],
    },
  });
};