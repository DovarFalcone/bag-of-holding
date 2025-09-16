import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import PlayerPage from "./components/players/PlayerPage";
import CharacterPage from "./components/characters/CharacterPage";
import ContainerPage from "./components/containers/ContainerPage";
import ItemPage from "./components/inventory/ItemPage";
import CoinsPage from "./components/currency/GoldPage";


import CoinPursePage from "./components/currency/CoinPursePage";

import CharacterInventoryPage from "./components/characters/CharacterInventoryPage";
import AdminPanel from "./components/admin/AdminPanel";

const NAV_TABS = [
  { label: 'Players', path: '/players' },
  { label: 'Characters', path: '/characters' },
  { label: 'Containers', path: '/containers' },
  { label: 'Items', path: '/items' },
  { label: 'Coins', path: '/gold' },
  { label: 'Coin Purse', path: '/coin-purse' },
  { label: 'Character Inventory', path: '/character-inventory' },
  { label: 'Admin Panel', path: '/admin' },
];

function TopTabs() {
  const location = useLocation();
  return (
    <nav className="w-full flex flex-col bg-gruvbox-bg border-b border-gruvbox-gray">
      <div className="flex items-center px-8 pt-4 pb-2">
        <h1 className="text-2xl font-bold text-gruvbox-yellow tracking-wide mr-10">Bag of Holding</h1>
        <div className="flex gap-2">
          {NAV_TABS.map(tab => {
            const active = location.pathname.startsWith(tab.path);
            return (
              <Link
                key={tab.path}
                to={tab.path}
                className={
                  `px-6 py-2 rounded-t-lg font-medium border-b-2 ` +
                  (active
                    ? 'bg-gruvbox-gray text-gruvbox-yellow border-gruvbox-yellow shadow-md'
                    : 'bg-gruvbox-bg text-gruvbox-fg border-transparent hover:bg-gruvbox-gray/40 hover:text-gruvbox-yellow')
                }
                style={{ minWidth: 110, textAlign: 'center' }}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gruvbox-bg text-gruvbox-fg flex flex-col">
        <TopTabs />
        <main className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<Navigate to="/players" replace />} />
            <Route path="/players" element={<PlayerPage />} />
            <Route path="/characters" element={<CharacterPage />} />
            <Route path="/containers" element={<ContainerPage />} />
            <Route path="/items" element={<ItemPage />} />
            <Route path="/gold" element={<CoinsPage />} />
            <Route path="/coin-purse" element={<CoinPursePage />} />
            <Route path="/character-inventory" element={<CharacterInventoryPage />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
