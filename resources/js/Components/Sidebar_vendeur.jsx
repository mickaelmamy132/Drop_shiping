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
  InboxIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import { Link, usePage } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { ListBulletIcon } from "@heroicons/react/24/outline";

export function MultiLevelSidebar_vendeur({ darkMode }) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
  const [showLotsSubMenu, setShowLotsSubMenu] = useState(false);
  const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth < 1068);
  const { url } = usePage();

  const isActive = (path) => {
    return url.startsWith(path);
  };

  useEffect(() => {
    const handleResize = () => setIsScreenSmall(window.innerWidth < 1068);
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
    <div className="block min-h-screen">
      <div className={`${isScreenSmall ? 'w-full' : 'w-[30\rem]'}`}>
        {isScreenSmall && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowingNavigationDropdown((prev) => !prev)}
            className={`fixed top-4 left-4 inline-flex items-center justify-center p-2 rounded-md ${darkMode ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' : 'text-gray-400 hover:text-gray-500 hover:bg-gray-100'} focus:outline-none transition duration-150 ease-in-out z-50`}
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
        )}

        <AnimatePresence>
          {(showingNavigationDropdown || !isScreenSmall) && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              transition={{ duration: 0.3 }}
              className="block h-full"
            >
              <div className={`${showingNavigationDropdown && isScreenSmall ? 'bg-black bg-opacity-50' : ''}`} onClick={() => isScreenSmall && setShowingNavigationDropdown(false)} />
              <Card className={`h-screen w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="mb-2 p-4 text-center">
                  <Typography variant="h5" color={darkMode ? "white" : "blue-gray"} className="font-bold">
                    Menu Principal
                  </Typography>
                </div>
                <List>
                  <motion.div variants={listItemVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
                    <Link
                      href={route('dashboard')}
                      className={`flex items-center justify-center gap-3 w-full ${isActive('/dashboard') ? 'text-blue-500 border-b-2 border-blue-500' : darkMode ? 'text-gray-300' : 'text-blue-gray-700'} hover:text-blue-500 transition-colors duration-300 mb-4`}>
                      <PresentationChartBarIcon className="h-5 w-5" />
                      <Typography color={isActive('/Vendeur') ? "blue" : darkMode ? "white" : "blue-gray"} className="font-normal">
                        Dashboard
                      </Typography>
                    </Link>
                  </motion.div>

                  <motion.div variants={listItemVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                    <div
                      onClick={() => setShowLotsSubMenu(!showLotsSubMenu)}
                      className={`flex items-center justify-center w-full cursor-pointer ${isActive('/Produit_Lot') ? 'text-blue-500 border-b-2 border-blue-500' : darkMode ? 'text-gray-300' : 'text-blue-gray-700'} hover:text-blue-500 transition-colors duration-300 mb-4`}
                    >
                      <div className="flex items-center justify-center w-full">
                        <div className="flex items-center justify-center gap-3">
                          <ListBulletIcon className="h-5 w-5" />
                          <Typography color={isActive('/Produit_Lot') || isActive('/Mes_rubrique/show') ? "blue" : darkMode ? "white" : "blue-gray"} className="font-normal">
                            Article/Rubrique
                          </Typography>
                        </div>
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
                          className="ml-8 block text-center"
                        >
                          <Link
                            href={route('Mes_rubrique/show')}
                            className={`block py-2 ${darkMode ? 'text-gray-300' : 'text-blue-gray-700'} hover:text-blue-500`}>
                            Mes rubrique
                          </Link>
                          <Link
                            href={route('Produit_Lot.index')}
                            className={`block py-2 ${darkMode ? 'text-gray-300' : 'text-blue-gray-700'} hover:text-blue-500`}>
                            Mes lots
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <motion.div variants={listItemVariants} initial="hidden" animate="visible" transition={{ delay: 0.4 }} className="flex justify-center">
                    <Link
                      href={route('Commande_vendeur')}
                      className={`w-full text-center ${isActive('/Commande_vendeur') ? 'text-blue-500 border-b-2 border-blue-500' : darkMode ? 'text-gray-300' : 'text-blue-gray-700'} hover:text-blue-500 transition-colors duration-300 mb-4`}
                    >
                      <div className={`flex items-center justify-center gap-3 p-3 hover:bg-blue-50 transition-colors duration-300 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : ''}`}>
                        <ShoppingBagIcon className="h-5 w-5" />
                        <Typography color={isActive('/Commande_vendeur') ? "blue" : darkMode ? "white" : "blue-gray"} className="font-normal">
                          Commande
                        </Typography>
                        <Chip value="14" size="sm" variant="ghost" color="blue" className="rounded-full" />
                      </div>
                    </Link>
                  </motion.div>

                  <motion.div variants={listItemVariants} initial="hidden" animate="visible" transition={{ delay: 0.4 }} className="flex justify-center">
                    <Link
                      href={route('inbox_vendeur')}
                      className={`w-full text-center ${isActive('/inbox_vendeur') ? 'text-blue-500 border-b-2 border-blue-500' : darkMode ? 'text-gray-300' : 'text-blue-gray-700'} hover:text-blue-500 transition-colors duration-300 mb-4`}
                    >
                      <div className={`flex items-center justify-center gap-3 p-3 hover:bg-blue-50 transition-colors duration-300 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : ''}`}>
                        <InboxIcon className="h-5 w-5" />
                        <Typography color={isActive('/inbox_vendeur') ? "blue" : darkMode ? "white" : "blue-gray"} className="font-normal">
                          Inbox
                        </Typography>
                        <Chip value="14" size="sm" variant="ghost" color="blue" className="rounded-full" />
                      </div>
                    </Link>
                  </motion.div>
                </List>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div >
  );
}