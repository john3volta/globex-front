import React from 'react';

interface User {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  position_name: string;
  department: string;
  hire_date: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, user }) => {
  if (!isOpen || !user) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="modal">
        <div className="modal__header">
          <h2 className="modal__title user-card__name">{user.name}</h2>
          <button className="modal__close-btn" onClick={onClose}>
            <svg className="modal__close-icon">
              <use href="#icon-close" />
            </svg>
          </button>
        </div>
        
        <div className="modal__content">
            <div className="modal__info">
              <span className="modal__info-label">Телефон:</span>
              <span className="modal__info-value">{user.phone}</span>
            </div>
            <div className="modal__info">
              <span className="modal__info-label">Почта:</span>
              <span className="modal__info-value">{user.email}</span>
            </div>
            <div className="modal__info">
              <span className="modal__info-label">Дата приема:</span>
              <span className="modal__info-value">{user.hire_date}</span>
            </div>
            <div className="modal__info">
              <span className="modal__info-label">Должность:</span>
              <span className="modal__info-value">{user.position_name}</span>
            </div>
            <div className="modal__info">
              <span className="modal__info-label">Подразделение:</span>
              <span className="modal__info-value">{user.department}</span>
            </div>
              <div className="modal__info">
              <span className="modal__info-label">Дополнительная информация:</span>
              <span className="modal__info-value">{user.address}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Modal; 