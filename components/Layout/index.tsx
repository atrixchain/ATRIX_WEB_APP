import Head from "next/head";
import cn from "classnames";
import styles from "./Layout.module.sass";
import Header from "../Header";
import Footer from "@/components/Footer";

type LayoutProps = {
  layoutNoOverflow?: boolean;
  children: React.ReactNode;
};

const Layout = ({ layoutNoOverflow, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>ATRIX</title>
      </Head>
      <div
        className={cn(styles.layout, {
          [styles.layoutNoOverflow]: layoutNoOverflow,
        })}
      >
        <Header />
        {children}
        <Footer FooterApp />
      </div>
    </>
  );
};

export default Layout;
