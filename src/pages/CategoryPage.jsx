import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { gw2Api } from '../services/gw2Api';
import { getCategoryItems } from '../data/mapData';

function UnlockGrid({ title, items, unlockedIds, type }) {
  if (!items || items.length === 0) return null;

  // Sort items: unlocked first, then locked
  const sortedItems = [...items].sort((a, b) => {
    const aUnlocked = unlockedIds.includes(a.id);
    const bUnlocked = unlockedIds.includes(b.id);
    if (aUnlocked && !bUnlocked) return -1;
    if (!aUnlocked && bUnlocked) return 1;
    return 0;
  });

  return (
    <div className="mb-12">
      <h2 className="font-display text-2xl font-semibold mb-6 flex items-center gap-3">
        <span className="w-1 h-6 bg-gradient-to-b from-amber-500 to-amber-700 rounded-full" />
        {title}
        <span className="text-slate-500 text-lg">
          ({items.filter(item => unlockedIds.includes(item.id)).length}/{items.length})
        </span>
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {sortedItems.map((item) => {
          const isUnlocked = unlockedIds.includes(item.id);
          const iconUrl = item.icon || (item.signature && item.file_id ? 
            gw2Api.getIconUrl(item.signature, item.file_id) : null);
          
          return (
            <div
              key={item.id}
              className={`relative group map-card bg-slate-900/50 rounded-lg p-3 backdrop-blur-sm transition-all ${
                isUnlocked ? '' : 'opacity-40'
              }`}
            >
              {/* Icon */}
              <div className="relative aspect-square mb-2 rounded overflow-hidden bg-slate-800">
                {iconUrl ? (
                  <img 
                    src={iconUrl} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-600">
                    ?
                  </div>
                )}
              </div>
              
              {/* Name */}
              <div className="text-sm text-slate-300 font-medium line-clamp-2 min-h-[2.5rem]">
                {item.name}
              </div>
              
              {/* Tooltip on hover */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-950 border border-amber-500/30 rounded-lg opacity-0 group-hover:!opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
                <div className="text-sm font-semibold text-amber-500">{item.name}</div>
                {item.description && (
                  <div className="text-xs text-slate-400 mt-1 max-w-xs whitespace-normal">
                    {item.description}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function CategoryPage() {
  const { categoryId } = useParams();
  const [loading, setLoading] = useState(true);
  const [categoryInfo, setCategoryInfo] = useState(null);
  const [skins, setSkins] = useState([]);
  const [minis, setMinis] = useState([]);
  const [novelties, setNovelties] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [unlockedSkins, setUnlockedSkins] = useState([]);
  const [unlockedMinis, setUnlockedMinis] = useState([]);
  const [unlockedNovelties, setUnlockedNovelties] = useState([]);
  const [completedAchievements, setCompletedAchievements] = useState([]);

  useEffect(() => {
    async function loadCategoryData() {
      setLoading(true);
      
      try {
        // Get category configuration
        const categoryConfig = getCategoryItems(categoryId);
        if (!categoryConfig) {
          console.error('Category not found:', categoryId);
          setLoading(false);
          return;
        }
        
        setCategoryInfo(categoryConfig);

        // Fetch all item details and account progress in parallel
        const [
          skinsData,
          minisData,
          noveltiesData,
          achievementsData,
          accountSkins,
          accountMinis,
          accountNovelties,
          accountAchievements
        ] = await Promise.all([
          gw2Api.getSkins(categoryConfig.skins),
          gw2Api.getMinis(categoryConfig.minis),
          gw2Api.getNovelties(categoryConfig.novelties),
          gw2Api.getAchievements(categoryConfig.achievements),
          gw2Api.getAccountSkins(),
          gw2Api.getAccountMinis(),
          gw2Api.getAccountNovelties(),
          gw2Api.getAccountAchievements()
        ]);

        setSkins(Array.isArray(skinsData) ? skinsData : []);
        setMinis(Array.isArray(minisData) ? minisData : []);
        setNovelties(Array.isArray(noveltiesData) ? noveltiesData : []);
        setAchievements(Array.isArray(achievementsData) ? achievementsData : []);
        
        setUnlockedSkins(Array.isArray(accountSkins) ? accountSkins : []);
        setUnlockedMinis(Array.isArray(accountMinis) ? accountMinis : []);
        setUnlockedNovelties(Array.isArray(accountNovelties) ? accountNovelties : []);
        
        // Extract completed achievement IDs
        const completed = Array.isArray(accountAchievements)
          ? accountAchievements.filter(a => a.done).map(a => a.id)
          : [];
        setCompletedAchievements(completed);
        
      } catch (error) {
        console.error('Error loading category data:', error);
      }
      
      setLoading(false);
    }

    loadCategoryData();
  }, [categoryId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <div className="text-slate-400">Loading category data...</div>
        </div>
      </div>
    );
  }

  if (!categoryInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-display font-bold text-slate-300 mb-4">Category Not Found</h1>
          <Link to="/maps" className="text-amber-500 hover:text-amber-400">
            ← Back to Maps
          </Link>
        </div>
      </div>
    );
  }

  const totalItems = skins.length + minis.length + novelties.length + achievements.length;
  const unlockedItems = 
    skins.filter(s => unlockedSkins.includes(s.id)).length +
    minis.filter(m => unlockedMinis.includes(m.id)).length +
    novelties.filter(n => unlockedNovelties.includes(n.id)).length +
    achievements.filter(a => completedAchievements.includes(a.id)).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/maps" 
            className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Maps
          </Link>
          
          <h1 className="font-display text-5xl font-bold mb-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 bg-clip-text text-transparent">
            {categoryInfo.name}
          </h1>
          
          <div className="flex items-center gap-6 text-slate-400">
            <div>
              <span className="text-3xl font-bold text-amber-500">{unlockedItems}</span>
              <span className="text-lg">/{totalItems}</span>
              <span className="ml-2">unlocked</span>
            </div>
            <div className="w-px h-8 bg-slate-700" />
            <div>
              <span className="text-2xl font-semibold text-amber-500">
                {totalItems > 0 ? Math.round((unlockedItems / totalItems) * 100) : 0}%
              </span>
              <span className="ml-2">complete</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-12">
          <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-500"
              style={{ width: `${totalItems > 0 ? (unlockedItems / totalItems) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Unlocks */}
        <UnlockGrid 
          title={`Skins (${skins.length})`}
          items={skins}
          unlockedIds={unlockedSkins}
          type="skin"
        />
        
        <UnlockGrid 
          title={`Minis (${minis.length})`}
          items={minis}
          unlockedIds={unlockedMinis}
          type="mini"
        />
        
        <UnlockGrid 
          title={`Novelties (${novelties.length})`}
          items={novelties}
          unlockedIds={unlockedNovelties}
          type="novelty"
        />
        
        <UnlockGrid 
          title={`Achievements (${achievements.length})`}
          items={achievements}
          unlockedIds={completedAchievements}
          type="achievement"
        />
      </div>
    </div>
  );
}
