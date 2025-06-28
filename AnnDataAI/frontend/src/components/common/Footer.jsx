import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFacebookF,
	faTwitter,
	faInstagram,
	faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../assets/image/header1.png";

const Footer2 = () => {
	return (
		<footer className="bg-gray-800 text-white py-6">
			<div className="w-full max-w-screen-xl mx-auto px-4">
				<div className="flex flex-col md:flex-row md:pt-4 md:justify-between">
					<div className="flex items-center mb-4 md:mb-0">
						<img src={Logo} alt="logo" className="w-16"/>
					</div>
					<ul className="flex flex-wrap items-center mb-6 text-sm font-medium space-x-4 md:space-x-6">
						<li>
							<Link to="/groundwater/level_predict" className="text-white-light hover:text-gray-300">
								Predict
							</Link>
						</li>
						<li>
							<Link to="/analysis" className="text-white-light hover:text-gray-300">
								Analyse
							</Link>
						</li>
						<li>
							<Link to="/info" className="text-white-light hover:text-gray-300">
								Information
							</Link>
						</li>
						<li>
							<Link to="/about" className="text-white-light hover:text-gray-300">
								About
							</Link>
						</li>
						<li>
							<Link to="/contact" className="text-white-light hover:text-gray-300">
								Contact
							</Link>
						</li>
					</ul>
					<div className="flex space-x-4 mb-4 md:mb-0">
						<a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white-light hover:text-gray-300">
							<FontAwesomeIcon icon={faFacebookF} />
						</a>
						<a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 text-white-light">
							<FontAwesomeIcon icon={faTwitter} />
						</a>
						<a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 text-white-light">
							<FontAwesomeIcon icon={faInstagram} />
						</a>
						<a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 text-white-light">
							<FontAwesomeIcon icon={faLinkedin} />
						</a>
						<a href="mailto:contact@anndataai.com" className="text-white hover:text-gray-300 text-white-light">
							<FontAwesomeIcon icon={faEnvelope} />
						</a>
					</div>
				</div>
				<hr className="my-6 border-gray-700" />
				<span className="block text-sm text-white text-center text-white-light">
					© 2024 <a href="#" className="hover:underline text-white-light">SmartIrrigation™</a>. All Rights Reserved.
				</span>
			</div>
		</footer>
	);
};

export default Footer2;
