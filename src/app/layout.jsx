"use client";

import "../../styles/globals.scss";
import Header from "../features/header/header";
import Sidebar from "../features/sidebar/sidebar";
import styles from "./layout.module.scss";
import { Auth0Provider } from "@auth0/auth0-react";
import { SnackbarProvider } from "react-snackbar-notif";
// const container = document.querySelector('.container');
// const styles = getComputedStyle(container);
// const gridColumnTemplate = styles.getPropertyValue('grid-template-columns');

// console.log(gridColumnTemplate);
// will output the value of grid-template-columns property, e.g. "minmax(72px, 218px) 1fr"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap"
        />
      </head>
      <body>
        <div className={styles.container}>
          <Auth0Provider
            domain="daily-dev.us.auth0.com"
            clientId="TLdMtBVExuIIryiBA3wbQ8ByGF5VnSih"
            authorizationParams={{
              redirect_uri: window.location.origin,
            }}
          >
            <Header />
            <aside>
              <Sidebar />
            </aside>
            <main className={styles.content}>{children}</main>
          </Auth0Provider>
        </div>
      </body>
    </html>
  );
}
