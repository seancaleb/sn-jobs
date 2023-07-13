const Footer = () => {
  return (
    <footer className="py-6 border-t border-slate-200 absolute bottom-0 left-0 right-0">
      <div className="container">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-1">
          <span className="text-slate-500 text-sm text-center sm:text-left">
            Copyright © 2023 SNJOBS. All rights reserved.
          </span>
          <span className="text-slate-500 text-sm text-center sm:text-left">
            Developed by Sean Caleb
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;