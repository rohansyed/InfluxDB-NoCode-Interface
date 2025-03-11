import LoginModal from "./login-modal.jsx";
import RegisterModal from "./register-modal.jsx";
import { useState } from "react";

// Wrapper component for login and register modals
const AuthModal = () => {
    const [loginModalOpen, setLoginModalOpen] = useState(true);
    const [registerModalOpen, setRegisterModalOpen] = useState(false);

    const handleCloseLoginModal = () => {
        setLoginModalOpen(false);
    };

    const handleCloseRegisterModal = () => {
        setRegisterModalOpen(false);
    };

    const handleToggleAuthModals = () => {
        setLoginModalOpen(prevState => !prevState);
        setRegisterModalOpen(prevState => !prevState);
    };

    return (
        <>
            <LoginModal isOpen={loginModalOpen} onClose={handleCloseLoginModal} toggleModalView={handleToggleAuthModals}/>
            <RegisterModal isOpen={registerModalOpen} onClose={handleCloseRegisterModal} toggleModalView={handleToggleAuthModals}/>
        </>
    );
};

export default AuthModal;