export interface TreeGameState {
  treesPlanted: number;
  totalDonations: number;
  carbonOffset: number;
  wildlifeReturned: number;
  forestLevel: number;
  lastUpdate: number;
  achievements: string[];
  seasonalEvents: SeasonalEvent[];
  treeSpecies: TreeSpecies[];
}

export interface TreeSpecies {
  id: string;
  name: string;
  growthTime: number;
  carbonOffset: number;
  wildlifeAttraction: number;
  cost: number;
  unlocked: boolean;
}

export interface SeasonalEvent {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  multiplier: number;
  active: boolean;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  requirement: number;
  type: 'trees' | 'carbon' | 'wildlife' | 'donations';
  unlocked: boolean;
  icon: string;
}

// Tree species data
export const TREE_SPECIES: TreeSpecies[] = [
  {
    id: 'oak',
    name: 'Oak Tree',
    growthTime: 300000, // 5 minutes
    carbonOffset: 22,
    wildlifeAttraction: 3,
    cost: 1,
    unlocked: true,
  },
  {
    id: 'pine',
    name: 'Pine Tree',
    growthTime: 180000, // 3 minutes
    carbonOffset: 18,
    wildlifeAttraction: 2,
    cost: 2,
    unlocked: false,
  },
  {
    id: 'maple',
    name: 'Maple Tree',
    growthTime: 240000, // 4 minutes
    carbonOffset: 20,
    wildlifeAttraction: 4,
    cost: 3,
    unlocked: false,
  },
  {
    id: 'redwood',
    name: 'Redwood',
    growthTime: 600000, // 10 minutes
    carbonOffset: 50,
    wildlifeAttraction: 8,
    cost: 10,
    unlocked: false,
  },
];

// Achievement definitions
export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-tree',
    name: 'First Steps',
    description: 'Plant your first tree',
    requirement: 1,
    type: 'trees',
    unlocked: false,
    icon: '🌱',
  },
  {
    id: 'forest-builder',
    name: 'Forest Builder',
    description: 'Plant 100 trees',
    requirement: 100,
    type: 'trees',
    unlocked: false,
    icon: '🌲',
  },
  {
    id: 'carbon-neutral',
    name: 'Carbon Neutral',
    description: 'Offset 1 ton of CO2',
    requirement: 1000,
    type: 'carbon',
    unlocked: false,
    icon: '🌍',
  },
  {
    id: 'wildlife-sanctuary',
    name: 'Wildlife Sanctuary',
    description: 'Attract 50 wildlife',
    requirement: 50,
    type: 'wildlife',
    unlocked: false,
    icon: '🦌',
  },
  {
    id: 'forest-master',
    name: 'Forest Master',
    description: 'Plant 1000 trees',
    requirement: 1000,
    type: 'trees',
    unlocked: false,
    icon: '🌳',
  },
];

// Seasonal events
export const SEASONAL_EVENTS: SeasonalEvent[] = [
  {
    id: 'spring-planting',
    name: 'Spring Planting',
    description: 'Trees grow 20% faster during spring',
    startDate: new Date(new Date().getFullYear(), 2, 20), // March 20
    endDate: new Date(new Date().getFullYear(), 5, 21), // June 21
    multiplier: 1.2,
    active: false,
  },
  {
    id: 'summer-growth',
    name: 'Summer Growth',
    description: 'Increased carbon offset during summer',
    startDate: new Date(new Date().getFullYear(), 5, 21), // June 21
    endDate: new Date(new Date().getFullYear(), 8, 23), // September 23
    multiplier: 1.15,
    active: false,
  },
  {
    id: 'autumn-harvest',
    name: 'Autumn Harvest',
    description: 'Bonus wildlife attraction in autumn',
    startDate: new Date(new Date().getFullYear(), 8, 23), // September 23
    endDate: new Date(new Date().getFullYear(), 11, 21), // December 21
    multiplier: 1.1,
    active: false,
  },
];

// Game state management
export class TreePlantingGame {
  private state: TreeGameState;

  constructor() {
    this.state = this.loadGameState();
    this.updateSeasonalEvents();
  }

  private loadGameState(): TreeGameState {
    if (typeof window === 'undefined') {
      return this.getInitialState();
    }

    const saved = localStorage.getItem('treePlantingGame');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...this.getInitialState(), ...parsed };
      } catch (e) {
        console.error('Failed to load game state:', e);
      }
    }
    return this.getInitialState();
  }

  private getInitialState(): TreeGameState {
    return {
      treesPlanted: 0,
      totalDonations: 0,
      carbonOffset: 0,
      wildlifeReturned: 0,
      forestLevel: 1,
      lastUpdate: Date.now(),
      achievements: [],
      seasonalEvents: SEASONAL_EVENTS.map(event => ({ ...event })),
      treeSpecies: TREE_SPECIES.map(species => ({ ...species })),
    };
  }

  private saveGameState(): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem('treePlantingGame', JSON.stringify(this.state));
    } catch (e) {
      console.error('Failed to save game state:', e);
    }
  }

  private updateSeasonalEvents(): void {
    const now = new Date();
    this.state.seasonalEvents.forEach(event => {
      event.active = now >= event.startDate && now <= event.endDate;
    });
  }

  public getState(): TreeGameState {
    return { ...this.state };
  }

  public plantTree(speciesId: string = 'oak', donationAmount: number = 0): void {
    const species = this.state.treeSpecies.find(s => s.id === speciesId);
    if (!species || !species.unlocked) return;

    // Calculate trees to plant based on donation amount
    const treesToPlant = Math.max(1, Math.floor(donationAmount / species.cost));
    
    this.state.treesPlanted += treesToPlant;
    this.state.totalDonations += donationAmount;
    
    // Calculate carbon offset
    const activeEvent = this.state.seasonalEvents.find(e => e.active);
    const multiplier = activeEvent ? activeEvent.multiplier : 1;
    this.state.carbonOffset += species.carbonOffset * treesToPlant * multiplier;
    
    // Calculate wildlife attraction
    this.state.wildlifeReturned += species.wildlifeAttraction * treesToPlant;
    
    // Update forest level
    this.state.forestLevel = Math.floor(this.state.treesPlanted / 100) + 1;
    
    // Check achievements
    this.checkAchievements();
    
    this.state.lastUpdate = Date.now();
    this.saveGameState();
  }

  public unlockTreeSpecies(speciesId: string): void {
    const species = this.state.treeSpecies.find(s => s.id === speciesId);
    if (species) {
      species.unlocked = true;
      this.saveGameState();
    }
  }

  private checkAchievements(): void {
    ACHIEVEMENTS.forEach(achievement => {
      if (this.state.achievements.includes(achievement.id)) return;
      
      let unlocked = false;
      switch (achievement.type) {
        case 'trees':
          unlocked = this.state.treesPlanted >= achievement.requirement;
          break;
        case 'carbon':
          unlocked = this.state.carbonOffset >= achievement.requirement;
          break;
        case 'wildlife':
          unlocked = this.state.wildlifeReturned >= achievement.requirement;
          break;
        case 'donations':
          unlocked = this.state.totalDonations >= achievement.requirement;
          break;
      }
      
      if (unlocked) {
        this.state.achievements.push(achievement.id);
      }
    });
  }

  public getAchievements(): Achievement[] {
    return ACHIEVEMENTS.map(achievement => ({
      ...achievement,
      unlocked: this.state.achievements.includes(achievement.id),
    }));
  }

  public getActiveSeasonalEvent(): SeasonalEvent | null {
    return this.state.seasonalEvents.find(event => event.active) || null;
  }

  public calculateEnvironmentalImpact(): {
    carbonOffset: number;
    treesPlanted: number;
    wildlifeReturned: number;
    forestArea: number;
  } {
    return {
      carbonOffset: this.state.carbonOffset,
      treesPlanted: this.state.treesPlanted,
      wildlifeReturned: this.state.wildlifeReturned,
      forestArea: this.state.treesPlanted * 25, // 25 sq meters per tree
    };
  }

  public resetGame(): void {
    this.state = this.getInitialState();
    this.saveGameState();
  }
}

// Global game instance
let gameInstance: TreePlantingGame | null = null;

export const getGameInstance = (): TreePlantingGame => {
  if (!gameInstance) {
    gameInstance = new TreePlantingGame();
  }
  return gameInstance;
}; 