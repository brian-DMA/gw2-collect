// GW2 API Service
const API_BASE = "https://api.guildwars2.com/v2";
const API_KEY = "YOUR_API_KEY_HERE";

export const gw2Api = {
  // Fetch skins with details
  async getSkins(ids) {
    if (!ids || ids.length === 0) return [];
    const idsParam = ids.join(",");
    const response = await fetch(`${API_BASE}/skins?ids=${idsParam}`);
    return response.json();
  },

  // Fetch minis with details
  async getMinis(ids) {
    if (!ids || ids.length === 0) return [];
    const idsParam = ids.join(",");
    const response = await fetch(`${API_BASE}/minis?ids=${idsParam}`);
    return response.json();
  },

  // Fetch novelties with details
  async getNovelties(ids) {
    if (!ids || ids.length === 0) return [];
    const idsParam = ids.join(",");
    const response = await fetch(`${API_BASE}/novelties?ids=${idsParam}`);
    return response.json();
  },

  // Fetch achievements with details
  async getAchievements(ids) {
    if (!ids || ids.length === 0) return [];
    const idsParam = ids.join(",");
    const response = await fetch(`${API_BASE}/achievements?ids=${idsParam}`);
    return response.json();
  },

  // Fetch account unlocked skins
  async getAccountSkins() {
    const response = await fetch(
      `${API_BASE}/account/skins?access_token=${API_KEY}`,
    );
    return response.json();
  },

  // Fetch account unlocked minis
  async getAccountMinis() {
    const response = await fetch(
      `${API_BASE}/account/minis?access_token=${API_KEY}`,
    );
    return response.json();
  },

  // Fetch account unlocked novelties
  async getAccountNovelties() {
    const response = await fetch(
      `${API_BASE}/account/novelties?access_token=${API_KEY}`,
    );
    return response.json();
  },

  // Fetch account achievement progress
  async getAccountAchievements() {
    const response = await fetch(
      `${API_BASE}/account/achievements?access_token=${API_KEY}`,
    );
    return response.json();
  },

  // Get render service URL for icon
  getIconUrl(signature, fileId) {
    if (!signature || !fileId) return null;
    return `https://render.guildwars2.com/file/${signature}/${fileId}.png`;
  },
};
