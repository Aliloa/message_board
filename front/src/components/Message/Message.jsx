'use client';
import { useState, useEffect, useRef } from "react";
import { createPopper } from "@popperjs/core";
import styles from './Messages.module.css';

export default function Messages() {
    const [messages, setMessages] = useState([]);
    const popperInstances = useRef([]);

    useEffect(() => {
        fetch('https://messageboard-production-4657.up.railway.app/messages')
            .then(response => response.json())
            .then(data => setMessages(data))
            .catch(error => console.error('Erreur lors de la récupération des messages:', error));
    }, []);

    useEffect(() => {
        // Cleanup existing poppers before creating new ones
        popperInstances.current.forEach(instance => instance.destroy());
        popperInstances.current = [];

        messages.forEach((_, index) => {
            const dot = document.getElementById(`dot-${index}`);
            const tooltip = document.getElementById(`tooltip-${index}`);

            if (dot && tooltip) {
                const popper = createPopper(dot, tooltip, {
                    placement: 'auto', // Automatically adjust position
                    modifiers: [
                        {
                            name: 'preventOverflow',
                            options: {
                                boundary: 'viewport',
                            },
                        },
                    ],
                });
                popperInstances.current.push(popper);
            }
        });

        return () => {
            popperInstances.current.forEach(instance => instance.destroy());
        };
    }, [messages]);

    return (
        <div>
            {messages.map((message, index) => (
                <div key={index} className={styles.message}>
                    <div
                        className={styles.dotContainer}
                        style={{ left: `${message.x}%`, top: `${message.y}%` }}>
                        <div id={`dot-${index}`} className={styles.dot}></div>
                        <span id={`tooltip-${index}`} className={styles.tooltip}>
                            <p><strong>{message.auteur}:</strong> {message.texte}</p>
                            <small>{message.date}</small>
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}