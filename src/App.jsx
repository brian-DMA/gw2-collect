import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link as RouterLink,
} from "react-router-dom";
import { Menu, Settings } from "lucide-react";
import MapPage from "./pages/MapPage";
import CategoryPage from "./pages/CategoryPage";

// Navigation data
const navigationData = [
  {
    title: "News",
    href: "/news",
  },
  {
    title: "Maps",
    href: "/maps",
  },
  {
    title: "Expansions",
    submenu: [
      {
        title: "Heart of Thorns",
        categoryHref: "/category/heart_of_thorns",
        items: [
          { title: "Verdant Brink", href: "/map/verdant_brink" },
          { title: "Auric Basin", href: "/map/auric_basin" },
          { title: "Tangled Depths", href: "/map/tangled_depths" },
          { title: "Dragon's Stand", href: "/map/dragons_stand" },
        ],
      },
      {
        title: "Path of Fire",
        categoryHref: "/category/path_of_fire",
        items: [
          { title: "Crystal Oasis", href: "/map/crystal_oasis" },
          { title: "Desert Highlands", href: "/map/desert_highlands" },
          { title: "Elon Riverlands", href: "/map/elon_riverlands" },
          { title: "The Desolation", href: "/map/the_desolation" },
          { title: "Domain of Vabbi", href: "/map/domain_of_vabbi" },
        ],
      },
      {
        title: "End of Dragons",
        categoryHref: "/category/end_of_dragons",
        items: [
          { title: "Seitung Province", href: "/map/seitung_province" },
          { title: "New Kaineng City", href: "/map/new_kaineng_city" },
          { title: "The Echovald Wilds", href: "/map/the_echovald_wilds" },
          { title: "Arborstone", href: "/map/arborstone" },
          { title: "Dragon's End", href: "/map/dragons_end" },
          { title: "Gyala Delve", href: "/map/gyala_delve" },
        ],
      },
      {
        title: "Secrets of the Obscure",
        categoryHref: "/category/secrets_of_the_obscure",
        items: [
          { title: "Skywatch Archipelago", href: "/map/skywatch_archipelago" },
          { title: "The Wizard's Tower", href: "/map/the_wizards_tower" },
          { title: "Amnytas", href: "/map/amnytas" },
          { title: "Inner Nayos", href: "/map/inner_nayos" },
        ],
      },
      {
        title: "Janthir Wilds",
        categoryHref: "/category/janthir_wilds",
        items: [
          { title: "Lowland Shore", href: "/map/lowland_shore" },
          { title: "Janthir Syntri", href: "/map/janthir_syntri" },
        ],
      },
    ],
  },
  {
    title: "PvP / WvW",
    submenu: [
      { title: "PvP", href: "/map/pvp" },
      { title: "WvW", href: "/map/wvw" },
    ],
  },
  {
    title: "Instances",
    submenu: [
      {
        title: "Dungeons",
        categoryHref: "/category/dungeons",
        items: [
          { title: "Ascalonian Catacombs", href: "/map/ascalonian_catacombs" },
          { title: "Caudecus's Manor", href: "/map/caudecuss_manor" },
          { title: "Twilight Arbor", href: "/map/twilight_arbor" },
          { title: "Sorrow's Embrace", href: "/map/sorrows_embrace" },
          { title: "Citadel of Flame", href: "/map/citadel_of_flame" },
          { title: "Honor of the Waves", href: "/map/honor_of_the_waves" },
          { title: "Crucible of Eternity", href: "/map/crucible_of_eternity" },
          {
            title: "The Ruined City of Arah",
            href: "/map/the_ruined_city_of_arah",
          },
        ],
      },
      { title: "Fractals", href: "/map/fractals" },
      {
        title: "Strike Missions",
        categoryHref: "/category/all_strike_missions",
        items: [
          { title: "Icebrood Saga Strikes", href: "/map/strike_missions" },
          {
            title: "End of Dragons Strikes",
            href: "/map/end_of_dragons_strikes",
          },
          { title: "SOTO Strikes", href: "/map/soto_strikes" },
        ],
      },
      {
        title: "Raids",
        categoryHref: "/category/raids",
        items: [
          { title: "Spirit Vale", href: "/map/spirit_vale" },
          { title: "Salvation Pass", href: "/map/salvation_pass" },
          {
            title: "Stronghold of the Faithful",
            href: "/map/stronghold_of_the_faithful",
          },
          {
            title: "Bastion of the Penitent",
            href: "/map/bastion_of_the_penitent",
          },
          { title: "Hall of Chains", href: "/map/hall_of_chains" },
          { title: "Mythwright Gambit", href: "/map/mythwright_gambit" },
          { title: "The Key of Ahdashim", href: "/map/the_key_of_ahdashim" },
        ],
      },
    ],
  },
  {
    title: "Living World",
    submenu: [
      { title: "Season 1", categoryHref: "/category/season_1" },
      {
        title: "Season 2",
        categoryHref: "/category/season_2",
        items: [
          { title: "Dry Top", href: "/map/dry_top" },
          { title: "Silverwastes", href: "/map/the_silverwastes" },
        ],
      },
      {
        title: "Season 3",
        categoryHref: "/category/season_3",
        items: [
          { title: "Bloodstone Fen", href: "/map/bloodstone_fen" },
          { title: "Ember Bay", href: "/map/ember_bay" },
          { title: "Bitterfrost Frontier", href: "/map/bitterfrost_frontier" },
          { title: "Lake Doric", href: "/map/lake_doric" },
          { title: "Draconis Mons", href: "/map/draconis_mons" },
          { title: "Siren's Landing", href: "/map/sirens_landing" },
        ],
      },
      {
        title: "Season 4",
        categoryHref: "/category/season_4",
        items: [
          { title: "Domain of Istan", href: "/map/domain_of_istan" },
          { title: "Sandswept Isles", href: "/map/sandswept_isles" },
          { title: "Domain of Kourna", href: "/map/domain_of_kourna" },
          { title: "Jahai Bluffs", href: "/map/jahai_bluffs" },
          { title: "Thunderhead Peaks", href: "/map/thunderhead_peaks" },
          { title: "Dragonfall", href: "/map/dragonfall" },
        ],
      },
      {
        title: "Icebrood Saga",
        categoryHref: "/category/icebrood_saga",
        items: [
          { title: "Grothmar Valley", href: "/map/grothmar_valley" },
          { title: "Bjora Marches", href: "/map/bjora_marches" },
          { title: "Drizzlewood Coast", href: "/map/drizzlewood_coast" },
        ],
      },
    ],
  },
  {
    title: "Cities",
    categoryHref: "/category/cities",
    submenu: [
      { title: "Divinity's Reach", href: "/map/divinitys_reach" },
      { title: "The Grove", href: "/map/the_grove" },
      { title: "Hoelbrak", href: "/map/hoelbrak" },
      { title: "Rata Sum", href: "/map/rata_sum" },
      { title: "Black Citadel", href: "/map/black_citadel" },
      { title: "Lion's Arch", href: "/map/lions_arch" },
      { title: "Eye of the North", href: "/map/eye_of_the_north" },
    ],
  },
  {
    title: "Festivals",
    categoryHref: "/category/festivals",
    submenu: [
      { title: "Lunar New Year", href: "/map/lunar_new_year" },
      { title: "Super Adventure Box", href: "/map/super_adventure_box" },
      { title: "Dragon Bash", href: "/map/dragon_bash" },
      {
        title: "Festival of the Four Winds",
        href: "/map/festival_of_the_four_winds",
      },
      { title: "Halloween", href: "/map/halloween" },
      { title: "Wintersday", href: "/map/wintersday" },
    ],
  },
  {
    title: "Other",
    categoryHref: "/category/other",
    submenu: [
      { title: "Elite Specializations", href: "/map/elite_specializations" },
      { title: "Guild", href: "/map/guild" },
      { title: "Mystic Forge", href: "/map/mystic_forge" },
      { title: "Crafting", href: "/map/crafting" },
      {
        title: "Black Lion Claim Ticket",
        href: "/map/black_lion_claim_ticket",
      },
      { title: "Black Lion Statuette", href: "/map/black_lion_statuette" },
      { title: "Gathering Tools", href: "/map/gathering_tools" },
      { title: "Gem Store", href: "/map/gem_store" },
      { title: "General", href: "/map/general" },
      { title: "Wizard's Vault", href: "/map/wizards_vault" },
    ],
  },
];

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GW2MapsPage />} />
        <Route path="/maps" element={<GW2MapsPage />} />
        <Route path="/map/:mapId" element={<MapPage />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
      </Routes>
    </Router>
  );
}

function GW2MapsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Jost:wght@300;400;500;600&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Jost', sans-serif;
          background: #0f172a;
          overflow-x: hidden;
        }

        .font-display {
          font-family: 'Cinzel', serif;
        }

        /* Animated gradient background */
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animated-bg {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #0f172a 50%, #1e1b2e 75%, #0f172a 100%);
          background-size: 400% 400%;
          animation: gradientShift 20s ease infinite;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #1e293b;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #d97706 0%, #b45309 100%);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #f59e0b 0%, #d97706 100%);
        }

        /* Hover glow effects */
        .glow-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .glow-hover:hover {
          text-shadow: 0 0 20px rgba(217, 119, 6, 0.6), 0 0 40px rgba(217, 119, 6, 0.3);
          transform: translateY(-1px);
        }

        /* Dropdown hover behavior */
        .nav-item {
          position: relative;
        }

        .nav-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          margin-top: 0.5rem;
          min-width: 14rem;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.2s ease;
          z-index: 50;
        }

        .nav-item:hover > .nav-dropdown {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        /* Nested submenu positioning */
        .submenu-item {
          position: relative;
        }

        .submenu-dropdown {
          position: absolute;
          top: 0;
          left: 100%;
          margin-left: 0.25rem;
          min-width: 14rem;
          opacity: 0;
          visibility: hidden;
          transform: translateX(-10px);
          transition: all 0.2s ease;
          z-index: 51;
        }

        .submenu-item:hover > .submenu-dropdown {
          opacity: 1;
          visibility: visible;
          transform: translateX(0);
        }

        /* Map card hover effect */
        .map-card {
          position: relative;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(148, 163, 184, 0.1);
        }

        .map-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(217, 119, 6, 0.1) 0%, rgba(180, 83, 9, 0.05) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: inherit;
        }

        .map-card:hover::before {
          opacity: 1;
        }

        .map-card:hover {
          transform: translateY(-4px);
          border-color: rgba(217, 119, 6, 0.3);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(217, 119, 6, 0.2);
        }

        /* Navbar glass effect */
        .glass-nav {
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(148, 163, 184, 0.1);
        }

        /* Logo glow */
        .logo-glow {
          filter: drop-shadow(0 0 10px rgba(217, 119, 6, 0.5));
          transition: filter 0.3s ease;
        }

        .logo-glow:hover {
          filter: drop-shadow(0 0 20px rgba(217, 119, 6, 0.8));
        }

        /* Section divider */
        .section-divider {
          height: 2px;
          background: linear-gradient(90deg, transparent 0%, rgba(217, 119, 6, 0.5) 50%, transparent 100%);
          margin: 2rem 0;
        }

        /* Button styles */
        .btn-primary {
          background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .btn-primary:hover::before {
          left: 100%;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(217, 119, 6, 0.4);
        }
      `}</style>

      {/* Navigation */}
      <nav className="glass-nav sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-8">
              <RouterLink to="/maps" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg flex items-center justify-center logo-glow">
                  <span className="text-2xl font-display font-bold text-white">
                    G
                  </span>
                </div>
                <span className="font-display text-xl font-semibold hidden sm:block glow-hover">
                  GW2 Collect
                </span>
              </RouterLink>

              {/* Desktop Navigation with Hover Menus */}
              <div className="hidden lg:flex items-center gap-1">
                {navigationData.map((item, idx) => (
                  <div key={idx} className="nav-item">
                    {item.href ? (
                      <RouterLink
                        to={item.href}
                        className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-amber-500 transition-colors glow-hover"
                      >
                        {item.title}
                      </RouterLink>
                    ) : item.categoryHref ? (
                      <>
                        <RouterLink
                          to={item.categoryHref}
                          className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-amber-500 transition-colors glow-hover"
                        >
                          {item.title}
                        </RouterLink>
                        {item.submenu && (
                          <div className="nav-dropdown glass-nav rounded-lg shadow-2xl border border-slate-700">
                            {item.submenu.map((subitem, subidx) => (
                              <RouterLink
                                key={subidx}
                                to={subitem.href}
                                className="block px-4 py-2 text-sm text-slate-300 hover:text-amber-500 hover:bg-slate-800/50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                              >
                                {subitem.title}
                              </RouterLink>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <button className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-amber-500 transition-colors glow-hover">
                          {item.title}
                        </button>
                        {item.submenu && (
                          <div className="nav-dropdown glass-nav rounded-lg shadow-2xl border border-slate-700">
                            {item.submenu.map((subitem, subidx) => (
                              <div key={subidx} className="submenu-item">
                                {subitem.items ? (
                                  <>
                                    {subitem.categoryHref ? (
                                      <RouterLink
                                        to={subitem.categoryHref}
                                        className="block px-4 py-2 text-sm text-slate-300 hover:text-amber-500 hover:bg-slate-800/50 transition-colors"
                                      >
                                        {subitem.title}
                                      </RouterLink>
                                    ) : (
                                      <div className="px-4 py-2 text-sm text-slate-300 hover:text-amber-500 hover:bg-slate-800/50 transition-colors cursor-pointer">
                                        {subitem.title}
                                      </div>
                                    )}
                                    <div className="submenu-dropdown glass-nav rounded-lg shadow-2xl border border-slate-700">
                                      {subitem.items.map(
                                        (nesteditem, nestedidx) => (
                                          <RouterLink
                                            key={nestedidx}
                                            to={nesteditem.href}
                                            className="block px-4 py-2 text-sm text-slate-300 hover:text-amber-500 hover:bg-slate-800/50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                                          >
                                            {nesteditem.title}
                                          </RouterLink>
                                        ),
                                      )}
                                    </div>
                                  </>
                                ) : subitem.categoryHref ? (
                                  <RouterLink
                                    to={subitem.categoryHref}
                                    className="block px-4 py-2 text-sm text-slate-300 hover:text-amber-500 hover:bg-slate-800/50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                                  >
                                    {subitem.title}
                                  </RouterLink>
                                ) : (
                                  <RouterLink
                                    to={subitem.href}
                                    className="block px-4 py-2 text-sm text-slate-300 hover:text-amber-500 hover:bg-slate-800/50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                                  >
                                    {subitem.title}
                                  </RouterLink>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right side icons */}
            <div className="flex items-center gap-4">
              <RouterLink
                to="/settings"
                className="p-2 text-slate-400 hover:text-amber-500 transition-colors glow-hover"
              >
                <Settings className="w-5 h-5" />
              </RouterLink>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-slate-400 hover:text-amber-500 transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Simplified for now */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed right-0 top-0 bottom-0 w-80 glass-nav border-l border-slate-700 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <span className="font-display text-xl font-semibold">Menu</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2">
                {navigationData.map((item, idx) => (
                  <div key={idx} className="border-t border-slate-700 pt-2">
                    {item.href ? (
                      <RouterLink
                        to={item.href}
                        className="block px-4 py-2 text-slate-300 hover:text-amber-500 rounded transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.title}
                      </RouterLink>
                    ) : (
                      <div className="px-4 py-2 text-slate-300 font-semibold">
                        {item.title}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="animated-bg min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 bg-clip-text text-transparent">
              Guild Wars 2 Collection Tracker
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Track your progress across every map, achievement, skin, and
              collectible in Tyria.
            </p>
          </div>

          {/* CTA Section */}
          <section className="text-center py-16">
            <div className="max-w-2xl mx-auto glass-nav rounded-2xl p-12 border border-slate-700">
              <h2 className="font-display text-3xl font-bold mb-4">
                Start Collecting
              </h2>
              <p className="text-slate-400 mb-8">
                GW2 Collect helps you track your progress across all maps,
                achievements, and content in Guild Wars 2.
              </p>
              <RouterLink
                to="/map/verdant_brink"
                className="btn-primary px-8 py-4 rounded-lg font-semibold text-white inline-block"
              >
                View Verdant Brink
              </RouterLink>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-display font-bold text-white">
                    G
                  </span>
                </div>
                <span className="font-display text-xl font-semibold">
                  GW2 Collect
                </span>
              </div>
              <p className="text-slate-400 text-sm">
                A tool to help Guild Wars 2 players track collections and
                progress across all content.
              </p>
            </div>

            <div>
              <h3 className="font-display font-semibold mb-4">Product</h3>
              <div className="space-y-2">
                <RouterLink
                  to="/settings"
                  className="block text-slate-400 hover:text-amber-500 text-sm transition-colors"
                >
                  Settings
                </RouterLink>
                <RouterLink
                  to="/maps"
                  className="block text-slate-400 hover:text-amber-500 text-sm transition-colors"
                >
                  Maps
                </RouterLink>
                <RouterLink
                  to="/news"
                  className="block text-slate-400 hover:text-amber-500 text-sm transition-colors"
                >
                  News
                </RouterLink>
              </div>
            </div>

            <div>
              <h3 className="font-display font-semibold mb-4">About</h3>
              <div className="space-y-2 text-sm">
                <p className="text-slate-400">Inspired by GW2EST.com</p>
                <p className="text-slate-400">Built with React + Vite</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
            <p>
              Guild Wars 2 © ArenaNet, LLC. Not affiliated with or endorsed by
              ArenaNet.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
