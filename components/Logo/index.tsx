import Link from "next/link";
import cn from "classnames";
import styles from "./Logo.module.sass";
import Image from "@/components/Image";

type LogoProps = {
    className?: string;
    onClick?: () => void;
    white: boolean;
};

const Logo = ({ className, onClick, white }: LogoProps) => (
    <Link href="/">
        <a className={cn(styles.logo, className)} onClick={onClick}>
            <Image
                src={white ? "/images/logo_white.svg" : "/images/logo.svg"}
                width={120}
                height={35}
                alt="atrix"
                priority
            />
        </a>
    </Link>
);

export default Logo;
