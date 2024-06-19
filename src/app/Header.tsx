import Link from "next/link";
import styles from "./page.module.scss";
import Image from 'next/image'

export default function Header( { children }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div>
            <nav className={styles.b_header}>
                <ul className={styles.b_header_list}>
                    <Link href="/">
                        <li className={`${styles.b_header_logo} ${styles.m_clickable}`}>
                            <Image
                                src="/assets/logo.png"
                                height={39}
                                width={109}
                                alt="Nav logo">
                            </Image>
                        </li>
                    </Link>
                    <div className={styles.b_header_float_right}>
                        <Link href='/MyAnimals'>
                            <li className={`m_icon_animate ${styles.b_header_item}  ${styles.m_clickable} ${styles.m_alt}`}>
                             <Image className="b_icon" src="/assets/my_animals_icon.svg" width={20} height={20} alt="My Animals icon"></Image>
                             <div className={styles.b_header_item_label}>
                                My Animals
                             </div>
                            </li>
                        </Link>
                        <li className={`${styles.b_header_item}  ${styles.m_clickable}`}>
                            <div>Home</div>
                        </li>
                        <li className={`${styles.b_header_item}  ${styles.m_clickable}`}>
                            <div>About</div>
                        </li>
                        <li className={`${styles.b_header_item}  ${styles.m_clickable}`}>
                            <div>Contact</div>
                        </li>
                    </div>
                </ul>
            </nav>
            {children}
        </div>
    )
}