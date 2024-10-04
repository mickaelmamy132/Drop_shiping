import React, { useState, useEffect } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Link } from '@inertiajs/react';

const StyledCard = styled(motion.div)`
  background: white;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StyledTitle = styled.h2`
  color: #2c3e50;
  font-size: 24px;
  margin-bottom: 20px;
`;

const StyledInfo = styled.p`
  margin: 10px 0;
  font-size: 16px;
  color: #34495e;
`;

const StyledImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const StyledStrong = styled.strong`
  color: #3498db;
`;

const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
};

const hoverAnimation = {
    scale: 1.05,
    transition: { duration: 0.3 }
};

export default function Produit_lot_infos({ auth, produit_lot }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            role={auth.role}
        >
            <motion.div
                className="produit-lot-infos"
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                variants={fadeIn}
            >
                <Link href='/Acheteur' className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600 transition-colors duration-300 transform hover:scale-105 my-4 inline-block">retour</Link>

                <StyledTitle>Informations du Produit/Lot</StyledTitle>

                {produit_lot && produit_lot.length > 0 ? (
                    <>
                        <StyledCard
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                            whileHover={hoverAnimation}
                        >
                            <StyledTitle>Informations générales</StyledTitle>
                            {produit_lot[0].image_lot && (
                                <StyledImage src={`/storage/${produit_lot[0].image_lot}`} alt="Image du lot" />
                            )}
                            <StyledInfo><StyledStrong>Nom:</StyledStrong> {produit_lot[0].nom || 'Non disponible'}</StyledInfo>
                            <StyledInfo><StyledStrong>Description:</StyledStrong> {produit_lot[0].description || 'Non disponible'}</StyledInfo>
                            <StyledInfo><StyledStrong>Prix:</StyledStrong> {produit_lot[0].prix ? `${produit_lot[0].prix} €` : 'Non disponible'}</StyledInfo>
                            <StyledInfo><StyledStrong>Quantité:</StyledStrong> {produit_lot[0].quantite || 'Non disponible'}</StyledInfo>
                            <StyledInfo><StyledStrong>État:</StyledStrong> {produit_lot[0].etat || 'Non disponible'}</StyledInfo>
                        </StyledCard>

                        <StyledCard
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                            whileHover={hoverAnimation}
                        >
                            <StyledTitle>Catégorie</StyledTitle>
                            <StyledInfo><StyledStrong>Nom de la catégorie:</StyledStrong> {produit_lot[0].categorie.nom || 'Non disponible'}</StyledInfo>
                        </StyledCard>

                        {produit_lot[0].enchere && produit_lot[0].enchere.length > 0 && (
                            <StyledCard
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.3 }}
                                whileHover={hoverAnimation}
                            >
                                <StyledTitle>Enchère</StyledTitle>
                                <StyledInfo><StyledStrong>Montant de l'enchère:</StyledStrong> {produit_lot[0].enchere[0].montant || 'Non disponible'} €</StyledInfo>
                                <StyledInfo><StyledStrong>Nombre d'enchères:</StyledStrong> {produit_lot[0].enchere.length}</StyledInfo>
                                <StyledInfo><StyledStrong>Fin de l'enchère:</StyledStrong> {produit_lot[0].enchere[0].fin_enchere ? new Date(produit_lot[0].enchere[0].fin_enchere).toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }) : 'Non disponible'}</StyledInfo>
                            </StyledCard>
                        )}

                        {produit_lot[0].vendeur && (
                            <StyledCard
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.3 }}
                                whileHover={hoverAnimation}
                            >
                                <StyledTitle>Informations du vendeur</StyledTitle>
                                <StyledInfo><StyledStrong>Nom de l'entreprise:</StyledStrong> {produit_lot[0].vendeur.nom_de_l_entreprise || 'Non disponible'}</StyledInfo>
                                <StyledInfo><StyledStrong>Activité:</StyledStrong> {Array.isArray(produit_lot[0].vendeur.activite) && produit_lot[0].vendeur.activite.length > 0 ? produit_lot[0].vendeur.activite.flat().join(', ') : produit_lot[0].vendeur.activite || 'Non disponible'}</StyledInfo>
                                <StyledInfo><StyledStrong>Ville:</StyledStrong> {produit_lot[0].vendeur.ville || 'Non disponible'}</StyledInfo>
                            </StyledCard>
                        )}
                    </>
                ) : (
                    <StyledCard
                        whileHover={hoverAnimation}
                    >
                        <StyledInfo>Aucune information disponible pour ce produit/lot.</StyledInfo>
                    </StyledCard>
                )}
            </motion.div>
        </AuthenticatedLayout>
    )
}