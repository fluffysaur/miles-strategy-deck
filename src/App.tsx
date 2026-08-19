import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { CardFinder } from './components/CardFinder';
import { CheatsheetTable } from './components/CheatsheetTable';
import { CardWallet } from './components/CardWallet';
import { CapTracker } from './components/CapTracker';
import { HeyMaxGuide } from './components/HeyMaxGuide';
import { CardDetailModal } from './components/CardDetailModal';
import { PresentationView } from './components/DeckPresentation/PresentationView';
import { CuteParticles } from './components/CuteParticles';
import { SpendTrackerProvider } from './context/SpendTrackerContext';
import { CARDS_DATA } from './data/cards';
import { CardId, CardData } from './types';
import './styles/index.css';
import './styles/app.css';
import './styles/deck.css';

export const App: React.FC = () => {
  const [isDeckMode, setIsDeckMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'finder' | 'cheatsheet' | 'wallet' | 'tracker' | 'heymax'>('finder');
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);

  const handleSelectCard = (cardId: CardId) => {
    const found = CARDS_DATA.find((c) => c.id === cardId);
    if (found) {
      setSelectedCard(found);
    }
  };

  if (isDeckMode) {
    return (
      <SpendTrackerProvider>
        <CuteParticles />
        <PresentationView onExit={() => setIsDeckMode(false)} />
      </SpendTrackerProvider>
    );
  }

  return (
    <SpendTrackerProvider>
      <CuteParticles />
      <div className="app-container">
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onEnterDeckMode={() => setIsDeckMode(true)}
        />

        <main className="main-content">
          {activeTab === 'finder' && <CardFinder onSelectCard={handleSelectCard} />}
          {activeTab === 'cheatsheet' && <CheatsheetTable onSelectCard={handleSelectCard} />}
          {activeTab === 'wallet' && <CardWallet onSelectCard={handleSelectCard} />}
          {activeTab === 'tracker' && <CapTracker />}
          {activeTab === 'heymax' && <HeyMaxGuide />}
        </main>

        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

        <CardDetailModal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
        />
      </div>
    </SpendTrackerProvider>
  );
};

export default App;
