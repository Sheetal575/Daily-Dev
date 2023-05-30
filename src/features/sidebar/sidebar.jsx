"use client";
import { useState } from "react";
import ChevronDoubleLeft from "../../icons/chevron-double-left";
import styles from "./sidebar.module.scss";
import { NavigationService } from "../../services/navigation";
import { NewSourceModal } from "../new-source-modal/new-source-modal";
import { usePathname, useRouter } from "next/navigation";
import Button from "../../components/button/button";
import { ChooseTagModal } from "../choose-tag-modal/choose-tag-modal";
import { InvitePeople } from "../invite-people/invite-people";

const MenuItems = ({ handleShowModal, showModal }) => {
  const router = useRouter();
  const pathname = usePathname();

  const getModalName = (url) => {
    switch (url) {
      case "suggest-new-source":
        handleShowModal({
          newSource: true,
          choosetags: false,
          invitepeople: false,
        });
      case "invite-people":
        handleShowModal({
          newSource: false,
          choosetags: false,
          invitepeople: true,
        });
      default:
        return 0;
    }
  };
  const handleMenuItems = (url) => {
    console.log(url);
    if (url === "suggest-new-source") {
      handleShowModal({
        newSource: true,
        choosetags: false,
        invitepeople: false,
      });
    } else if (url === "invite-people") {
      handleShowModal({
        newSource: false,
        choosetags: false,
        invitepeople: true,
      });
    } else {
      if (url === "/feedback") {
        window.open(url, "_blank");
      } else {
        router.push(url);
      }
    }
  };

  const handleChooseTags = () => {
    handleShowModal({ newSource: false, choosetags: true });
  };
  return (
    <div className={styles.sidebar__content}>
      <button
        className={`${styles["choose-tags"]} ${
          showModal.choosetags ? styles["choose-tags-active"] : ""
        }`}
        onClick={handleChooseTags}
      >
        Choose tags
      </button>
      {NavigationService.map((menu) => (
        <button
          className={`${styles["menu-item"]} ${
            pathname === menu?.url ? styles["menu-item-active"] : ""
          }`}
          onClick={() => handleMenuItems(menu.url)}
        >
          {menu?.icon}
          <span>{menu?.title}</span>
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
  const [showModal, setShowModal] = useState({
    newSource: false,
    choosetags: false,
    invitepeople: false,
  });

  const handleSideBarCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleShowModal = (obj) => {
    setShowModal(obj);
  };
  return (
    <>
      <div
        className={`${styles.sidebar} ${
          isCollapsed ? styles["sidebar-collapsed"] : ""
        }`}
      >
        {!isCollapsed && (
          <MenuItems handleShowModal={handleShowModal} showModal={showModal} />
        )}
        <SidebarFooter
          isCollapsed={isCollapsed}
          handleSideBarCollapsed={handleSideBarCollapsed}
        />
      </div>
      <NewSourceModal
        isOpen={showModal.newSource}
        onClose={() => setShowModal(!showModal)}
      />
      <ChooseTagModal
        isOpen={showModal.choosetags}
        onClose={() => setShowModal(!showModal)}
      />
      <InvitePeople
        isOpen={showModal.invitepeople}
        onClose={() => setShowModal(!showModal)}
      />
    </>
  );
};

export default Sidebar;
