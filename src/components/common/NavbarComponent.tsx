import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";

const customTheme = {
  root: {
    base: "bg-white/95 backdrop-blur border-b border-zinc-200 px-4 py-4 sticky top-0 z-50",
    rounded: {
      on: "",
      off: ""
    },
    bordered: {
      on: "border",
      off: ""
    },
    inner: {
      base: "mx-auto flex flex-wrap items-center justify-between container",
      fluid: {
        on: "",
        off: "container"
      }
    }
  },
  brand: {
    base: "flex items-center"
  },
  collapse: {
    base: "w-full md:block md:w-auto",
    list: "mt-4 flex flex-col md:mt-0 md:flex-row md:gap-8 md:text-sm md:font-medium",
    hidden: {
      on: "hidden",
      off: ""
    }
  },
  link: {
    base: "block py-2 pl-3 pr-4 md:p-0 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors tracking-wide uppercase",
    active: {
      on: "text-zinc-900 md:text-zinc-900",
      off: "text-zinc-600 hover:text-zinc-900"
    },
    disabled: {
      on: "text-zinc-400 cursor-not-allowed",
      off: ""
    }
  },
  toggle: {
    base: "inline-flex items-center rounded-lg p-2 text-sm text-zinc-900 hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 md:hidden",
    icon: "h-6 w-6 shrink-0"
  }
};

export default function NavbarComponent() {
  return (
    <Navbar fluid theme={customTheme}>
      <NavbarBrand href="/">
        <span className="self-center whitespace-nowrap text-2xl font-bold text-zinc-900 tracking-tight">
          VIN<span className="font-light">Studio</span>
        </span>
      </NavbarBrand>
      
      <div className="flex md:order-2 gap-2">
        <a 
          href="/contacto" 
          className="hidden md:inline-flex items-center justify-center h-10 px-6 text-sm font-semibold bg-zinc-900 text-white border border-zinc-900 hover:bg-zinc-800 transition-colors"
        >
          Iniciar Proyecto
        </a>
        <NavbarToggle />
      </div>
      
      <NavbarCollapse>
        <NavbarLink href="/">
          Inicio
        </NavbarLink>
        <NavbarLink href="/nosotros">
          Nosotros
        </NavbarLink>
        <NavbarLink href="/servicios">
          Servicios
        </NavbarLink>
        <NavbarLink href="/portafolio">
          Portafolio
        </NavbarLink>
        <NavbarLink href="/contacto">
          Contacto
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
