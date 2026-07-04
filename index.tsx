import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Flame, Beef, UtensilsCrossed, GlassWater, Users, Rocket,
  MapPin, Phone, Clock, Instagram, MessageCircle, ArrowUp,
  Star, ChevronDown, ShoppingBag, Store,
} from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

import heroBurger from "@/assets/hero-burger.jpg";
import fries from "@/assets/fries.jpg";
import milkshake from "@/assets/milkshake.jpg";
import lojaDia from "@/assets/loja-dia.jpg";
import lojaNoite from "@/assets/loja-noite.jpg";
import burgerBacon from "@/assets/burger-bacon.jpg";
import burgerClassic from "@/assets/burger-classic.jpg";
import burgerBbq from "@/assets/burger-bbq.jpg";

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      { title: "Murilo's Burguer — Hambúrguer Artesanal em João Pessoa" },
      {
        name: "description",
        content:
          "Hambúrguer artesanal em João Pessoa - PB. Carnes selecionadas, pães macios e ingredientes frescos. Peça no delivery ou visite a Murilo's Burguer no Mandacaru.",
      },
      { property: "og:title", content: "Murilo's Burguer — Hambúrguer Artesanal em João Pessoa" },
      { property: "og:description", content: "O verdadeiro sabor do hambúrguer artesanal. Peça agora pelo WhatsApp." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const WHATSAPP_URL = "https://wa.me/5583988655008?text=Ol%C3%A1!%20Quero%20fazer%20um%20pedido%20na%20Murilo's%20Burguer";
const MENU_URL = "https://murilosburguer.menudino.com";
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Av.+Dom+Manoel+Paiva,+440,+Mandacaru,+Jo%C3%A3o+Pessoa+-+PB";
const INSTAGRAM_URL = "https://instagram.com/murilosburguer";

function LandingPage() {
  useReveal();
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setShowTop(window.scrollY > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar scrolled={scrolled} />
      <Hero />
      <About />
      <Differentials />
      <Menu />
      <Gallery />
      <Reviews />
      <Info />
      <InstagramSection />
      <Delivery />
      <FAQ />
      <FinalCTA />
      <Footer />

      {/* Floating WhatsApp */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Pedir pelo WhatsApp"
        className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-5px_rgba(37,211,102,0.6)] transition-transform hover:scale-110"
      >
        <MessageCircle className="h-7 w-7" />
      </a>

      {/* Back to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Voltar ao topo"
          className="fixed bottom-24 right-6 z-50 grid h-11 w-11 place-items-center rounded-full glass text-primary transition-transform hover:scale-110"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}

/* ---------- Navbar ---------- */
function Navbar({ scrolled }: { scrolled: boolean }) {
  const [open, setOpen] = useState(false);
  const links = [
    ["Sobre", "#sobre"],
    ["Cardápio", "#cardapio"],
    ["Galeria", "#galeria"],
    ["Contato", "#contato"],
  ] as const;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? "glass py-3 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.6)]" : "py-5 bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2">
          <span className="font-display text-2xl tracking-wide">
            MURILO'S <span className="gold-gradient-text">BURGUER</span>
          </span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:scale-105 hover:shadow-[0_10px_30px_-10px_var(--gold)] md:inline-flex"
        >
          🍔 Fazer Pedido
        </a>
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground"
          aria-label="Menu"
        >
          <div className="space-y-1.5">
            <span className="block h-0.5 w-6 bg-foreground" />
            <span className="block h-0.5 w-6 bg-foreground" />
            <span className="block h-0.5 w-6 bg-foreground" />
          </div>
        </button>
      </div>
      {open && (
        <div className="mx-6 mt-3 rounded-2xl glass p-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-muted-foreground hover:text-primary"
              >
                {label}
              </a>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 rounded-full bg-primary px-5 py-2.5 text-center text-sm font-semibold text-primary-foreground"
            >
              🍔 Fazer Pedido
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section id="top" className="relative min-h-screen pt-28 pb-16">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 40% at 20% 20%, rgba(244,180,0,0.12), transparent 60%), radial-gradient(50% 50% at 90% 80%, rgba(214,40,40,0.16), transparent 60%)",
        }}
      />
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">
        <div className="reveal">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-primary">
            <Star className="h-4 w-4 fill-primary text-primary" /> 15 mil+ seguidores no Instagram
          </div>
          <h1 className="font-display text-5xl leading-[1.05] sm:text-6xl md:text-7xl">
            O verdadeiro sabor do{" "}
            <span className="gold-gradient-text">hambúrguer artesanal</span> em João Pessoa
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Pães macios, carnes selecionadas e ingredientes frescos preparados na hora para você
            viver uma experiência única.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground shadow-[0_20px_40px_-15px_var(--gold)] transition-all hover:scale-105"
            >
              🍔 Fazer Pedido
            </a>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 glass px-8 py-4 font-semibold text-foreground transition-all hover:border-primary/50 hover:text-primary"
            >
              📍 Como Chegar
            </a>
          </div>
          <div className="mt-10 flex items-center gap-8">
            <Stat number="4.8" label="Avaliação" />
            <div className="h-10 w-px bg-white/10" />
            <Stat number="15k+" label="Seguidores" />
            <div className="h-10 w-px bg-white/10" />
            <Stat number="100%" label="Artesanal" />
          </div>
        </div>

        <div className="reveal-zoom relative">
          <div
            aria-hidden
            className="absolute -inset-8 -z-10 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(244,180,0,0.35), transparent 70%)" }}
          />
          <img
            src={heroBurger}
            alt="Hambúrguer artesanal Murilo's Burguer"
            width={1600}
            height={1600}
            className="float-slow relative mx-auto w-full max-w-lg drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
          />
          <div className="absolute -bottom-4 left-4 rounded-2xl glass px-4 py-3 text-sm">
            <div className="font-display text-primary">100% Artesanal</div>
            <div className="text-xs text-muted-foreground">Preparado na hora</div>
          </div>
        </div>
      </div>
      <div className="mt-16 flex justify-center">
        <ChevronDown className="h-6 w-6 animate-bounce text-muted-foreground" />
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl text-primary">{number}</div>
      <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}

/* ---------- About ---------- */
function About() {
  return (
    <section id="sobre" className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div className="reveal relative order-2 md:order-1">
          <img
            src={lojaNoite}
            alt="Ambiente aconchegante da Murilo's Burguer"
            loading="lazy"
            width={1200}
            height={900}
            className="rounded-3xl border border-white/10 shadow-2xl"
          />
          <div className="absolute -bottom-6 -right-6 hidden rounded-2xl glass px-5 py-4 md:block">
            <div className="font-display text-primary">Mandacaru</div>
            <div className="text-xs text-muted-foreground">João Pessoa - PB</div>
          </div>
        </div>
        <div className="reveal order-1 md:order-2">
          <div className="mb-3 text-xs uppercase tracking-[0.3em] text-primary">Sobre nós</div>
          <h2 className="font-display text-4xl md:text-5xl">
            Conheça a <span className="gold-gradient-text">Murilo's Burguer</span>
          </h2>
          <p className="mt-6 text-muted-foreground">
            A Murilo's Burguer nasceu para oferecer hambúrgueres artesanais preparados com
            ingredientes de alta qualidade, carnes suculentas e um atendimento que faz cada cliente
            se sentir em casa.
          </p>
          <p className="mt-4 text-muted-foreground">
            Estamos localizados no bairro de Mandacaru, em João Pessoa, proporcionando uma
            experiência completa para quem ama hambúrguer de verdade.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Differentials ---------- */
function Differentials() {
  const items = [
    { icon: Flame, title: "Hambúrguer Artesanal", text: "Receitas únicas, feitas com paixão." },
    { icon: Beef, title: "Carne Fresca", text: "Blend selecionado, moído diariamente." },
    { icon: UtensilsCrossed, title: "Batata Crocante", text: "Douradinha por fora, macia por dentro." },
    { icon: GlassWater, title: "Bebidas Geladas", text: "Refrigerantes, sucos e milk-shakes." },
    { icon: Users, title: "Ambiente Familiar", text: "Acolhedor para todas as idades." },
    { icon: Rocket, title: "Delivery Rápido", text: "Chega quentinho na sua casa." },
  ];
  return (
    <section className="border-y border-white/5 bg-secondary/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal mb-14 text-center">
          <div className="mb-3 text-xs uppercase tracking-[0.3em] text-primary">Nossos diferenciais</div>
          <h2 className="font-display text-4xl md:text-5xl">Por que escolher a gente?</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title, text }, i) => (
            <div
              key={title}
              className="reveal group rounded-2xl glass p-8 transition-all duration-300 hover:-translate-y-2 hover:border-primary/40"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="font-display text-2xl">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Menu ---------- */
function Menu() {
  const items = [
    { img: burgerClassic, name: "Classic Cheese", desc: "Blend suculento, cheddar derretido, alface, picles e maionese da casa." },
    { img: burgerBacon, name: "Bacon Lover", desc: "Bacon crocante em tiras generosas, queijo prato e cebola caramelizada." },
    { img: burgerBbq, name: "BBQ Onion", desc: "Molho barbecue defumado, cebola crispy e um blend que derrete na boca." },
  ];
  return (
    <section id="cardapio" className="mx-auto max-w-7xl px-6 py-24">
      <div className="reveal mb-14 text-center">
        <div className="mb-3 text-xs uppercase tracking-[0.3em] text-primary">Cardápio</div>
        <h2 className="font-display text-4xl md:text-5xl">
          Feitos <span className="gold-gradient-text">com amor</span>, servidos com capricho
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {items.map((item, i) => (
          <article
            key={item.name}
            className="reveal group overflow-hidden rounded-3xl glass transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-20px_rgba(244,180,0,0.3)]"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="relative aspect-square overflow-hidden">
              <img
                src={item.img}
                alt={item.name}
                loading="lazy"
                width={1024}
                height={1024}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent" />
            </div>
            <div className="p-6">
              <h3 className="font-display text-2xl">{item.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="reveal mt-12 text-center">
        <a
          href={MENU_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground shadow-[0_20px_40px_-15px_var(--gold)] transition-all hover:scale-105"
        >
          Ver Cardápio Completo
        </a>
      </div>
    </section>
  );
}

/* ---------- Gallery ---------- */
function Gallery() {
  const shots = [
    { src: heroBurger, alt: "Hambúrguer duplo" },
    { src: fries, alt: "Batatas crocantes" },
    { src: milkshake, alt: "Milk-shake de chocolate" },
    { src: burgerBacon, alt: "Bacon burger" },
    { src: lojaDia, alt: "Fachada da Murilo's Burguer" },
    { src: burgerBbq, alt: "BBQ burger" },
  ];
  return (
    <section id="galeria" className="border-y border-white/5 bg-secondary/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal mb-14 text-center">
          <div className="mb-3 text-xs uppercase tracking-[0.3em] text-primary">Galeria</div>
          <h2 className="font-display text-4xl md:text-5xl">Momentos deliciosos</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {shots.map((s, i) => (
            <div
              key={i}
              className={`reveal-zoom group relative overflow-hidden rounded-2xl ${
                i === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <img
                src={s.src}
                alt={s.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Reviews ---------- */
function Reviews() {
  const reviews = [
    { name: "Ana Beatriz", text: "Melhor hambúrguer que já comi em João Pessoa. Carne suculenta e pão perfeito!" },
    { name: "Rafael Souza", text: "Ambiente incrível e atendimento nota 10. Voltarei muitas vezes." },
    { name: "Camila Nunes", text: "Delivery rápido e o burger chegou quentinho. Recomendo demais!" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="reveal mb-12 text-center">
        <div className="mb-3 text-xs uppercase tracking-[0.3em] text-primary">Avaliações</div>
        <h2 className="font-display text-4xl md:text-5xl">O que dizem sobre nós</h2>
        <div className="mt-6 inline-flex items-center gap-3 rounded-full glass px-5 py-3">
          <div className="flex text-primary">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-primary" />
            ))}
          </div>
          <span className="font-display text-lg">4.8/5</span>
          <span className="text-xs text-muted-foreground">
            baseado em centenas de avaliações
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {reviews.map((r, i) => (
          <div
            key={i}
            className="reveal relative rounded-3xl glass p-8"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="mb-3 flex text-primary">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-primary" />
              ))}
            </div>
            <p className="text-sm text-foreground/90">"{r.text}"</p>
            <div className="mt-6 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/20 font-display text-primary">
                {r.name[0]}
              </div>
              <div>
                <div className="text-sm font-semibold">{r.name}</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Exemplo de demonstração
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Info ---------- */
function Info() {
  return (
    <section id="contato" className="border-y border-white/5 bg-secondary/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal mb-12 text-center">
          <div className="mb-3 text-xs uppercase tracking-[0.3em] text-primary">Informações</div>
          <h2 className="font-display text-4xl md:text-5xl">Venha nos visitar</h2>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="reveal space-y-6">
            <InfoCard icon={MapPin} title="Endereço">
              Av. Dom Manoel Paiva, 440<br />
              Mandacaru — João Pessoa - PB<br />
              CEP 58028-010
            </InfoCard>
            <InfoCard icon={Phone} title="Telefone">
              <a href="tel:+5583988655008" className="hover:text-primary">
                (83) 98865-5008
              </a>
            </InfoCard>
            <InfoCard icon={Clock} title="Horário de funcionamento">
              <div className="space-y-1 text-sm">
                <div className="flex justify-between gap-6"><span>Domingo à Quinta</span><span className="text-primary">17h — 23h</span></div>
                <div className="flex justify-between gap-6"><span>Sexta e Sábado</span><span className="text-primary">17h — 00h</span></div>
                <div className="flex justify-between gap-6"><span>Terça-feira</span><span className="text-accent">Fechado</span></div>
              </div>
            </InfoCard>
          </div>
          <div className="reveal-zoom overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
            <iframe
              title="Localização Murilo's Burguer"
              src="https://www.google.com/maps?q=Av.+Dom+Manoel+Paiva,+440,+Mandacaru,+Jo%C3%A3o+Pessoa+-+PB&output=embed"
              width="100%"
              height="500"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[400px] w-full grayscale contrast-125"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof MapPin;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl glass p-6 transition-all hover:border-primary/30">
      <div className="flex items-start gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="font-display text-lg">{title}</div>
          <div className="mt-1 text-sm text-muted-foreground">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Instagram ---------- */
function InstagramSection() {
  return (
    <section className="relative overflow-hidden py-24">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 30% 40%, rgba(244,180,0,0.25), transparent 55%), radial-gradient(circle at 70% 60%, rgba(214,40,40,0.25), transparent 55%)",
        }}
      />
      <div className="reveal mx-auto max-w-3xl px-6 text-center">
        <Instagram className="mx-auto h-12 w-12 text-primary" />
        <h2 className="mt-6 font-display text-4xl md:text-5xl">
          Siga a <span className="gold-gradient-text">Murilo's Burguer</span>
        </h2>
        <p className="mt-4 text-muted-foreground">
          Mais de 15 mil seguidores acompanhando nossas novidades, lançamentos e promoções.
        </p>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-primary px-8 py-4 font-semibold text-primary-foreground shadow-[0_20px_40px_-15px_var(--red)] transition-all hover:scale-105"
        >
          <Instagram className="h-5 w-5" /> Ver Instagram
        </a>
      </div>
    </section>
  );
}

/* ---------- Delivery ---------- */
function Delivery() {
  const options = [
    { icon: MessageCircle, title: "WhatsApp", desc: "Peça pelo chat, rápido e prático.", href: WHATSAPP_URL, cta: "Chamar no WhatsApp" },
    { icon: ShoppingBag, title: "Delivery", desc: "Entrega quentinha em toda região.", href: MENU_URL, cta: "Fazer pedido" },
    { icon: Store, title: "Retirada no local", desc: "Peça e retire sem filas.", href: MAPS_URL, cta: "Ver endereço" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="reveal mb-14 text-center">
        <div className="mb-3 text-xs uppercase tracking-[0.3em] text-primary">Delivery</div>
        <h2 className="font-display text-4xl md:text-5xl">
          🍔 Faça seu pedido sem sair de casa
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {options.map(({ icon: Icon, title, desc, href, cta }, i) => (
          <div
            key={title}
            className="reveal group rounded-3xl glass p-8 transition-all hover:-translate-y-2 hover:border-primary/40"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <Icon className="h-10 w-10 text-primary transition-transform group-hover:scale-110" />
            <h3 className="mt-4 font-display text-2xl">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              {cta} →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  const items = [
    { q: "Vocês fazem delivery?", a: "Sim! Entregamos em João Pessoa e região. Peça pelo WhatsApp ou pelo nosso cardápio online." },
    { q: "Aceitam cartão?", a: "Aceitamos cartões de crédito, débito, PIX e dinheiro." },
    { q: "Tem estacionamento?", a: "Sim, temos vagas na rua e nas proximidades para maior comodidade." },
    { q: "Possuem opções infantis?", a: "Sim, temos combos e lanches pensados para o público infantil." },
    { q: "Qual o horário de funcionamento?", a: "Domingo a Quinta das 17h às 23h. Sexta e Sábado até meia-noite. Terça-feira fechado." },
  ];
  return (
    <section className="border-y border-white/5 bg-secondary/30 py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="reveal mb-12 text-center">
          <div className="mb-3 text-xs uppercase tracking-[0.3em] text-primary">FAQ</div>
          <h2 className="font-display text-4xl md:text-5xl">Perguntas frequentes</h2>
        </div>
        <div className="space-y-3">
          {items.map((item, i) => (
            <details
              key={i}
              className="reveal group rounded-2xl glass p-6 transition-all open:border-primary/40"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <span className="font-display text-lg">{item.q}</span>
                <ChevronDown className="h-5 w-5 text-primary transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-4 text-sm text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Final CTA ---------- */
function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-28">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(214,40,40,0.25), transparent 60%), radial-gradient(circle at 20% 80%, rgba(244,180,0,0.2), transparent 60%)",
        }}
      />
      <div className="reveal mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-5xl md:text-7xl">
          Está com <span className="gold-gradient-text">fome?</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
          Peça agora mesmo e descubra por que a Murilo's Burguer é uma das hamburguerias mais
          queridas de João Pessoa.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-3 rounded-full bg-primary px-10 py-5 text-lg font-bold text-primary-foreground shadow-[0_30px_60px_-20px_var(--gold)] transition-all hover:scale-105"
        >
          🍔 Fazer Pedido
        </a>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-2xl">
            MURILO'S <span className="gold-gradient-text">BURGUER</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Hambúrguer artesanal em João Pessoa. Sabor de verdade, feito com carinho.
          </p>
        </div>
        <div>
          <div className="font-display text-lg">Contato</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Av. Dom Manoel Paiva, 440</li>
            <li>Mandacaru — João Pessoa - PB</li>
            <li><a href="tel:+5583988655008" className="hover:text-primary">(83) 98865-5008</a></li>
          </ul>
        </div>
        <div>
          <div className="font-display text-lg">Links</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><a href={MENU_URL} target="_blank" rel="noopener noreferrer" className="hover:text-primary">Cardápio</a></li>
            <li><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-primary">Instagram</a></li>
            <li><a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="hover:text-primary">Google Maps</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl border-t border-white/5 px-6 pt-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Murilo's Burguer. Todos os direitos reservados.
      </div>
    </footer>
  );
}
