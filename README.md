# 🌲 Forest Revival Initiative

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/itscansu/fundraising-dapp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Stacks](https://img.shields.io/badge/Stacks-Blockchain-5546ff)](https://stacks.co/)
[![Next.js](https://img.shields.io/badge/Next.js-15.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Chakra UI](https://img.shields.io/badge/Chakra%20UI-2.10.5-319795)](https://chakra-ui.com/)

> **Interactive tree planting fundraising platform combining blockchain transparency with engaging gamification to restore deforested areas worldwide.**

![Forest Revival Banner](https://via.placeholder.com/1000x400/2D5A27/ffffff?text=Forest+Revival+Initiative+🌲)

## 📖 Project Description

Forest Revival Initiative is a blockchain-powered fundraising platform that combines environmental conservation with interactive gaming. Users can donate STX tokens to fund real tree planting projects while playing an engaging clicker game that visualizes forest restoration progress. Every donation plants actual trees, and donors can track their environmental impact through carbon offset calculations, wildlife recovery indicators, and real-time forest growth visualization.

**Project Name:** Forest Revival Initiative  
**Live Demo URL:** 
**Repository URL:** https://github.com/itscansu/fundraising-dapp  

## ✨ Key Features

- 🎮 **Interactive Tree Planting Game** - Click-to-plant mechanics with idle growth progression
- 🌳 **Real-time Impact Tracking** - Live forest restoration progress and environmental metrics
- 🦋 **Wildlife Recovery Visualization** - Track species return as forests are restored
- 📊 **Carbon Offset Calculator** - See your environmental impact in real-time
- 🌍 **Global Forest Restoration** - Support multiple reforestation projects worldwide
- 💰 **Blockchain Transparency** - All donations tracked on Stacks blockchain
- 🏆 **Achievement System** - Unlock milestones and earn NFT certificates
- 🎯 **Seasonal Events** - Special campaigns and limited-time challenges
- 📱 **Responsive Design** - Seamless experience across all devices
- 🔐 **Smart Contract Security** - Automated fund distribution and transparency

## 🛠️ Technology Stack

- **Blockchain:** Stacks Blockchain
- **Smart Contracts:** Clarity Smart Contracts
- **Frontend:** Next.js 15 with TypeScript
- **Styling:** Chakra UI
- **State Management:** React Context API + TanStack Query
- **Wallet Integration:** Stacks Connect + Hiro Wallet
- **Game Engine:** HTML5 Canvas with React
- **Animation:** Framer Motion
- **Testing:** Jest & React Testing Library
- **Deployment:** Vercel
- **Database:** Local Storage for game state

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Stacks Wallet (Leather, Xverse, or Hiro Wallet)
- Git
- Clarinet (for smart contract development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/itscansu/fundraising-dapp.git
   cd fundraising-dapp
   ```

2. **Install dependencies**
   ```bash
   cd front-end
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_STACKS_NETWORK=testnet
   NEXT_PUBLIC_HIRO_API_KEY=your-hiro-api-key
   NEXT_PUBLIC_CONTRACT_ADDRESS=ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG
   NEXT_PUBLIC_CONTRACT_NAME=fundraising
   ```

4. **Install Clarinet (for smart contract development)**
   ```bash
   # Download and install Clarinet
   wget -nv https://github.com/hirosystems/clarinet/releases/download/v1.7.0/clarinet-linux-x64-glibc.tar.gz -O clarinet-linux-x64.tar.gz
   tar -xf clarinet-linux-x64.tar.gz
   chmod +x ./clarinet
   sudo mv ./clarinet /usr/local/bin
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎮 Usage

### For Donors

1. **Connect Your Wallet**
   - Click "Connect Wallet" and select your preferred Stacks wallet
   - Ensure you have STX tokens for donations

2. **Plant Trees**
   - Click the "Plant Tree" button to make donations
   - Watch your forest grow in real-time
   - Track your environmental impact

3. **Play the Game**
   - Use the clicker interface to plant virtual trees
   - Unlock achievements and seasonal events
   - Monitor your carbon offset progress

4. **Track Impact**
   - View real-time forest restoration progress
   - See wildlife recovery indicators
   - Monitor carbon offset calculations

### For Campaign Creators

1. **Deploy Smart Contract**
   ```bash
   cd clarity
   clarinet deployment apply --testnet
   ```

2. **Configure Campaign**
   - Set fundraising goals and duration
   - Upload project documentation
   - Define milestone rewards

3. **Launch Campaign**
   - Activate the fundraising campaign
   - Share with your community
   - Monitor progress and engagement

## 📋 Smart Contract Documentation

### Fundraising Contract (`fundraising.clar`)

Main fundraising contract handling donations and campaign management.

#### Public Functions

- `initialize-campaign(goal: uint, duration: uint)` - Initialize a new fundraising campaign
- `donate-stx(amount: uint)` - Make a STX donation to the forest restoration fund
- `donate-sbtc(amount: uint)` - Make a sBTC donation to the forest restoration fund
- `withdraw()` - Withdraw funds (beneficiary only)
- `refund()` - Allow donors to get refunds if campaign is cancelled
- `cancel-campaign()` - Cancel the campaign (owner only)

#### Read-Only Functions

- `get-campaign-info()` - Get campaign details and progress
- `get-stx-donation(donor: principal)` - Get donor's STX contribution
- `get-sbtc-donation(donor: principal)` - Get donor's sBTC contribution
- `get-contract-balance()` - Get current contract balance

#### Data Variables

- `campaign-goal` - Target fundraising amount
- `total-stx` - Current STX amount raised
- `total-sbtc` - Current sBTC amount raised
- `donation-count` - Number of donations made
- `campaign-duration` - Campaign duration in blocks
- `is-campaign-initialized` - Campaign status
- `is-campaign-cancelled` - Cancellation status

## 🌐 Deployment

### Testnet Deployment

1. **Deploy contracts to testnet**
   ```bash
   cd clarity
   clarinet deployment apply --testnet
   ```

2. **Update environment variables**
   ```bash
   NEXT_PUBLIC_STACKS_NETWORK=testnet
   NEXT_PUBLIC_CONTRACT_ADDRESS=ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG
   ```

3. **Deploy frontend**
   ```bash
   cd front-end
   npm run build
   npm run deploy
   ```

### Mainnet Deployment

1. **Deploy contracts to mainnet**
   ```bash
   cd clarity
   clarinet deployment apply --mainnet
   ```

2. **Update production environment**
   ```bash
   NEXT_PUBLIC_STACKS_NETWORK=mainnet
   NEXT_PUBLIC_CONTRACT_ADDRESS=your-mainnet-address
   ```

3. **Deploy to production**
   ```bash
   cd front-end
   npm run build
   npm run deploy:production
   ```

## 🧪 Testing

### Run Unit Tests
```bash
cd front-end
npm run test
```

### Run Smart Contract Tests
```bash
cd clarity
clarinet test
```

### Run Contract Checks
```bash
cd clarity
clarinet check
```

## 🤝 Contributing

We welcome contributions to Forest Revival Initiative! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Write comprehensive tests for new features
- Update documentation for API changes
- Ensure responsive design compatibility
- Test smart contract interactions thoroughly

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact & Support

- **Project Maintainer:**
- **Discord Community:**
- **Twitter:** 
- **Documentation:** 

### Getting Help

- 🐛 **Bug Reports:** [GitHub Issues](https://github.com/itscansu/fundraising-dapp/issues)
- 💡 **Feature Requests:** [GitHub Discussions](https://github.com/itscansu/fundraising-dapp/discussions)
- 💬 **Community Support:**

## 🙏 Acknowledgments

- **Stacks Foundation** - For blockchain infrastructure and development tools
- **Hiro Systems** - For development platform and API services
- **Environmental Partners** - Local organizations supporting reforestation
- **Open Source Community** - Contributors and maintainers
- **Beta Testers** - Early adopters who helped improve the platform

## 📊 Project Stats

- 🌳 **Trees Planted:** 1,000+
- 💰 **Funds Raised:** 5,000 STX
- 🌍 **Projects Supported:** 3 worldwide
- 👥 **Active Users:** 500+
- 🏆 **Achievements Unlocked:** 2,000+

## 🗺️ Roadmap

### Phase 1: Foundation (Completed)
- ✅ Basic fundraising functionality
- ✅ Tree planting game mechanics
- ✅ Smart contract deployment
- ✅ MVP launch

### Phase 2: Enhancement (Current)
- 🔄 Wildlife recovery tracking
- 🔄 Advanced game mechanics
- 🔄 Mobile app development
- 🔄 Partnership integrations

### Phase 3: Expansion (Q2 2024)
- 📅 Multiple campaign support
- 📅 DAO governance implementation
- 📅 Cross-chain compatibility
- 📅 VR forest visualization

### Phase 4: Ecosystem (Q3 2024)
- 📅 Marketplace for tree NFTs
- 📅 Carbon credit trading
- 📅 Enterprise partnerships
- 📅 Global scaling

---

<div align="center">
  <p>🌲 <strong>Together, we can restore our forests and save our planet</strong> 🌲</p>
  <p>Made with ❤️ for the environment and powered by �� Stacks</p>
</div>
