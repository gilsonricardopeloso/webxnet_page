import { Code, Globe, Shield } from "lucide-react"

const Services = () => {
  const services = [
    {
      icon: <Globe className="w-12 h-12 text-primary" />,
      title: "Desenvolvimento Web",
      description:
        "Sites responsivos e aplicações web modernas com as melhores tecnologias do mercado.",
    },
    {
      icon: <Code className="w-12 h-12 text-primary" />,
      title: "Soluções Personalizadas",
      description:
        "Sistemas sob medida para atender às necessidades específicas do seu negócio.",
    },
    {
      icon: <Shield className="w-12 h-12 text-primary" />,
      title: "Segurança Digital",
      description:
        "Implementação de práticas seguras e proteção de dados em todos os projetos.",
    },
  ]

  return (
    <section id="services" className="py-20 bg-white">
      <div className="mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary">
            Nossos Serviços
          </h2>
          <p className="mt-6 text-lg text-gray-600">
            Soluções completas para sua presença digital
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-center">{service.icon}</div>
              <h3 className="mt-4 text-xl font-semibold text-secondary text-center">
                {service.title}
              </h3>
              <p className="mt-2 text-gray-600 text-center">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
