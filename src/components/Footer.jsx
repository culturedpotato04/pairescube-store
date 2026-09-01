import React from 'react';

export default function Footer() {
  return (
    <footer className="py-12 mt-20 border-t border-gray-100 text-center">
      <p className="text-[10px] uppercase tracking-widest text-gray-400">
        &copy; {new Date().getFullYear()} PAIRECUBE. ALL RIGHTS RESERVED.
      </p>
    </footer>
  );
}
