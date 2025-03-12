'use client';

import { useState, useEffect } from "react";
import styles from "./Form.module.css";

export default function Form({ x, y, closeForm, updateMessages  }) {
    const getTodayDate = () => new Date().toISOString().split("T")[0]; // Récupère la date du jour au format YYYY-MM-DD

    const [formData, setFormData] = useState({
        texte: "",
        auteur: "",
        date: getTodayDate(),
        x: x, //x correspond au x du clique qu'on passe en paramètres
        y: y
    });

    // Met à jour x et y quand les props changent
    useEffect(() => {
        setFormData(prev => ({ ...prev, x, y }));
    }, [x, y]);

    // Fonction pour mettre à jour les champs du formulaire
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Fonction pour soumettre le formulaire
    const handleSubmit = async (e) => {

        try {
            const response = await fetch("https://messageboard-production-4657.up.railway.app/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error("Erreur lors de l'envoi du formulaire");

            const data = await response.json();
            console.log("Réponse du serveur :", data);
            updateMessages(data);
            alert("Formulaire envoyé avec succès !");
        } catch (error) {
            console.error("Erreur :", error);
        }
    };


    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <label>
                Nom
                <input type="text" name="auteur" value={formData.auteur} onChange={handleChange} />
            </label>
            <br />
            <label>
                Message
                <textarea rows="3" cols="30" name="texte" value={formData.texte} onChange={handleChange} placeholder="Max characters 100" maxLength="100"/>
            </label>
            <br />
            {/* <p>Position : X = {x}, Y = {y}</p> */}
            <div className={styles.buttons}>
                <button type="submit">Envoyer</button>
                <button type="button" onClick={closeForm}>Annuler</button>
            </div>
        </form>
    )
}