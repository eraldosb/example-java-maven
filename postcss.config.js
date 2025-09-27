export default {
  plugins: {
    // Plugin para Tailwind CSS
    tailwindcss: {},
    
    // Plugin para Autoprefixer
    autoprefixer: {},
    
    // Plugin para CSSnano (apenas em produção)
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
  },
}
