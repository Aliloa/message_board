'use client';
import { useState, useEffect, useRef } from "react";

import Messages from '../Message/Message';
import Form from '../Form/Form';
import styles from './Board.module.css';

import Image from "next/image";


export default function Board() {
    const [formPosition, setFormPosition] = useState(null); // Stocke la position de la souris
    const [messages, setMessages] = useState([]);

    const updateMessages = (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    const handleBoardClick = (e) => {
        const board = e.currentTarget.getBoundingClientRect(); // Récupère la taille et position du board
        const xPercent = ((e.clientX - board.left) / board.width) * 100;
        const yPercent = ((e.clientY - board.top) / board.height) * 100;

        setFormPosition({ x: xPercent, y: yPercent });
    };

    const closeForm = () => {
        setFormPosition(null); // Cache le formulaire après envoi
    };

    return (
        <div className={styles.container} onClick={handleBoardClick} style={{ backgroundImage: 'url(/images/background.png)', backgroundSize: 'cover', }}>
            <Messages />
            {formPosition && (
                <div
                    className={styles.formContainer}
                    style={{ left: `${formPosition.x}%`, top: `${formPosition.y}%` }}
                    onClick={(e) => e.stopPropagation()} // Empêche la fermeture en cliquant sur le formulaire
                >
                    <Form x={formPosition.x} y={formPosition.y} closeForm={closeForm} updateMessages={updateMessages}/>
                </div>
            )}
        </div>
    )
}