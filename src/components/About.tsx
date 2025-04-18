export default function About() {
  return (
    <section
      id="about"
      className="py-20 inset-0 bg-gradient-to-r from-blue-100 to-indigo-200 -z-10"
    >
      <div className="mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary">
              Sobre a Webxnet
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Somos uma empresa especializada em desenvolvimento web e soluções
              digitais, com anos de experiência no mercado brasileiro.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              Nossa missão é transformar ideias em realidade através da
              tecnologia, oferecendo soluções inovadoras e personalizadas para
              cada cliente, com a utilização de IA's.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-primary">100+</div>
                <div className="text-gray-600">Projetos Entregues</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-gray-600">Clientes Satisfeitos</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
              alt="Code on screen"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
