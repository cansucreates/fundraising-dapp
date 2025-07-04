# Forest Revival Initiative - Tree Planting Environmental Conservation DApp

## 🌳 Project Overview

The Forest Revival Initiative is a customized version of the Hiro Platform fundraising template, transformed into an interactive tree planting environmental conservation platform. This DApp combines blockchain fundraising with gamification to create an engaging experience for users to contribute to forest restoration while playing an interactive tree planting game.

## 🎯 Key Features

### Interactive Tree Planting Game
- **Click-to-Plant Mechanics**: Users can plant virtual trees with smooth animations
- **Tree Species Selection**: Choose from Oak, Pine, Maple, and Redwood trees
- **Achievement System**: Unlock milestones as you contribute to forest restoration
- **Seasonal Events**: Spring planting, summer growth, and autumn harvest bonuses
- **Real-time Progress**: Watch your forest grow and wildlife return

### Environmental Impact Tracking
- **Carbon Offset Calculator**: Real-time CO₂ reduction tracking
- **Forest Area Visualization**: See your forest restoration progress
- **Wildlife Return Indicators**: Track species recovery across regions
- **Global Forest Progress**: Monitor restoration across Amazon, Boreal, African Savanna, and Temperate forests

### Blockchain Integration
- **STX & sBTC Donations**: Accept cryptocurrency donations for tree planting
- **Smart Contract Transparency**: All donations publicly verifiable on Stacks blockchain
- **Real-time Updates**: Live tracking of campaign progress and environmental impact
- **Immutable Records**: Permanent environmental impact records

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Stacks wallet (Hiro Wallet recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fundraising-dapp
   ```

2. **Install dependencies**
   ```bash
   cd front-end
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎮 How to Use

### 1. Connect Your Wallet
- Click "Connect Wallet" in the top right
- Choose between Hiro Wallet (mainnet/testnet) or Devnet wallet
- Ensure you have STX or sBTC for donations

### 2. Plant Trees
- Navigate to the "🌳 Plant Trees" tab
- Click the "Plant a Tree" button to start the interactive game
- Choose your preferred tree species
- Watch animations and unlock achievements

### 3. Make Donations
- Click "Plant Trees Now" to open the donation modal
- Choose payment method (STX or sBTC)
- Select donation amount ($10, $25, $50, $100, or custom)
- View real-time environmental impact preview
- Confirm transaction to plant real trees

### 4. Track Impact
- Visit "🌍 Forest Progress" to see global restoration
- Check "📊 Impact Tracker" for detailed environmental metrics
- Monitor carbon offset, forest area, and wildlife return

## 🌍 Environmental Impact

### Campaign Goals
- **Target**: 10,000 STX
- **Trees to Plant**: 100,000 trees
- **Carbon Offset**: 2,200,000 kg CO₂ annually
- **Forest Area**: 2,500,000 square meters
- **Duration**: 90 days

### Impact Per Dollar
- **$1 plants 10 trees**
- **Each tree offsets 22kg CO₂ annually**
- **25 square meters of forest restored per tree**
- **118kg of oxygen produced per tree per year**

### Restoration Regions
1. **Amazon Basin** 🌴 - Tropical rainforest restoration
2. **Boreal Forest** 🌲 - Northern coniferous forest restoration  
3. **African Savanna** 🌳 - Acacia and baobab restoration
4. **Temperate Forest** 🍁 - Mixed deciduous forest restoration

## 🏆 Achievement System

### Milestones
- **🌱 First Steps** - Plant your first tree
- **🌲 Forest Builder** - Plant 100 trees
- **🌍 Carbon Neutral** - Offset 1 ton of CO₂
- **🦌 Wildlife Sanctuary** - Attract 50 wildlife
- **🌳 Forest Master** - Plant 1,000 trees

### Seasonal Events
- **Spring Planting** 🌱 - Trees grow 20% faster
- **Summer Growth** ☀️ - Increased carbon offset
- **Autumn Harvest** 🍂 - Bonus wildlife attraction

## 🛠️ Technical Architecture

### Frontend Components
- **TreePlantingGame.tsx** - Interactive clicker game with animations
- **ForestProgress.tsx** - Global forest restoration visualization
- **ImpactTracker.tsx** - Environmental impact calculations and education
- **CampaignDetails.tsx** - Main campaign interface with tabs
- **DonationModal.tsx** - Enhanced donation flow with impact preview

### Game Logic
- **gameLogic.ts** - Tree planting mechanics, achievements, and state management
- **Local Storage** - Persistent game state between sessions
- **Real-time Updates** - Live environmental impact calculations

### Styling
- **Forest Theme** - Green (#2D5A27) and earth brown (#8B4513) color scheme
- **Animations** - Smooth tree planting and growth animations
- **Responsive Design** - Works on desktop and mobile devices

## 🔧 Customization

### Adding New Tree Species
1. Update `TREE_SPECIES` array in `utils/gameLogic.ts`
2. Add species icon and properties
3. Update game component to display new species

### Modifying Environmental Impact
1. Adjust calculation formulas in `calculateEnvironmentalImpact()`
2. Update impact metrics in `ImpactTracker.tsx`
3. Modify donation success messages in `DonationModal.tsx`

### Changing Campaign Goals
1. Update `CAMPAIGN_GOAL` in `constants/campaign.ts`
2. Modify milestone targets in `MILESTONES` array
3. Adjust progress calculations in components

## 🌱 Environmental Science

### Carbon Sequestration
- Trees absorb CO₂ during photosynthesis
- Average tree offsets 22kg CO₂ annually
- Mature forests are carbon sinks

### Biodiversity Benefits
- Forests provide habitat for 80% of terrestrial species
- Tree diversity supports complex ecosystems
- Wildlife corridors connect fragmented habitats

### Ecosystem Services
- **Air Quality**: Trees filter pollutants and produce oxygen
- **Water Regulation**: Roots prevent erosion and filter water
- **Climate Regulation**: Forests act as natural air conditioners
- **Soil Health**: Tree roots improve soil structure and fertility

## 🤝 Contributing

### Development Guidelines
- Follow TypeScript best practices
- Use Chakra UI components for consistency
- Maintain forest theme throughout
- Test on multiple devices and browsers

### Adding Features
1. Create new components in `src/components/`
2. Update game logic in `utils/gameLogic.ts`
3. Add environmental impact calculations
4. Test thoroughly before deployment

## 📊 Analytics & Monitoring

### Game Metrics
- Trees planted per user
- Achievement unlock rates
- Session duration and engagement
- Donation conversion rates

### Environmental Impact
- Total carbon offset achieved
- Forest area restored
- Wildlife species supported
- Regional restoration progress

## 🌟 Future Enhancements

### Planned Features
- **NFT Tree Certificates** - Unique digital assets for major donors
- **Community Challenges** - Collaborative tree planting goals
- **Real-time Satellite Data** - Actual forest restoration monitoring
- **Carbon Credit Trading** - Blockchain-based carbon markets
- **AR Forest Visualization** - Augmented reality forest experiences

### Technical Improvements
- **Off-chain Game State** - Improved performance and scalability
- **Multi-chain Support** - Additional blockchain integrations
- **Mobile App** - Native iOS and Android applications
- **API Integration** - Real environmental data feeds

## 📞 Support

For questions, issues, or contributions:
- Create an issue in the repository
- Contact the development team
- Join our community discussions

## 🌍 Making a Difference

Every tree planted through this initiative contributes to:
- **Climate Change Mitigation** - Reducing atmospheric CO₂
- **Biodiversity Conservation** - Restoring wildlife habitats
- **Community Development** - Supporting sustainable livelihoods
- **Environmental Education** - Raising awareness about forest conservation

**Remember**: The best time to plant a tree was 20 years ago. The second best time is now.

---

**Forest Revival Initiative** - Planting hope, growing futures, restoring Earth. 🌳🌍🌱 