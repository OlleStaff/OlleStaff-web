import styled from "@emotion/styled";

type ModalWrapperProps = {
    children: React.ReactNode;
    handleModalClose: () => void;
};

export default function ModalWrapper({ children, handleModalClose }: ModalWrapperProps) {
    return (
        <Backdrop onClick={handleModalClose}>
            <Content onClick={e => e.stopPropagation()}>{children}</Content>
        </Backdrop>
    );
}

const Backdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

const Content = styled.div`
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 12px;
    width: 333px;
    padding: 32px 25px 19px 25px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    animation: fadeIn 0.3s ease;
    gap: 12px;

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.95);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
