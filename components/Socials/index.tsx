import cn from "classnames";
import styles from "./Socials.module.sass";
import Icon from "@/components/Icon";

type SocialsType = {
    icon: string;
    href: string;
};

type SocialsProps = {
    className?: string;
    socialClassName?: string;
    socials: SocialsType[];
    dark?: boolean;
    large?: boolean;
    white?:boolean;
};

const Socials = ({
    className,
    socialClassName,
    socials,
    dark,
    large,
    white
}: SocialsProps) => (
    <div
        className={cn(
            styles.socials,
            { [styles.dark]: dark, [styles.large]: large, [styles.white] : white },
            className
        )}
    >
        {socials.map((social, index) => (
            <a
                className={cn(styles.social, socialClassName)}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                key={index}
            >
                <Icon name={social.icon} />
            </a>
        ))}
    </div>
);

export default Socials;
