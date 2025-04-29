import { NavLink } from "react-router-dom"
import longNoBorder from '../../assets/LogoLongNoBorder.png';
import styles from './Footer.module.scss'


const Footer = () => {
    return(
        <div className={styles['footer-container']}>
            <div className={styles['logo-image-wrapper']}>
                <div>
                    <NavLink to="/home">
                        <img src={longNoBorder} alt="PlayForge Logo" className={styles['logo-image']} />
                    </NavLink>
                </div>
                <div className={styles['social-media-icons']}>
                    <a href="https://facebook.com" target="_blank" >
                        <img src="https://cdn-icons-png.flaticon.com/512/20/20673.png" alt="Facebook icon" className={styles['social-icon']}/>
                    </a>
                    <a href="https://instagram.com" target="_blank" >
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png" alt="Instagram icon" className={styles['social-icon']}/>
                    </a>
                    <a href="https://tiktok.com" target="_blank" >
                        <img src="https://cdn4.iconfinder.com/data/icons/social-media-flat-7/64/Social-media_Tiktok-512.png" alt="TikTok icon" className={styles['social-icon']}/>
                    </a>
                </div>
            </div>
            <div>
                <p className={styles['copyright']}>© Copyright 2025 PlayForge. All rights reserved.</p>
            </div>
        </div>
    )
}
export default Footer