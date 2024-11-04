import React, { useState, useEffect } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Link } from '@inertiajs/react';
import { ChatBubbleBottomCenterTextIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';
import { Button } from 'antd';
import Chat_acheteur from '../../Components/Chat_acheteur';

const StyledCard = styled(motion.div)`
  background: white;
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
`;

const StyledTitle = styled.h2`
  color: #2c3e50;
  font-size: 28px;
  margin-bottom: 25px;
  font-weight: 600;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
`;

const StyledInfo = styled.p`
  margin: 15px 0;
  font-size: 18px;
  color: #34495e;
  line-height: 1.6;
`;

const StyledImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const StyledStrong = styled.strong`
  color: #3498db;
  font-weight: 600;
`;

const StyledButton = styled(Link)`
  background-color: #e74c3c;
  color: white;
  padding: 12px 24px;
  border-radius: 30px;
  font-size: 18px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;
  margin: 20px 0;
  box-shadow: 0 5px 15px rgba(231, 76, 60, 0.3);

  &:hover {
    background-color: #c0392b;
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(231, 76, 60, 0.4);
  }
`;

const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const hoverAnimation = {
    scale: 1.03,
    transition: { duration: 0.3 }
};

const staggerAnimation = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3
        }
    }
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 40px;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

export default function Produit_lot_infos({ auth, produit_lot }) {
    const [isVisible, setIsVisible] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);

    const handleOpenChat = () => {
        setIsChatOpen(true);
    };

    const handleCloseChat = () => {
        setIsChatOpen(false);
    };

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            role={auth.role}
        >
            <Container>
                <motion.div
                    className="produit-lot-infos"
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    variants={staggerAnimation}
                >
                    <motion.div variants={fadeIn}>
                        <StyledButton href='/Produit_lots'>Retour</StyledButton>
                    </motion.div>

                    <motion.div variants={fadeIn}>
                        <StyledTitle>Informations du Produit/Lot</StyledTitle>
                    </motion.div>

                    <FlexContainer>
                        <div className="product-info" style={{ flex: 2 }}>
                            {produit_lot && produit_lot.length > 0 ? (
                                <>
                                    <StyledCard variants={fadeIn} whileHover={hoverAnimation}>
                                        <StyledTitle>Informations générales</StyledTitle>
                                        {produit_lot[0].image_lot && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <StyledImage src={`/storage/${produit_lot[0].image_lot}`} alt="Image du lot" />
                                            </motion.div>
                                        )}
                                        <motion.div variants={staggerAnimation}>
                                            <motion.div variants={fadeIn}>
                                                <StyledInfo><StyledStrong>Nom:</StyledStrong> {produit_lot[0].nom || 'Non disponible'}</StyledInfo>
                                            </motion.div>
                                            <motion.div variants={fadeIn}>
                                                <StyledInfo><StyledStrong>Description:</StyledStrong> {produit_lot[0].description || 'Non disponible'}</StyledInfo>
                                            </motion.div>
                                            <motion.div variants={fadeIn}>
                                                <StyledInfo><StyledStrong>Prix:</StyledStrong> {produit_lot[0].prix ? `${produit_lot[0].prix} €` : 'Non disponible'}</StyledInfo>
                                            </motion.div>
                                            <motion.div variants={fadeIn}>
                                                <StyledInfo><StyledStrong>Quantité:</StyledStrong> {produit_lot[0].quantite || 'Non disponible'}</StyledInfo>
                                            </motion.div>
                                            <motion.div variants={fadeIn}>
                                                <StyledInfo><StyledStrong>État:</StyledStrong> {produit_lot[0].etat || 'Non disponible'}</StyledInfo>
                                            </motion.div>
                                            <motion.div variants={fadeIn}>
                                                <button onClick={handleOpenChat}>
                                                    <ChatBubbleOvalLeftEllipsisIcon className='w-7 h-6 mr-2 text-white' />
                                                </button>
                                            </motion.div>
                                        </motion.div>
                                    </StyledCard>

                                    <StyledCard variants={fadeIn} whileHover={hoverAnimation}>
                                        <StyledTitle>Catégorie</StyledTitle>
                                        <motion.div variants={fadeIn}>
                                            <StyledInfo><StyledStrong>Nom de la catégorie:</StyledStrong> {produit_lot[0].categorie.nom || 'Non disponible'}</StyledInfo>
                                        </motion.div>
                                    </StyledCard>

                                    {produit_lot[0].enchere && produit_lot[0].enchere.length > 0 && (
                                        <StyledCard variants={fadeIn} whileHover={hoverAnimation}>
                                            <StyledTitle>Enchère</StyledTitle>
                                            <motion.div variants={staggerAnimation}>
                                                <motion.div variants={fadeIn}>
                                                    <StyledInfo><StyledStrong>Montant du dernier enchère:</StyledStrong> {produit_lot[0].enchere[0].montant || 'Non disponible'} €</StyledInfo>
                                                </motion.div>
                                                <motion.div variants={fadeIn}>
                                                    <StyledInfo><StyledStrong>Nombre d'enchères:</StyledStrong> {produit_lot[0].enchere.length}</StyledInfo>
                                                </motion.div>
                                                <motion.div variants={fadeIn}>
                                                    <StyledInfo><StyledStrong>Fin de l'enchère:</StyledStrong> {produit_lot[0].enchere[0].fin_enchere ? new Date(produit_lot[0].enchere[0].fin_enchere).toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }) : 'Non disponible'}</StyledInfo>
                                                </motion.div>
                                            </motion.div>
                                        </StyledCard>
                                    )}

                                    {produit_lot[0].vendeur && (
                                        <StyledCard variants={fadeIn} whileHover={hoverAnimation}>
                                            <StyledTitle>Informations du vendeur</StyledTitle>
                                            <motion.div variants={staggerAnimation}>
                                                <motion.div variants={fadeIn}>
                                                    <StyledInfo><StyledStrong>Nom de l'entreprise:</StyledStrong> {produit_lot[0].vendeur.nom_de_l_entreprise || 'Non disponible'}</StyledInfo>
                                                </motion.div>

                                                <motion.div variants={fadeIn}>
                                                    <StyledInfo><StyledStrong>Activité:</StyledStrong> {Array.isArray(produit_lot[0].vendeur.activite) && produit_lot[0].vendeur.activite.length > 0 ? produit_lot[0].vendeur.activite.flat().join(', ') : produit_lot[0].vendeur.activite || 'Non disponible'}</StyledInfo>
                                                </motion.div>
                                                <motion.div variants={fadeIn}>
                                                    <StyledInfo><StyledStrong>Ville:</StyledStrong> {produit_lot[0].vendeur.ville || 'Non disponible'}</StyledInfo>
                                                </motion.div>
                                            </motion.div>
                                        </StyledCard>
                                    )}
                                </>
                            ) : (
                                <StyledCard variants={fadeIn} whileHover={hoverAnimation}>
                                    <StyledInfo>Aucune information disponible pour ce produit/lot.</StyledInfo>
                                </StyledCard>
                            )}
                        </div>

                        <div className="payment-info" style={{ flex: 1 }}>
                            <StyledCard variants={fadeIn} whileHover={hoverAnimation}>
                                <StyledTitle>Informations de paiement et de confiance</StyledTitle>
                                <motion.div variants={staggerAnimation}>
                                    <motion.div variants={fadeIn}>
                                        <StyledInfo><StyledStrong>Méthodes de paiement sécurisées:</StyledStrong> Nous acceptons les cartes de crédit, PayPal et les virements bancaires. Toutes les transactions sont cryptées et sécurisées.</StyledInfo>
                                    </motion.div>
                                    <motion.div variants={fadeIn}>
                                        <StyledInfo><StyledStrong>Garantie de satisfaction:</StyledStrong> Nous offrons une garantie de remboursement de 30 jours pour tous les achats effectués sur notre site.</StyledInfo>
                                    </motion.div>
                                    <motion.div variants={fadeIn}>
                                        <StyledInfo><StyledStrong>Vérification des vendeurs:</StyledStrong> Tous nos vendeurs sont soigneusement vérifiés pour assurer la qualité et la fiabilité des produits proposés.</StyledInfo>
                                    </motion.div>
                                    <motion.div variants={fadeIn}>
                                        <StyledInfo><StyledStrong>Service client:</StyledStrong> Notre équipe de support est disponible 24/7 pour répondre à vos questions et résoudre tout problème éventuel.</StyledInfo>
                                    </motion.div>
                                    <motion.div variants={fadeIn}>
                                        <StyledInfo><StyledStrong>Protection des données:</StyledStrong> Vos informations personnelles sont protégées conformément aux réglementations en vigueur sur la protection des données.</StyledInfo>
                                    </motion.div>
                                </motion.div>
                            </StyledCard>
                            <StyledButton
                                as={motion.button}
                                variants={fadeIn}
                                whileHover={{
                                    scale: 1.05,
                                    backgroundColor: '#2980b9'
                                }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '100%',
                                    marginTop: '20px',
                                    backgroundColor: '#3498db'
                                }}
                                onClick={handleOpenChat}
                            >
                                <ChatBubbleBottomCenterTextIcon className="w-6 h-6 mr-2" />
                                Discuter avec le vendeur
                            </StyledButton>
                            <Chat_acheteur
                                productId={produit_lot[0].id}
                                buyerId={auth.user.id}
                                sellerId= {produit_lot[0].vendeur.user.id}
                                isOpen={isChatOpen}
                                onClose={handleCloseChat}
                            />
                        </div>
                    </FlexContainer>
                </motion.div>
            </Container>
        </AuthenticatedLayout>
    )
}