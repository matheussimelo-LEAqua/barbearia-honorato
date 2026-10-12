import { useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Clock3,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  MoveUpRight,
  Scissors,
  UserRound,
  X,
} from 'lucide-react';

type Service = {
  name: string;
  price: string;
  duration: string;
  featured?: boolean;
};

const whatsappUrl = 'https://wa.me/5581973178238';
const bookingUrl = 'https://sites.appbarber.com.br/barbeariahonorato-3so0';
const instagramUrl = 'https://instagram.com/barbeariahonorato_';
const directionsUrl = 'https://www.google.com/maps/dir/?api=1&destination=Avenida+das+Garcas+726+B+Rio+Doce+Olinda+PE';
const mapEmbedUrl = 'https://www.google.com/maps?q=Avenida+das+Garcas+726+B+Rio+Doce+Olinda+PE&output=embed';
const mapUrl = 'https://www.google.com/maps/search/?api=1&query=Avenida+das+Garcas+726+B+Rio+Doce+Olinda+PE';

// Quando tiver as fotos, preencha photo com '/assets/images/jackson.jpg' e '/assets/images/ronald.jpg'.
const barbers = [
  { name: 'Jackson', photo: '/assets/images/jackson.png', description: 'Precisão no corte, atenção em cada detalhe.' },
  { name: 'Ronald', photo: '/assets/images/ronald.png', description: 'Cuidado e técnica para valorizar seu estilo.' },
];

const services: Service[] = [
  { name: 'Barba', price: 'R$ 30,00', duration: '60 min', featured: true },
  { name: 'Botox', price: 'R$ 90,00', duration: '60 min' },
  { name: 'Corte + barba', price: 'R$ 55,00', duration: '60 min', featured: true },
  { name: 'Corte + barba + sobrancelha', price: 'R$ 55,00', duration: '60 min' },
  { name: 'Corte degradê', price: 'R$ 35,00', duration: '60 min', featured: true },
  { name: 'Corte degradê + sobrancelha', price: 'R$ 40,00', duration: '60 min' },
  { name: 'Corte na tesoura', price: 'a partir de R$ 40,00', duration: '60 min' },
  { name: 'Corte na tesoura + sobrancelha', price: 'R$ 40,00', duration: '60 min' },
  { name: 'Corte navalhado', price: 'R$ 40,00', duration: '60 min' },
  { name: 'Corte navalhado + sobrancelha', price: 'R$ 40,00', duration: '60 min' },
  { name: 'Kids', price: 'R$ 40,00', duration: '60 min', featured: true },
  { name: 'Limpeza de pele', price: 'R$ 25,00', duration: '15 min' },
  { name: 'Pézinho', price: 'R$ 10,00', duration: '15 min' },
  { name: 'Sobrancelha', price: 'R$ 10,00', duration: '15 min' },
];

const galleryImages = [
  { src: '/assets/images/image copy.png', alt: 'Corte degradê com acabamento preciso', label: '01 / Degradê' },
  { src: '/assets/images/image copy 2.png', alt: 'Corte masculino clássico', label: '02 / Clássico' },
  { src: '/assets/images/h1.png', alt: 'Barbeiro em atendimento', label: '03 / Atendimento' },
  { src: '/assets/images/h2.png', alt: 'Interior elegante de uma barbearia', label: '04 / Ambiente' },
  { src: '/assets/images/h3.png', alt: 'Cadeiras e espelhos de uma barbearia', label: '05 / Detalhes' },
  { src: '/assets/images/h4.png', alt: 'Interior moderno de barbearia', label: '06 / Atmosfera' },
  { src: '/assets/images/h5.png', alt: 'Barbeiro trabalhando no corte', label: '07 / Precisão' },
  { src: '/assets/images/h6.png', alt: 'Barbeiro preparando um cliente', label: '08 / Cuidado' },
  { src: '/assets/images/h7.png', alt: 'Textura de um corte masculino', label: '09 / Textura' },
  { src: '/assets/images/h8.png', alt: 'Acabamento com máquina e pente', label: '10 / Técnica' },
  { src: '/assets/images/h9.png', alt: 'Detalhe de acabamento masculino', label: '11 / Acabamento' },
  { src: '/assets/images/h10.png', alt: 'Corte masculino visto de perto', label: '12 / Visagismo' },
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAllServices, setShowAllServices] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const visibleServices = showAllServices ? services : services.slice(0, 8);
  const galleryRef = useRef<HTMLDivElement>(null);
  const moveGallery = (direction: number) => {
    const track = galleryRef.current;
    if (!track) return;
    const item = track.querySelector<HTMLElement>('.gallery-item');
    if (!item) return;
    const step = item.offsetWidth + parseFloat(getComputedStyle(track).columnGap);
    const maxScroll = track.scrollWidth - track.clientWidth;
    const target = track.scrollLeft + direction * step;
    track.scrollTo({
      left: direction > 0 && track.scrollLeft >= maxScroll - 2 ? 0
        : direction < 0 && track.scrollLeft <= 2 ? maxScroll
        : Math.min(maxScroll, Math.max(0, target)),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  };
  const updateGalleryPosition = () => {
    const track = galleryRef.current;
    const item = track?.querySelector<HTMLElement>('.gallery-item');
    if (!track || !item) return;
    const step = item.offsetWidth + parseFloat(getComputedStyle(track).columnGap);
    setActiveSlide(Math.round(track.scrollLeft / step));
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#inicio" onClick={closeMenu} aria-label="Barbearia Honorato - início">
          <img className="brand-logo" src="/assets/images/image.png" alt="Logo Barbearia Honorato" />
          <span className="brand-copy">
            <strong>Barbearia</strong>
            <em>Honorato</em>
          </span>
        </a>
        <nav className={isMenuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Navegação principal">
          <a href="#inicio" onClick={closeMenu}>Início</a>
          <a href="#sobre" onClick={closeMenu}>Sobre</a>
          <a href="#servicos" onClick={closeMenu}>Serviços</a>
          <a href="#galeria" onClick={closeMenu}>Galeria</a>
          <a href="#horarios" onClick={closeMenu}>Horários</a>
          <a href="#contato" onClick={closeMenu}>Contato</a>
          <a className="nav-booking" href={bookingUrl} target="_blank" rel="noreferrer" onClick={closeMenu}>
            Agendar agora <ArrowUpRight size={16} />
          </a>
        </nav>
        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-shade" />
          <div className="hero-content page-width">
            <p className="eyebrow hero-eyebrow"><span /> Estilo que marca presença</p>
            <h1>Seu estilo.<br /><span>Seu momento.</span></h1>
            <p className="hero-text">Mais do que um corte, uma experiência de cuidado, precisão e personalidade no coração de Olinda.</p>
            <div className="hero-actions">
              <a className="button button-gold" href={bookingUrl} target="_blank" rel="noreferrer">Agendar agora <ArrowUpRight size={18} /></a>
            </div>
            <div className="hero-meta">
              <span><MapPin size={16} /> Rio Doce | Olinda/PE</span>
              <span><Clock3 size={16} /> Atendimento com hora marcada</span>
            </div>
          </div>
          <div className="hero-scroll"><span /> Role para explorar</div>
        </section>

        <section className="quick-hours section-gold" aria-label="Horários de atendimento">
          <div className="page-width quick-hours-inner">
            <div className="quick-hours-title"><Clock3 size={19} /><span><small>Atendimento</small>Horários de hoje</span></div>
            <div className="quick-hours-days"><span>Seg a sex <strong>09:00 às 12:00 | 13:00 às 20:00</strong></span><span>Sábado <strong>09:00 às 12:00 | 13:00 às 19:00</strong></span></div>
            <a className="quick-hours-link" href="#horarios">Ver horários <ArrowUpRight size={16} /></a>
          </div>
        </section>

        <section className="intro section-light" id="sobre">
          <div className="page-width intro-grid">
            <div className="intro-heading">
              <p className="eyebrow"><span /> Visagismo, isso é Barbearia Honorato</p>
              <h2>Onde cuidado<br /><i>encontra atitude.</i></h2>
            </div>
            <div className="intro-copy">
              <p className="signature-line">Visagismo para revelar o seu melhor ângulo.</p><p className="lead">Na Barbearia Honorato, cada detalhe importa. Do primeiro contato ao acabamento final, criamos um momento para você desacelerar, se cuidar e sair pronto para deixar sua marca.</p>
              <p>Um ambiente de personalidade, atendimento próximo e técnica apurada para quem entende que estilo não é só aparência. É a forma como você se apresenta ao mundo.</p>
              <a className="text-link" href="#servicos">Conheça nossos serviços <ArrowUpRight size={17} /></a>
            </div>
          </div>
        </section>

        <section className="gallery section-dark" id="galeria">
          <div className="page-width">
            <div className="section-heading gallery-heading"><div><p className="eyebrow"><span /> O resultado fala</p><h2>Estilo para<br /><i>ser visto.</i></h2></div><div className="gallery-heading-actions"><a className="text-link" href={instagramUrl} target="_blank" rel="noreferrer"><Instagram size={18} /> @barbeariahonorato_ <ArrowUpRight size={16} /></a><div className="gallery-controls"><button onClick={() => moveGallery(-1)} aria-label="Foto anterior"><ArrowLeft size={17} /></button><span>{String(activeSlide + 1).padStart(2, '0')} <i>/ {galleryImages.length}</i></span><button onClick={() => moveGallery(1)} aria-label="Próxima foto"><ArrowRight size={17} /></button></div></div></div>
            <div className="gallery-carousel" ref={galleryRef} onScroll={updateGalleryPosition} tabIndex={0} aria-label="Fotos e cortes da Honorato" onKeyDown={(event) => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); moveGallery(event.key === 'ArrowRight' ? 1 : -1); } }}>{galleryImages.map((image, index) => <div className={index === activeSlide ? 'gallery-item is-active' : 'gallery-item'} key={image.src}><img src={image.src} alt={image.alt} loading="lazy" draggable={false} /><span>{image.label}</span></div>)}</div>
          </div>
        </section>

        <section className="services section-light" id="servicos">
          <div className="page-width">
            <div className="section-heading split-heading">
              <div><p className="eyebrow dark-eyebrow"><span /> Para o seu estilo</p><h2>Escolha o seu<br /><i>próximo visual.</i></h2></div>
              <p>Serviços pensados para entregar precisão, conforto e aquele acabamento que faz toda diferença.</p>
            </div>
            <div className="service-grid">
              {visibleServices.map((service) => (
                <article className={service.featured ? 'service-card featured' : 'service-card'} key={service.name}>
                  {service.featured && <span className="popular-tag">Mais procurado</span>}
                  <div className="service-icon"><Scissors size={19} /></div>
                  <h3>{service.name}</h3>
                  <div className="service-bottom"><strong>{service.price}</strong><span><Clock3 size={14} /> {service.duration}</span></div>
                  <a href={bookingUrl} target="_blank" rel="noreferrer" aria-label={`Agendar ${service.name}`}>Agendar <ArrowUpRight size={15} /></a>
                </article>
              ))}
            </div>
            <button className="show-more" onClick={() => setShowAllServices(!showAllServices)}>{showAllServices ? 'Mostrar menos' : 'Ver todos os serviços'} <ChevronDown className={showAllServices ? 'rotate' : ''} size={17} /></button>
          </div>
        </section>

        <section className="barbers section-black" id="barbeiros">
          <div className="page-width">
            <div className="barbers-heading">
              <p className="eyebrow"><span /> Time Honorato <span /></p>
              <h2>Barbeiros</h2>
              <p>Técnica, personalidade e atenção em cada detalhe. Conheça quem cuida do seu visual.</p>
            </div>
            <div className="barbers-grid">
              {barbers.map((barber) => (
                <article className="barber-card" key={barber.name}>
                  <div className="barber-photo">
                    {barber.photo ? <img src={barber.photo} alt={`Foto de ${barber.name}, barbeiro da Honorato`} loading="lazy" /> : <div className="barber-photo-placeholder" aria-label={`Espaço reservado para a foto de ${barber.name}`}><UserRound size={64} strokeWidth={1} /><span>{barber.name}</span></div>}
                  </div>
                  <div className="barber-copy"><p className="eyebrow">Barbeiro</p><h3>{barber.name}</h3><p>{barber.description}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="refreshment section-dark">
          <div className="page-width refreshment-grid">
            <div className="refreshment-image"><img src="https://images.pexels.com/photos/34056733/pexels-photo-34056733.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="Bebidas geladas em um frigobar" /><span>Uma pausa também faz parte.</span></div>
            <div className="refreshment-copy"><p className="eyebrow"><span /> Para aproveitar o momento</p><h2>Uma pausa,<br /><i>do seu jeito.</i></h2><p>Enquanto você espera ou depois do seu atendimento, encontre opções para deixar a visita ainda melhor.</p><div className="refreshment-list"><span>Refrigerante</span><span>Energético</span><span>Lanche</span><span>Café</span></div></div>
          </div>
        </section>

        <section className="hours section-light" id="horarios">
          <div className="page-width location-grid">
            <div className="location-map">
              <iframe title="Localização da Barbearia Honorato em Rio Doce, Olinda" src={mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
              <a className="location-map-link" href={mapUrl} target="_blank" rel="noreferrer">Abrir no Google Maps <ArrowUpRight size={16} /></a>
            </div>
            <div className="location-info">
              <p className="eyebrow dark-eyebrow"><span /> Encontre a sua barbearia</p>
              <h2>Seu horário,<br /><i>do seu jeito.</i></h2>
              <div className="location-detail">
                <h3><MapPin size={18} /> Endereço</h3>
                <address>Avenida das Garças, 726 - B<br />Rio Doce, Olinda/PE · CEP 53080-800</address>
              </div>
              <div className="location-detail">
                <h3><Clock3 size={18} /> Horários de atendimento</h3>
                <dl className="location-hours">
                  <div><dt>Segunda a sexta</dt><dd>09:00 às 12:00 · 13:00 às 20:00</dd></div>
                  <div><dt>Sábado</dt><dd>09:00 às 12:00 · 13:00 às 19:00</dd></div>
                </dl>
              </div>
              <div className="location-actions">
                <a className="button button-dark" href={directionsUrl} target="_blank" rel="noreferrer">Traçar rota <MoveUpRight size={17} /></a>
                <a className="button button-gold" href={bookingUrl} target="_blank" rel="noreferrer">Agendar agora <ArrowUpRight size={17} /></a>
              </div>
            </div>
          </div>
        </section>

        <section className="contact section-gold" id="contato">
          <div className="page-width contact-compact">
            <p className="eyebrow dark-eyebrow"><span /> Vamos conversar</p>
            <h2>Seu próximo<br /><i>visual começa aqui.</i></h2>
            <p>Tem alguma dúvida? Fale com a equipe Honorato.</p>
            <a className="button button-dark" href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Dúvidas no WhatsApp <ArrowUpRight size={17} /></a>
          </div>
        </section>
      </main>

      <footer className="footer section-black"><div className="page-width footer-top"><a className="brand footer-brand" href="#inicio"><img className="brand-logo" src="/assets/images/image.png" alt="Logo Barbearia Honorato" /><span className="brand-copy"><strong>Barbearia</strong><em>Honorato</em></span></a><p>Estilo que marca presença.</p><a className="instagram-footer" href={instagramUrl} target="_blank" rel="noreferrer"><Instagram size={18} /> @barbeariahonorato_ <ArrowUpRight size={16} /></a></div><div className="page-width footer-bottom"><span>© 2024 Barbearia Honorato. Todos os direitos reservados.</span><span>Rio Doce | Olinda/PE</span></div></footer>
    </div>
  );
}

export default App;
