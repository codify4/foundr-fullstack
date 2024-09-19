
import { Github, InstagramIcon, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export const socials = [
  { name: "Instagram", icon: <InstagramIcon />, link: "https://www.instagram.com/k_ijon4/", width: 70, height: 70 },
  { name: "LinkedIn", icon: <Linkedin />, link: "https://www.linkedin.com/in/ijon-kushta-320b6831b/", width: 50, height: 50 },
  { name: "X", icon: <Twitter />, link: "https://twitter.com/Ijon_k4", width: 50, height: 50 },
  { name: "Gihub", icon: <Github />, link: "https://github.com/codify4", width: 50, height: 50 },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col justify-center items-center text-white w-full bg-primary">
        <div className='flex flex-col justify-center items-center my-5'>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            {socials.map((social) => (
              <Link href={social.link} target="_blank" key={social.name} className="bg-white text-primary p-2 rounded-full">
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      <div className="my-5 pt-5 border-t border-white/10 text-center">
          <p className="text-sm">&copy; {currentYear} Foundr. All rights reserved.</p>
        </div>
    </footer>
  );
};

export default Footer;