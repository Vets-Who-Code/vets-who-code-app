import React, { useEffect } from "react";
import Router from 'next/router';
import styled from "styled-components";


const Container = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
    text-align: center;
`;

const SuccessMessage = styled.p`
    color: red;
    font-size: 18px;
`;

const contactSuccess: React.FC = () => {

    useEffect(() => {
        const timeout = setTimeout(() => {
          Router.push('/');
        }, 5000);
    
        return () => clearTimeout(timeout);
      }, [Router]);

    return (
        <Container>
            <img src="https://res.cloudinary.com/vetswhocode/image/upload/f_auto,q_auto/v1627489505/VWC_Logo_Horizontal_gsxn3h.png" alt="Logo" width="158" height="26"></img>
            <br />
            <SuccessMessage> 
                Thank you for your message!
                We have received your message and will get back to you shortly.
            </SuccessMessage>
        </Container>
    );
};

export default contactSuccess;