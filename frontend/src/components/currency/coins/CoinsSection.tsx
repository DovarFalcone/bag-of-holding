import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import CoinsPage from "../GoldPage";
import CoinPursePage from "../CoinPursePage";

const COIN_SUBTABS = [
  { label: "Manage Coins", path: "/gold" },
  { label: "Coin Purse", path: "/gold/purse" },
];

const CoinTabs: React.FC = () => {
  const location = useLocation();
  return (
    <nav className="flex gap-2 mb-6">
      {COIN_SUBTABS.map(tab => {
        const active = location.pathname === tab.path;
        return (
          <Link
            key={tab.path}
            to={tab.path}
            className={
              `px-4 py-2 rounded font-medium border-b-2 ` +
              (active
                ? 'bg-gruvbox-gray text-gruvbox-yellow border-gruvbox-yellow shadow-md'
                : 'bg-gruvbox-bg text-gruvbox-fg border-transparent hover:bg-gruvbox-gray/40 hover:text-gruvbox-yellow')
            }
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
};

const CoinsSection: React.FC = () => (
  <div>
    <CoinTabs />
    <Routes>
      <Route path="/gold" element={<CoinsPage />} />
      <Route path="/gold/purse" element={<CoinPursePage />} />
    </Routes>
  </div>
);

export default CoinsSection;
