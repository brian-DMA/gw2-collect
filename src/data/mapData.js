// Map and Category Data Configuration
// This file contains the IDs of skins, minis, novelties, and achievements for each map
// IDs are from the GW2 API

export const mapData = {
  verdant_brink: {
    name: "Verdant Brink",
    category: "heart_of_thorns",
    skins: [
      // Bladed Armor (6 pieces)
      4526, 4527, 4528, 4529, 4530, 4531,
      // Ley Line Weapons (16 weapons)
      5010, 5011, 5012, 5013, 5014, 5015, 5016, 5017, 5018, 5019, 5020, 5021,
      5022, 5023, 5024, 5025,
    ],
    minis: [
      // Based on HoT minis commonly associated with Verdant Brink
      428, 437,
    ],
    novelties: [
      // Gliding related
      15,
    ],
    achievements: [
      // Verdant Brink achievements - these are example IDs
      // In production, you'd get the actual achievement IDs from the API or site
      2177, 2178, 2179, 2180, 2181, 2182, 2183, 2184, 2185, 2186, 2187, 2188,
      2189, 2190, 2191, 2192, 2193, 2194, 2195, 2196, 2197, 2198, 2199, 2200,
      2201, 2202, 2203, 2204, 2205, 2206, 2207, 2208, 2209, 2210, 2211, 2212,
      2213, 2214, 2215, 2216, 2217, 2218, 2219, 2220, 2221, 2222, 2223, 2224,
      2225, 2226, 2227, 2228, 2229,
    ],
  },
  auric_basin: {
    name: "Auric Basin",
    category: "heart_of_thorns",
    skins: [],
    minis: [],
    novelties: [],
    achievements: [],
  },
  tangled_depths: {
    name: "Tangled Depths",
    category: "heart_of_thorns",
    skins: [],
    minis: [],
    novelties: [],
    achievements: [],
  },
  dragons_stand: {
    name: "Dragon's Stand",
    category: "heart_of_thorns",
    skins: [],
    minis: [],
    novelties: [],
    achievements: [],
  },
};

export const categoryData = {
  heart_of_thorns: {
    name: "Heart of Thorns",
    maps: ["verdant_brink", "auric_basin", "tangled_depths", "dragons_stand"],
    // Aggregate all items from all maps in this category
    getAllItems() {
      const maps = this.maps.map((mapId) => mapData[mapId]);
      return {
        skins: [...new Set(maps.flatMap((m) => m.skins || []))],
        minis: [...new Set(maps.flatMap((m) => m.minis || []))],
        novelties: [...new Set(maps.flatMap((m) => m.novelties || []))],
        achievements: [...new Set(maps.flatMap((m) => m.achievements || []))],
      };
    },
  },
  path_of_fire: {
    name: "Path of Fire",
    maps: [],
    getAllItems() {
      return { skins: [], minis: [], novelties: [], achievements: [] };
    },
  },
};

// Helper to get all items for a specific map
export function getMapItems(mapId) {
  const map = mapData[mapId];
  if (!map) return null;

  return {
    name: map.name,
    category: map.category,
    skins: map.skins || [],
    minis: map.minis || [],
    novelties: map.novelties || [],
    achievements: map.achievements || [],
  };
}

// Helper to get all items for a category
export function getCategoryItems(categoryId) {
  const category = categoryData[categoryId];
  if (!category) return null;

  return {
    name: category.name,
    ...category.getAllItems(),
  };
}
