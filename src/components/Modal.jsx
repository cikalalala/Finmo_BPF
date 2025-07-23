// src/components/Modal.jsx
import React, { useEffect } from 'react';
import '../assets/Modal.css'; // Akan kita buat di langkah selanjutnya

const Modal = ({ show, onClose, children, title }) => {
    // Jika 'show' adalah false, jangan render modal sama sekali
    if (!show) {
        return null;
    }

    // Tangani penekanan tombol Escape untuk menutup modal
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEscape);
        // Cleanup function untuk menghapus event listener saat komponen unmount
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]); // Dependency array: jalankan ulang efek jika onClose berubah

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <span className="close-button" onClick={onClose}>&times;</span>
                {title && <h2>{title}</h2>} {/* Tampilkan judul jika ada */}
                {children} {/* Ini akan merender konten yang dilewatkan dari komponen induk */}
                <button className="modal-close-button" onClick={onClose}>Tutup</button>
            </div>
        </div>
    );
};

export default Modal;