import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer'; // Importamos el componente de estilo

// Colores oficiales de Panfleto
const COLORS = {
    panfletoBlack: '#171717', 
    panfletoYellow: '#F1CD3A', 
};

const OrderConfirm = () => {
    return (
        // Usamos el FormContainer para dar el mismo estilo
        <FormContainer>
            <div className="text-center" style={{ color: COLORS.panfletoBlack }}>
                {/* Título principal en Amarillo Panfleto */}
                <h1 className="mb-4" style={{ color: COLORS.panfletoBlack }}>
                    ¡Gracias por tu compra!
                </h1>
                {/* Texto principal en Negro Panfleto (color aplicado al div padre) */}
                <p className="lead">Tu pedido ha sido procesado con éxito.</p>
                <p>Puedes ver los detalles de tu compra y el estado de tu pedido en tu perfil.</p>
                <hr className="my-4" />
                {/* Botón estilizado con los colores de Panfleto */}
                <Button 
                    as={Link} 
                    to="/profile" 
                    className="mt-3"
                    // Estilos Panfleto para el botón
                    style={{ 
                        backgroundColor: COLORS.panfletoYellow, 
                        color: COLORS.panfletoBlack, 
                        borderColor: COLORS.panfletoYellow, 
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        padding: '10px 20px'
                    }}
                >
                    Ir a mi Perfil
                </Button>
            </div>
        </FormContainer>
    );
};

export default OrderConfirm;