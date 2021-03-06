export default {
  default: {
    name: "Default Unit",
    rarity: null,
    x: null,
    y: null,
    lastY: null,
    lastX: null,
    owner: null,
    walkRange: null,
    sailRange: null,

    strength: -5,
    maxStrength: 0,
    minStrength: -10,
    strengthUpgrade: null,
    strengthDowngrade: null,

    health: 5,
    maxHealth: 10,
    minHealth: 0,
    healthUpgrade: null,
    healthDowngrade: "destroyUnit",

    skill: null,
    skillRange: null,

    onChange: null,
    onSpawn: null,
    onDeath: null,
    onMove: null,
    onSkill: null,
    onTick: null,
    // buffs: [{}],
  },

  hero: {
    name: "Hero",
    rarity: 3,
    walkRange: 3,
    sailRange: 2,
    skillRange: 1,
    range: 3,
    strengthMax: 10,
    strength: 10,
    strengthMin: 5,
    healthMax: 40,
    health: 30,
    healthMin: 0,
    healthDowngrade: "destroyHero",
    onDeath: "spawnMonument",
  },

  monument: {
    name: "monument",
    rarity: 3,
    strength: {
      max: 10,
      default: 10,
      min: 5,
    },
    maxHealth: 40,
    health: 30,
    minHealth: 0,
    healthUpgrade: "upgradeMonument",
    skill: "reclaimMonument",
    skillRange: 1,
    onDeath: "destroyMonument",
  },
};
