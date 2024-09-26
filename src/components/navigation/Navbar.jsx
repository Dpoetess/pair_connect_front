import React, { useState } from "react";
import ModeToggle from "./ModeToggle";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth(); // Asegúrate de extraer 'logout'
  const navigate = useNavigate(); // Llama a la función para obtener el `navigate` correctamente

  const navlinks = [
    { name: "Home", to: "/" },
    { name: "Sobre nosotros", to: "/about-us" },
    { name: "Pair programming", to: "/pair-programming" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout(); // Cierra la sesión
    navigate("/"); // Redirige a la página de inicio
  };

  return (
    <nav className={`shadow-lg px-6 py-4`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <NavLink to="/" className="h-10">
            <img src="/logo.svg" alt="logo" className="w-[35px]" />
          </NavLink>
          <span
            className="font-poppins font-bold text-[36px] leading-[120%] hidden md:block text-transparent bg-clip-text"
            style={{ backgroundImage: "var(--gradient)" }}
          >
            Pair Connect
          </span>
        </div>

        {/* Links de navegación para pantallas grandes */}
        <div className="hidden lg:flex space-x-8">
          {navlinks.map((item) => (
            <NavLink key={item.name} to={item.to}>
              {item.name}
            </NavLink>
          ))}
          {isAuthenticated && (
            <>
              <NavLink to="/profile">Mi perfil</NavLink>
              <NavLink to="/projects">Mis proyectos</NavLink>
            </>
          )}
        </div>

        {/* Toggle, Login y Menú */}
        <div className="flex items-center space-x-4">
          <ModeToggle />
          {isAuthenticated ? (
            <Button onClick={handleLogout}>Log Out</Button>
          ) : (
            <Button>Login</Button>
          )}
          <div className="lg:hidden">
            {" "}
            {/* Menú móvil visible solo en pantallas pequeñas */}
            <button onClick={toggleMenu} className="focus:outline-none">
              <Menu size={40} />
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil para pantallas pequeñas */}
      {isOpen && (
        <div className="lg:hidden flex flex-col items-left space-y-2 py-5">
          {navlinks.map((item) => (
            <NavLink key={item.name} to={item.to}>
              {item.name}
            </NavLink>
          ))}
          {isAuthenticated && (
            <>
              <NavLink to="/profile">Mi perfil</NavLink>
              <NavLink to="/projects">Mis proyectos</NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
