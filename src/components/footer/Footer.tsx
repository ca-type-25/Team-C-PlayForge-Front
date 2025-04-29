import { NavLink } from "react-router-dom"
import longNoBorder from '../../assets/LogoLongNoBorder.png';

const Footer = () => {
    return(
        <div>
            <div>
                <NavLink to="/home">
                    <img src={longNoBorder} alt="PlayForge Logo" />
                </NavLink>
            </div>
            <div>
                <p>Contacts</p>
                <p>Address</p>
                <p>Social Media:</p>
                
            </div>
            <div>
                <p className="copyright">© Copyright 2025 PlayForge. All rights reserved.</p>
            </div>
        </div>
    )
}
export default Footer