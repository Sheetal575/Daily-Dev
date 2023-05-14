"use client";
import { useState } from "react";
import ChevronDoubleLeft from "../../icons/chevron-double-left";
import styles from "./sidebar.module.scss";
import { NavigationService } from "../../services/navigation";
import { NewSourceModal } from "../new-source-modal/new-source-modal";
import { useRouter } from "next/navigation";

const MenuItems = ({ handleShowModal }) => {
  const router = useRouter();
  const handleMenuItems = (url) => {
    if (!url) {
      handleShowModal();
    } else {
      router.push("/search");
    }
  };
  return (
    <div className={styles.sidebar__content}>
      {NavigationService.map((menu) => (
        <button
          className={`${styles["menu-item"]}`}
          onClick={() => handleMenuItems(menu.url)}
        >
          {menu.title}
        </button>
      ))}
    </div>
  );
};

const SidebarFooter = ({ handleSideBarCollapsed, isCollapsed }) => (
  <div
    className={`${styles.sidebar__footer} ${
      isCollapsed ? styles["sidebar__footer-collapsed"] : ""
    }`}
  >
    <button
      className={styles.sidebar__footer__button}
      onClick={handleSideBarCollapsed}
    >
      <div
        className={`${styles["icon-container"]} ${
          isCollapsed ? styles.rotate : ""
        }`}
      >
        <ChevronDoubleLeft size={20} strokeWidth={2} color="white" />
      </div>
    </button>
  </div>
);
const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSideBarCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleShowModal = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      <div
        className={`${styles.sidebar} ${
          isCollapsed ? styles["sidebar-collapsed"] : ""
        }`}
      >
        <MenuItems handleShowModal={handleShowModal} />
        <SidebarFooter
          isCollapsed={isCollapsed}
          handleSideBarCollapsed={handleSideBarCollapsed}
        />
      </div>
      <NewSourceModal
        isOpen={showModal}
        onClose={() => setShowModal(!showModal)}
      />
    </>
  );
};

export default Sidebar;
