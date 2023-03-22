import Link from "next/link";
import cn from "classnames";
import styles from "./Footer.module.sass";
import Logo from "@/components/Logo";
import NavLink from "@/components/NavLink";
import Socials from "@/components/Socials";
import { APP_NAME } from "@/utils/commom";
import { footerNavigation, documents } from "@/constants/navigation";
import { socials } from "@/constants/socials";

type FooterProps = {
  FooterApp: boolean;
};

const Footer = ({ FooterApp }: FooterProps) => (
  <footer className={FooterApp ? styles.footerApp : styles.footer}>
    <div className={cn("container-wide", styles.container)}>
      {FooterApp && <Logo className={styles.logo} white />}
      {/* <div className={styles.menu}>
                    {footerNavigation.map((link, index) =>
                        link.external ? (
                            <a
                                className={styles.link}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                key={index}
                            >
                                {link.title}
                            </a>
                        ) : (
                            <NavLink
                                className={styles.link}
                                activeClassName={styles.active}
                                href={link.url}
                                key={index}
                            >
                                {link.title}
                            </NavLink>
                        )
                    )}
                </div> */}
      <div className={styles.row}>
        <div className={FooterApp ? styles.copyrightApp : styles.copyright}>
          {FooterApp
            ? ` ${APP_NAME} © 2023 `
            : `© 2023 ${APP_NAME}. All rights reserved.`}
        </div>
        {!FooterApp && (
          <div className={styles.documents}>
            {documents.map((document, index) => (
              <Link href={document.url} key={index}>
                <a className={styles.document}>{document.title}</a>
              </Link>
            ))}
          </div>
        )}

        {FooterApp ? (
          <Socials white className={styles.socialsApp} socials={socials} />
        ) : (
          <Socials className={styles.socials} socials={socials} />
        )}
      </div>
    </div>
  </footer>
);

export default Footer;
