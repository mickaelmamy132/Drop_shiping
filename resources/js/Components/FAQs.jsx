import React, { useState } from "react";
import { motion } from "framer-motion";

const FAQs = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-20 overflow-hidden bg-white pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]"
    >
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="-mx-4 flex flex-wrap"
        >
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[520px] text-center lg:mb-20">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="mb-2 block text-lg font-semibold text-primary"
              >
                FAQ
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="mb-4 text-3xl font-bold text-dark dark:text-white sm:text-[40px]/[48px]"
              >
                Questions fréquentes
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="text-base text-body-color dark:text-dark-6"
              >
                Retrouvez ici les réponses aux questions les plus fréquemment posées
              </motion.p>
            </div>
          </div>
        </motion.div>

        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-1/2">
            <AccordionItem
              header="Comment puis-je créer un compte ?"
              text="Pour créer un compte sur Stocklear, il faut tout d'abord remplir un formulaire d'inscription. Vous serez invité à fournir le nom de votre entreprise, votre numéro SIRET, votre nom, email et numéro de téléphone ainsi qu'un document officiel attestant de votre activité professionnelle. Un email de confirmation vous sera envoyé à l'adresse e-mail que vous avez fournie. Nous prendrons ensuite contact avec vous par téléphone pour confirmer la validation de votre compte et vous donner un accès total à la plateforme sous 48H maximum."
            />
            <AccordionItem
              header="Comment puis-je filtrer et trier les lots en ligne ?"
              text="Vous disposez d'une barre latérale dédiée à filtrer tous les lots par qualité, catégories, localisation et prix public. De plus, vous pouvez trier le résultat des filtres par date de mise en ligne, fin de l'enchère et nombre d'unités du lot."
            />
            <AccordionItem
              header="Comment puis-je placer une enchère ?"
              text="Tout d'abord, assurez-vous d'être connecté à votre compte pour pouvoir enchérir. Si vous ne possédez pas de compte, inscrivez-vous dès maintenant. Une fois connecté, sélectionnez l'offre qui vous intéresse, vous avez à votre disposition 3 méthodes d'enchères : Enchères rapides : des montants prédéfinis dynamiquement pour une enchère rapide, Enchère fixe : un montant fixe d'enchère, unique et personnalisé, Enchère automatique : vous laissez notre système enchérir à votre place en lui indiquant le montant maximum que vous êtes prêt à payer pour le lot."
            />
            <AccordionItem
              header="Comment puis-je savoir exactement dans quel état est chaque produit d'une offre ?"
              text="A l'intérieur de la page du lot, dans la zone intitulée « Contenu du lot », l'état des produit est détaillé avec précision et classifié selon la qualité, marque et catégorie. Le listing des produits inclut des informations telles que : la description de l'article, la quantité, le modèle, l'EAN, la description et le prix de vente au détail (RRP). Le listing des produits peut être téléchargé en format Microsoft Excel."
            />
            <AccordionItem
              header="Comment puis-je savoir quand une vente aux enchères prendra fin ?"
              text="Sur chaque lot, vous trouverez en compte à rebours dynamique au dessus de la zone de soumission d'enchère à droite qui indique le temps restant pour la vente en question. Compte à rebours rouge : enchère se terminant dans les 24h. Compte à rebours bleu : enchère se terminant dans les 48h. Compte à rebours gris : enchère se terminant dans plus de 48h."
            />
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <AccordionItem
              header="Comment puis-je savoir si mon enchère a été acceptée ?"
              text="Si votre dernière enchère vous permet de remporter le lot, vous recevrez par mail la confirmation de votre commande. Par ailleurs, dans votre espace client accessible depuis le bouton 'Mon compte', vous pouvez accéder à vos commandes acceptées depuis le menu 'Mes commandes'. Notez que les enchères acceptées sont considérées juridiquement comme une obligation contractuelle (cf. les conditions générales de ventes)."
            />
            <AccordionItem
              header="Comment puis-je suivre mes enchères en cours ?"
              text="Dans votre espace client accessible depuis le bouton 'Mon compte', vous pouvez accéder à vos enchères en cours depuis le menu 'Offres en cours'. De plus, une bordure de couleur est ajoutée sur les cartes des lots sur lesquelles vous avez placé des enchères. Bordure verte : offre avec une enchère en cours la plus haute, Bordure orange : offre avec une enchère en cours inférieure à la dernière enchère où il faudra réenchérir pour la remporter."
            />
            <AccordionItem
              header="Comment puis-je vérifier l'état d'un paiement ?"
              text="Dans votre espace client accessible depuis le bouton 'Mon compte', vous pouvez accéder à vos commandes depuis le menu 'Mes commandes' et suivre l'avancement de celles-ci. Le statut de virement bancaire passe de « Non réglé », à « Traitement » jusqu'à ce que la réception complète des fonds soit confirmée. A ce moment-là, l'état passe de « Traitement » à « Payé »."
            />
            <AccordionItem
              header="Comment récupérer la marchandise moi même ?"
              text="Dès la réception de votre paiement, nous vous contactons pour convenir d'un rendez-vous d'enlèvement de la marchandise. Attention, ce rendez-vous est essentiel. Sans cela, l'enlèvement de la marchandise pourra vous êtes refusé et il faudra replannifier un enlèvement."
            />
            <AccordionItem
              header="Il y a un problème avec ma commande, que faire ?"
              text="Pour chaque lot remporté, vous disposez d'un délai de 5 jours ouvrés (7 jours calendaires) à compter de la réception de la commande pour déclarer un litige et nous informer des problèmes constatés. Cette fonctionnalité est disponible depuis la commande en cliquant sur 'Ouvrir un litige'. Vous aurez ensuite accès à un système pour qualifier tous vos produits litigieux et nous transmettre toutes les informations nécessaires pour nous permettre de traiter le litige avec le vendeur du lot."
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 z-[-1]">
        <svg
          width="1440"
          height="886"
          viewBox="0 0 1440 886"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.5"
            d="M193.307 -273.321L1480.87 1014.24L1121.85 1373.26C1121.85 1373.26 731.745 983.231 478.513 729.927C225.976 477.317 -165.714 85.6993 -165.714 85.6993L193.307 -273.321Z"
            fill="url(#paint0_linear)"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="1308.65"
              y1="1142.58"
              x2="602.827"
              y2="-418.681"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3056D3" stopOpacity="0.36" />
              <stop offset="1" stopColor="#F5F2FD" stopOpacity="0" />
              <stop offset="1" stopColor="#F5F2FD" stopOpacity="0.096144" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </motion.section>
  );
};

export default FAQs;

const AccordionItem = ({ header, text }) => {
  const [active, setActive] = useState(false);

  const handleToggle = (e) => {
    e.preventDefault();
    setActive(!active);
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-8 w-full rounded-lg bg-white p-4 shadow-[0px_20px_95px_0px_rgba(201,203,204,0.30)] dark:bg-dark-2 dark:shadow-[0px_20px_95px_0px_rgba(0,0,0,0.30)] sm:p-8 lg:px-6 xl:px-8"
    >
      <button
        className={`faq-btn flex w-full text-left`}
        onClick={handleToggle}
      >
        <div className="mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-primary/5 text-primary dark:bg-white/5">
          <motion.svg
            animate={{ rotate: active ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="fill-primary stroke-primary"
            width="17"
            height="10"
            viewBox="0 0 17 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.28687 8.43257L7.28679 8.43265L7.29496 8.43985C7.62576 8.73124 8.02464 8.86001 8.41472 8.86001C8.83092 8.86001 9.22376 8.69083 9.53447 8.41713L9.53454 8.41721L9.54184 8.41052L15.7631 2.70784L15.7691 2.70231L15.7749 2.69659C16.0981 2.38028 16.1985 1.80579 15.7981 1.41393C15.4803 1.1028 14.9167 1.00854 14.5249 1.38489L8.41472 7.00806L2.29995 1.38063L2.29151 1.37286L2.28271 1.36548C1.93092 1.07036 1.38469 1.06804 1.03129 1.41393L1.01755 1.42738L1.00488 1.44184C0.69687 1.79355 0.695778 2.34549 1.0545 2.69659L1.05999 2.70196L1.06565 2.70717L7.28687 8.43257Z"
              fill=""
              stroke=""
            />
          </motion.svg>
        </div>

        <div className="w-full">
          <h4 className="mt-1 text-lg font-semibold text-dark dark:text-white">
            {header}
          </h4>
        </div>
      </button>

      <motion.div
        initial={false}
        animate={{ height: active ? "auto" : 0, opacity: active ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="pl-[62px] overflow-hidden"
      >
        <p className="py-3 text-base leading-relaxed text-body-color dark:text-dark-6">
          {text}
        </p>
      </motion.div>
    </motion.div>
  );
};
