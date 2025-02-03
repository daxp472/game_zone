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
    <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
      <div className="flex flex-col pb-14 mx-auto w-full bg-black bg-opacity-0 max-md:mt-8">
        <div className="flex gap-2 py-0.5 w-full bg-black bg-opacity-0">
          <div className="flex overflow-hidden justify-center items-center min-h-[24px]">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/a1a2b128ed76445fbc89bb2309e3a04b/b6ce2fdc8e0ef108546f3b335cd298fe123abb1b22087719afcb21a13b0b0071?apiKey=a1a2b128ed76445fbc89bb2309e3a04b&"
              alt="GameZone Logo"
              className="object-contain self-stretch my-auto aspect-[1.25] w-[30px]"
            />
          </div>
          <div className="flex-auto text-xl font-bold leading-none text-white w-[244px]">
            GameZone
          </div>
        </div>
        <div className="self-start mt-5 text-base leading-none text-gray-400">
          Your ultimate gaming destination
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/a1a2b128ed76445fbc89bb2309e3a04b/6e054aa4e0e46bd87ee190f5600e5c264726a06db45ee009fdeace8fae9c448d?apiKey=a1a2b128ed76445fbc89bb2309e3a04b&"
          alt="Gaming illustration"
          className="object-contain mt-6 w-72 aspect-[14.49]"
        />
      </div>
    </div>
  );

  const renderFooterColumn = ({ title, links }) => (
    <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
      <div className="flex flex-col grow py-px w-full text-base leading-none bg-black bg-opacity-0 max-md:mt-8">
        <div className="self-start font-bold text-white">{title}</div>
        <div className="flex flex-col mt-6 text-gray-400 whitespace-nowrap bg-black bg-opacity-0">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.link}
              className="pt-0.5 pb-2.5 mt-2 bg-black bg-opacity-0 max-md:pr-5 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              tabIndex="0"
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
      <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
        <div className="flex flex-col items-start pt-0.5 pb-4 mx-auto w-full text-base bg-black bg-opacity-0 max-md:mt-8">
          <div className="font-bold leading-none text-white">Newsletter</div>
          <div className="mt-8 leading-4 text-gray-400">
            Stay updated with our latest news and updates
          </div>
          <form onSubmit={handleSubmit} className="flex self-stretch mt-7 text-gray-400 bg-black bg-opacity-0">
            <label htmlFor="emailInput" className="sr-only">
              Enter your email
            </label>
            <input
              type="email"
              id="emailInput"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3.5 bg-gray-800 rounded-lg max-md:pr-5 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              placeholder="Enter your email"
              aria-label="Enter your email"
              required
            />
            <button
              type="submit"
              className="ml-2 flex items-center justify-center w-12 h-12 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              aria-label="Subscribe to newsletter"
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/a1a2b128ed76445fbc89bb2309e3a04b/27fea504695594a8f8842db2d9ecaa3aba53f32f21564645e5d65fcabd9d9f42?apiKey=a1a2b128ed76445fbc89bb2309e3a04b&"
                alt=""
                className="object-contain shrink-0 w-12 rounded-none aspect-[1.2]"
              />
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <footer className="flex flex-col justify-center px-20 py-12 bg-gray-900 max-md:px-5">
      <div className="flex flex-col px-4 w-full bg-black bg-opacity-0 max-md:max-w-full">
        <div className="bg-black bg-opacity-0 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            {renderBrandSection()}
            {renderFooterColumn({ title: "Quick Links", links: quickLinks })}
            {renderFooterColumn({ title: "Legal", links: legalLinks })}
            {renderNewsletterSection()}
          </div>
        </div>
        <div className="px-16 pt-9 pb-2 mt-12 text-base leading-none text-center text-gray-400 bg-black bg-opacity-0 max-md:px-5 max-md:mt-10 max-md:max-w-full">
          © {new Date().getFullYear()} GameZone. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;