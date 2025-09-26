import React, { useContext, useState } from 'react'; // 🔑 Importamos useState
import { useNavigate, Link } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';

import { useUser } from '../context/UserContext';
import { CartContext } from '../context/CartContext';

// Define el color de tu marca (Amarillo de React/Bootstrap Warning)
const ACCENT_COLOR = '#F1CD3A';

const Header = () => {
    const { user, logout, loading } = useUser();
    const navigate = useNavigate();
    const { cartItems } = useContext(CartContext);

    // 🔑 1. Estado para controlar si el navbar está expandido/abierto
    const [expanded, setExpanded] = useState(false); 
    
    // 🔑 2. Función para cerrar el navbar. La usaremos en todos los enlaces.
    const handleNavClick = () => setExpanded(false);

    const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header>
            <Navbar 
                fixed="top" 
                variant="light" 
                expand="lg" 
                collapseOnSelect 
                style={{ backgroundColor: ACCENT_COLOR }}
                // 🔑 3. Vinculamos el estado 'expanded' a la Navbar
                expanded={expanded}
                // 🔑 4. Vinculamos onToggle para cambiar el estado cuando se presiona el botón hamburguesa
                onToggle={() => setExpanded(!expanded)} 
            >
                <Container>
                    {/* El logo no debe cerrar el menú si ya está en la Home, pero lo manejaremos por seguridad */}
                    <Navbar.Brand as={Link} to="/" className="fw-bold" onClick={handleNavClick}>
                        Panfleto
                    </Navbar.Brand>
                    
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    
                    <Navbar.Collapse id="basic-navbar-nav">
                        
                        <Nav className="ms-auto">
                            
                            {/* 🔑 Enlace al Carrito (se agrega handleNavClick) */}
                            <Nav.Link as={Link} to="/cart" className="fw-bold" onClick={handleNavClick}>
                                <FontAwesomeIcon icon={faShoppingCart} />
                                <span className="ms-1">Carrito</span>
                                {cartCount > 0 && <span className="ms-1 badge bg-dark text-light">{cartCount}</span>}
                            </Nav.Link>

                            {/* 🔑 Enlace al Catálogo (Lo incluiremos para una mejor navegación) */}
                            <Nav.Link as={Link} to="/products" className="fw-bold" onClick={handleNavClick}>
                                Catálogo
                            </Nav.Link>

                            
                            {loading ? (
                                <Nav.Link disabled>Cargando...</Nav.Link>
                            ) : user ? (
                                <>
                                    {/* NavDropdown no se cierra solo. La función debe ir en los items. */}
                                    <NavDropdown title={`Hola, ${user.name}`} id="username" onClick={() => setExpanded(true)}>
                                        
                                        {/* 🔑 Enlaces dentro del Dropdown (se agrega handleNavClick) */}
                                        <NavDropdown.Item as={Link} to="/profile" onClick={handleNavClick}>
                                            Perfil
                                        </NavDropdown.Item>
                                        
                                        {user.isAdmin && (
                                            <NavDropdown.Item as={Link} to="/admin" onClick={handleNavClick}>
                                                Panel de Admin
                                            </NavDropdown.Item>
                                        )}
                                        {/* handleLogout ya hace una navegación, pero la forzamos a cerrar */}
                                        <NavDropdown.Item onClick={() => { handleLogout(); handleNavClick(); }}>
                                            Cerrar Sesión
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            ) : (
                                <>
                                    {/* 🔑 Enlaces Login/Registro (se agrega handleNavClick) */}
                                    <Nav.Link as={Link} to="/login" className="fw-bold" onClick={handleNavClick}>
                                        <FontAwesomeIcon icon={faUser} />
                                        <span className="ms-1">Iniciar Sesión</span>
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/register" className="fw-bold" onClick={handleNavClick}>
                                        <FontAwesomeIcon icon={faUserPlus} />
                                        <span className="ms-1">Registrarse</span>
                                    </Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;