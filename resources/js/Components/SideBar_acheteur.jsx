import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingCartIcon,
  InboxIcon,
  ListBulletIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import { Link, usePage } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";

export function MultiLevelSidebar_acheteur({ darkMode }) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
  const [showLotsSubMenu, setShowLotsSubMenu] = useState(false);
  const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth < 1000);
  const { url } = usePage();

  const isActive = (path) => url.startsWith(path);

  useEffect(() => {
    const handleResize = () => setIsScreenSmall(window.innerWidth < 1000);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  const listItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const subMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
  };

  return (
    <>
      {/* Button to toggle the sidebar on small screens */}
      {isScreenSmall && (
        <div className="fixed top-0 left-0 right-4 z-50 p-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowingNavigationDropdown((prev) => !prev)}
            className={`inline-flex items-center justify-center p-2 rounded-md ${darkMode ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' : 'text-gray-400 hover:text-gray-500 hover:bg-gray-100'} focus:outline-none transition duration-150 ease-in-out`}
          >
            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path
                className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </motion.button>
        </div>
      )}

      {/* Sidebar with animation */}
      <AnimatePresence>
        {(showingNavigationDropdown || !isScreenSmall) && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            transition={{ duration: 0.3 }}
            className="sm:block"
          >
            <Card className={`h-screen w-full max-w-[25rem] p-4 shadow-xl shadow-blue-gray-900/5 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="mb-2 p-4">
                <Typography variant="h5" color={darkMode ? "white" : "blue-gray"} className="font-bold">
                  Menu Principal
                </Typography>
              </div>
              <List>
                <motion.div variants={listItemVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
                  <Link href={route('Acheteur')} className={`flex items-center ${isActive('/Acheteur') ? 'text-blue-500 border-b-2 border-blue-500' : darkMode ? 'text-gray-300' : 'text-blue-gray-700'} hover:text-blue-500 transition-colors duration-300 mb-4`}>
                    <ListItemPrefix>
                      <PresentationChartBarIcon className="h-5 w-5 mr-3" />
                    </ListItemPrefix>
                    <Typography color={isActive('/Acheteur') ? "blue" : darkMode ? "white" : "blue-gray"} className="font-normal">
                      Tableau de bord
                    </Typography>
                  </Link>
                </motion.div>
                <motion.div variants={listItemVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                  <Link href={route('Panie.index')} className={`flex items-center ${isActive('/Panie') ? 'text-blue-500 border-b-2 border-blue-500' : darkMode ? 'text-gray-300' : 'text-blue-gray-700'} hover:text-blue-500 transition-colors duration-300 mb-4`}>
                    <ListItemPrefix>
                      <ShoppingCartIcon className="h-5 w-5 mr-3" />
                    </ListItemPrefix>
                    <Typography color={isActive('/Panie') ? "blue" : darkMode ? "white" : "blue-gray"} className="font-normal">
                      Mon panier
                    </Typography>
                  </Link>
                </motion.div>
                <motion.div variants={listItemVariants} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
                  <div
                    onClick={() => setShowLotsSubMenu(!showLotsSubMenu)}
                    className={`flex items-center justify-between cursor-pointer ${isActive('/Produit_lots') || isActive('/Produit') ? 'text-blue-500 border-b-2 border-blue-500' : darkMode ? 'text-gray-300' : 'text-blue-gray-700'} hover:text-blue-500 transition-colors duration-300 mb-4`}
                  >
                    <div className="flex items-center">
                      <ListItemPrefix>
                        <ListBulletIcon className="h-5 w-5 mr-3" />
                      </ListItemPrefix>
                      <Typography color={isActive('/Produit_lots') || isActive('/Produit') ? "blue" : darkMode ? "white" : "blue-gray"} className="font-normal">
                        Liste des lots
                      </Typography>
                    </div>
                    {showLotsSubMenu ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                  </div>
                  <AnimatePresence>
                    {showLotsSubMenu && (
                      <motion.div
                        variants={subMenuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="ml-8"
                      >
                        <Link
                          href={route('Produit_lots')}
                          className={`block py-2 ${darkMode ? 'text-gray-300' : 'text-blue-gray-700'} hover:text-blue-500`}
                        >
                          Tous les lots
                        </Link>
                        <Link
                          href={route('Produit.index')}
                          className={`block py-2 ${darkMode ? 'text-gray-300' : 'text-blue-gray-700'} hover:text-blue-500`}
                        >
                          Tous les articles
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
                <motion.div variants={listItemVariants} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
                  <Link href={route('Commande')}>
                    <ListItem className={`hover:bg-blue-50 transition-colors duration-300 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : ''}`}>
                      <ListItemPrefix>
                        <ShoppingBagIcon className="h-5 w-5" />
                      </ListItemPrefix>
                      Commande
                      <ListItemSuffix>
                        <Chip value="14" size="sm" variant="ghost" color="blue" className="rounded-full" />
                      </ListItemSuffix>
                    </ListItem>
                  </Link>
                </motion.div>
                <motion.div variants={listItemVariants} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
                  <ListItem className={`hover:bg-blue-50 transition-colors duration-300 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : ''}`}>
                    <ListItemPrefix>
                      <InboxIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Inbox
                    <ListItemSuffix>
                      <Chip value="14" size="sm" variant="ghost" color="blue" className="rounded-full" />
                    </ListItemSuffix>
                  </ListItem>
                </motion.div>
              </List>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>    </>
  );
}
