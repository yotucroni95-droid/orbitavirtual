/*
 * Conteúdo editável do site da Órbita Virtual.
 * Para mudar telefone, Instagram, e-mail, serviços, clientes ou sites,
 * edite somente este arquivo. Campos vazios ("") ficam escondidos no site.
 */
window.ORBITA = {
  whatsapp: "5587981345302",
  whatsappLabel: "(87) 98134-5302",
  instagram: "https://www.instagram.com/orbitavirtual_/",
  email: "yotucroni95@gmail.com",
  location: "Lagoa do Ouro · Pernambuco",

  // Pilares agrupam os serviços na seção "O que fazemos".
  pillars: {
    estrategia: "Estratégia",
    conteudo: "Conteúdo",
    audiovisual: "Audiovisual",
    digital: "Digital"
  },

  services: [
    { name: "Gestão de Redes Sociais", pillar: "conteudo",
      description: "Planejamento de conteúdo, gestão do Instagram, calendário de postagens, legendas e campanhas.",
      tags: ["Instagram", "Calendário", "Legendas"] },
    { name: "Design Gráfico", pillar: "conteudo",
      description: "Artes promocionais, posts, stories, carrosséis, campanhas e materiais institucionais.",
      tags: ["Posts", "Stories", "Encartes"] },
    { name: "Produção de Vídeos", pillar: "audiovisual",
      description: "Vídeos promocionais, institucionais, comerciais, reels e conteúdo para redes sociais.",
      tags: ["Reels", "Comerciais", "Institucional"] },
    { name: "Edição de Vídeos", pillar: "audiovisual",
      description: "Edição profissional, correção de cor, tratamento de áudio e motion graphics.",
      tags: ["Cor", "Áudio", "Motion"] },
    { name: "Fotografia Profissional", pillar: "audiovisual",
      description: "Fotografia de produtos, empresas, eventos e retratos profissionais.",
      tags: ["Produtos", "Empresas", "Retratos"] },
    { name: "Cobertura de Eventos", pillar: "audiovisual",
      description: "Cobertura de shows e eventos comerciais, sociais e corporativos em foto e vídeo.",
      tags: ["Shows", "Corporativo", "Social"] },
    { name: "Criação de Jingles", pillar: "audiovisual",
      description: "Jingles comerciais, músicas promocionais e identidade musical personalizada.",
      tags: ["Jingles", "Spots", "Trilhas"] },
    { name: "Sites e Portfólios Digitais", pillar: "digital",
      description: "Sites institucionais, landing pages e portfólios digitais rápidos e pensados para o celular.",
      tags: ["Sites", "Landing pages", "Catálogos"] },
    { name: "Identidade Visual e Branding", pillar: "estrategia",
      description: "Refinamento de logos, padronização visual, posicionamento e identidade de marca.",
      tags: ["Logo", "Paleta", "Tom de voz"] },
    { name: "Consultoria e Estratégia", pillar: "estrategia",
      description: "Direção criativa, ideias de conteúdo, planejamento de campanhas e posicionamento digital.",
      tags: ["Campanhas", "Posicionamento", "Direção criativa"] }
  ],

  // Sites entregues e no ar (aparecem na seção "Trabalhos").
  sites: [
    { client: "Supermercado São Miguel Arcanjo", segment: "Supermercado e frigorífico",
      url: "https://yotucroni95-droid.github.io/s-omiguelarcanjosite/",
      desktop: "assets/trabalhos/somiguelarcanjosite-desktop.jpg",
      mobile: "assets/trabalhos/somiguelarcanjosite-celular.jpg",
      highlight: "Encartes semanais que entram e saem do ar sozinhos" , accent: "#D9262C" },
    { client: "Nossa Senhora da Conceição", segment: "Móveis e eletros",
      url: "https://yotucroni95-droid.github.io/lojanossasenhoraconceicao/",
      desktop: "assets/trabalhos/lojanossasenhoraconceicao-desktop.jpg",
      mobile: "assets/trabalhos/lojanossasenhoraconceicao-celular.jpg",
      highlight: "Catálogo de produtos com pedido direto no WhatsApp", accent: "#B8925A" },
    { client: "Wanderley Calçados", segment: "Moda e calçados",
      url: "https://yotucroni95-droid.github.io/wanderleycal-ados/",
      desktop: "assets/trabalhos/wanderleycalados-desktop.jpg",
      mobile: "assets/trabalhos/wanderleycalados-celular.jpg",
      highlight: "Vitrine elegante que leva o cliente para a conversa", accent: "#E9E4DA" },
    { client: "César Capitó Advogados", segment: "Escritório de advocacia",
      url: "https://yotucroni95-droid.github.io/Site-Capit-/",
      desktop: "assets/trabalhos/sitecapit-desktop.jpg",
      mobile: "assets/trabalhos/sitecapit-celular.jpg",
      highlight: "Presença institucional sóbria para serviços jurídicos", accent: "#C9A44C" }
  ],

  // Marcas atendidas (aparecem no carrossel e na grade de clientes).
  clients: [
    { name: "São Miguel Arcanjo", category: "Audiovisual", work: "Conteúdo e produção audiovisual", image: "assets/clientes/sao-miguel.jpg" },
    { name: "Wanderley Calçados", category: "Social Media", work: "Conteúdo e comunicação para o varejo", image: "assets/clientes/wanderley.jpg" },
    { name: "A Cooperativa", category: "Design", work: "Conteúdos visuais para o agronegócio", image: "assets/clientes/a-cooperativa.jpg" },
    { name: "Nossa Senhora da Conceição", category: "Campanhas", work: "Campanhas e peças promocionais", image: "assets/clientes/nossa-senhora.jpg" },
    { name: "LD Construção", category: "Campanhas", work: "Comunicação para materiais de construção", image: "assets/clientes/ld-construcao.jpg" },
    { name: "Bianca Magazine", category: "Social Media", work: "Conteúdo de moda e comunicação visual", image: "assets/clientes/bianca-magazine.jpg" },
    { name: "Gugu Motos", category: "Design", work: "Artes para produtos e serviços", image: "assets/clientes/gugu-motos.jpg" },
    { name: "Ângela Móveis", category: "Social Media", work: "Conteúdos para divulgação de produtos", image: "assets/clientes/angela-moveis.jpg" },
    { name: "César Capitó Advogados", category: "Institucional", work: "Comunicação para serviços jurídicos", image: "assets/clientes/cesar-capito.jpg" }
  ],

  process: [
    { title: "Escutamos", text: "Conversamos sobre o seu negócio, o seu público e onde você quer chegar." },
    { title: "Planejamos", text: "Definimos prioridades, canais, mensagens e a direção criativa." },
    { title: "Criamos", text: "Produzimos artes, vídeos, fotos, textos e sites com a cara da sua marca." },
    { title: "Acompanhamos", text: "Entregamos, ajustamos e seguimos perto para a comunicação evoluir." }
  ]
};
