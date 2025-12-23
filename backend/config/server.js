// Path: config/server.ts (atau .js)

export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  // TAMBAHKAN BARIS 'url' INI:
  // Ganti link di bawah dengan link ngrok Anda yang sedang aktif sekarang
  url: env('PUBLIC_URL', 'https://starr-unwindowed-unboldly.ngrok-free.dev'),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});