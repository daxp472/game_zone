import * as React from "react";

function Footer() {
  const quickLinks = [
    { text: "Games", link: "#" },
    { text: "Tournaments", link: "#" },
    { text: "Leaderboard", link: "#" },
    { text: "Support", link: "#" }
  ];

  const legalLinks = [
    { text: "Privacy Policy", link: "#" },
    { text: "Terms of Service", link: "#" },
    { text: "Cookie Policy", link: "#" }
  ];

  const renderBrandSection = () => (
    <div className="flex flex-col w-3/12 max-md:w-full">
      <div className="flex flex-col mx-auto w-full max-md:mt-8">
        <div className="flex gap-2 items-center">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/a1a2b128ed76445fbc89bb2309e3a04b/b6ce2fdc8e0ef108546f3b335cd298fe123abb1b22087719afcb21a13b0b0071?apiKey=a1a2b128ed76445fbc89bb2309e3a04b&"
            alt="GameZone Logo"
            className="w-8 h-8 object-contain"
          />
          <div className="text-2xl font-extrabold text-white">GameZone</div>
        </div>
        <div className="mt-4 text-base text-gray-300">Your ultimate gaming destination</div>
        <div className="flex gap-4 mt-6">
          <a href="#" aria-label="Facebook" className="hover:scale-110 transition-transform duration-200">
            <img src="/images/facebook.png" alt="Facebook" className="w-8 h-8" />
          </a>
          <a href="#" aria-label="Twitter" className="hover:scale-110 transition-transform duration-200">
            <img src="/images/twitter.png" alt="Twitter" className="w-8 h-8" />
          </a>
          <a href="#" aria-label="Instagram" className="hover:scale-110 transition-transform duration-200">
            <img src="/images/instagram.png" alt="Instagram" className="w-8 h-8" />
          </a>
          <a href="#" aria-label="Discord" className="hover:scale-110 transition-transform duration-200">
            <img src="/images/discord.png" alt="Discord" className="w-8 h-8" />
          </a>
        </div>
      </div>
    </div>
  );

  const renderFooterColumn = ({ title, links }) => (
    <div className="flex flex-col w-2/12 max-md:w-full">
      <div className="flex flex-col text-base text-gray-300 max-md:mt-8">
        <div className="font-bold text-white">{title}</div>
        <div className="flex flex-col mt-4">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.link}
              className="py-2 hover:text-purple-400 transition-colors duration-200"
            >
              {link.text}
            </a>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNewsletterSection = () => {
    const [email, setEmail] = React.useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      if (email) {
        console.log("Newsletter subscription for:", email);
        setEmail("");
      }
    };

    return (
      <div className="flex flex-col w-3/12 max-md:w-full">
        <div className="flex flex-col text-base text-gray-300 max-md:mt-8">
          <div className="font-bold text-white">Newsletter</div>
          <div className="mt-4">Stay updated with our latest news and updates</div>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                placeholder="Enter your email"
                required
              />
              <button
                type="submit"
                className="px-4 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors duration-200"
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/a1a2b128ed76445fbc89bb2309e3a04b/27fea504695594a8f8842db2d9ecaa3aba53f32f21564645e5d65fcabd9d9f42?apiKey=a1a2b128ed76445fbc89bb2309e3a04b&"
                  alt="Subscribe"
                  className="w-6 h-6"
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-[#1a1b26] px-20 py-12 max-md:px-5">
      <div className="container mx-auto flex flex-wrap gap-8 justify-between max-md:flex-col">
        {renderBrandSection()}
        {renderFooterColumn({ title: "Quick Links", links: quickLinks })}
        {renderFooterColumn({ title: "Legal", links: legalLinks })}
        {renderNewsletterSection()}
      </div>
      <div className="mt-12 flex justify-center">
        <a
          href="/download"
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full hover:scale-105 transition-transform duration-200 font-medium"
        >
          Download Mobile App
        </a>
      </div>
      <div className="mt-8 text-center text-gray-300">
        © {new Date().getFullYear()} GameZone. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;