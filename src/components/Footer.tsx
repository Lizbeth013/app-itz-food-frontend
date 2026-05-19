export default function Footer() {
  return (
    <div className="bg-orange-500 py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-3xl text-white font-bold tracking-tight">
          AppITZFood.com
        </span>
        <div className="flex flex-col md:flex-row gap-4 text-white text-sm font-medium">
          <a href="#" className="hover:underline hover:text-orange-200 transition-colors">
            Política de privacidad
          </a>
          <span className="hidden md:block text-orange-300">|</span>
          <a href="#" className="hover:underline hover:text-orange-200 transition-colors">
            Términos del servicio
          </a>
        </div>
      </div>
    </div>
  )
}
