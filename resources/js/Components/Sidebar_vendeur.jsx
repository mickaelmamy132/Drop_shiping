import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  List,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  InboxIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ShoppingBagIcon,
  ListBulletIcon,
} from "@heroicons/react/24/solid";
import { Link, usePage } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";

export function MultiLevelSidebar_vendeur({ darkMode }) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
  const [showLotsSubMenu, setShowLotsSubMenu] = useState(false);
  const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth < 1068);
  const { url } = usePage();

  const isActive = (path) => url.startsWith(path);

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
    <div className="flex min-h-screen">
      <div className={`${isScreenSmall ? "w-full" : "w-[20rem]"}`}>
        {isScreenSmall && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowingNavigationDropdown((prev) => !prev)}
            className={`fixed top-4 left-4 inline-flex items-center justify-center p-2 rounded-md ${
              darkMode
                ? "text-gray-400 hover:text-gray-300 hover:bg-gray-700"
                : "text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            } focus:outline-none transition duration-150 ease-in-out z-50`}
          >
            <svg
              className="h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                className={!showingNavigationDropdown ? "inline-flex" : "hidden"}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                className={showingNavigationDropdown ? "inline-flex" : "hidden"}
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
              className="h-full"
            >
              <Card
                className={`h-screen w-[20rem] p-4 shadow-xl ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div className="mb-4 text-center">
                  <Typography variant="h5" color={darkMode ? "white" : "blue-gray"} className="font-bold">
                    Vendeur
                  </Typography>
                </div>
                <List>
                  <motion.div
                    variants={listItemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.1 }}
                  >
                    <Link
                      href={route('dashboard')}
                      className={`flex items-center gap-3 py-3 px-4 rounded-md ${
                        isActive('/dashboard')
                          ? "text-blue-500 bg-blue-50"
                          : darkMode
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-blue-gray-700 hover:bg-blue-50"
                      }`}
                    >
                      <PresentationChartBarIcon className="h-5 w-5" />
                      <Typography className="font-normal">Dashboard</Typography>
                    </Link>
                  </motion.div>

                  <motion.div
                    variants={listItemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.2 }}
                  >
                    <div
                      onClick={() => setShowLotsSubMenu(!showLotsSubMenu)}
                      className={`flex items-center justify-between cursor-pointer py-3 px-4 rounded-md ${
                        isActive('/Produit_Lot') || isActive('/Mes_rubrique/show')
                          ? "text-blue-500 bg-blue-50"
                          : darkMode
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-blue-gray-700 hover:bg-blue-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <ListBulletIcon className="h-5 w-5" />
                        <Typography className="font-normal">Article/Rubrique</Typography>
                      </div>
                      {showLotsSubMenu ? (
                        <ChevronUpIcon className="h-5 w-5" />
                      ) : (
                        <ChevronDownIcon className="h-5 w-5" />
                      )}
                    </div>
                    <AnimatePresence>
                      {showLotsSubMenu && (
                        <motion.div
                          variants={subMenuVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          className="ml-8 space-y-2"
                        >
                          <Link
                            href={route('Mes_rubrique/show')}
                            className={`block py-2 ${
                              darkMode
                                ? "text-gray-300 hover:text-blue-500"
                                : "text-blue-gray-700 hover:text-blue-500"
                            }`}
                          >
                            Mes rubrique
                          </Link>
                          <Link
                            href={route('Produit_Lot.index')}
                            className={`block py-2 ${
                              darkMode
                                ? "text-gray-300 hover:text-blue-500"
                                : "text-blue-gray-700 hover:text-blue-500"
                            }`}
                          >
                            Mes lots
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <motion.div
                    variants={listItemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.3 }}
                  >
                    <Link
                      href={route('Commande_vendeur')}
                      className={`flex items-center gap-3 py-3 px-4 rounded-md ${
                        isActive('/Commande_vendeur')
                          ? "text-blue-500 bg-blue-50"
                          : darkMode
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-blue-gray-700 hover:bg-blue-50"
                      }`}
                    >
                      <ShoppingBagIcon className="h-5 w-5" />
                      <Typography className="font-normal">Commande</Typography>
                      <Chip value="14" size="sm" variant="ghost" color="blue" className="rounded-full" />
                    </Link>
                  </motion.div>

                  <motion.div
                    variants={listItemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.4 }}
                  >
                    <Link
                      href={route('inbox_vendeur')}
                      className={`flex items-center gap-3 py-3 px-4 rounded-md ${
                        isActive('/inbox_vendeur')
                          ? "text-blue-500 bg-blue-50"
                          : darkMode
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-blue-gray-700 hover:bg-blue-50"
                      }`}
                    >
                      <InboxIcon className="h-5 w-5" />
                      <Typography className="font-normal">Inbox</Typography>
                      <Chip value="14" size="sm" variant="ghost" color="blue" className="rounded-full" />
                    </Link>
                  </motion.div>
                </List>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}