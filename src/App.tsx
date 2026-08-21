import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { CardFinder } from './components/CardFinder';
import { CheatsheetTable } from './components/CheatsheetTable';
import { CardWallet } from './components/CardWallet';
import { HeyMaxGuide } from './components/HeyMaxGuide';
import { CardDetailModal } from './components/CardDetailModal';
import { PresentationView } from './components/DeckPresentation/PresentationView';
import { CuteParticles } from './components/CuteParticles';
import { SpendTrackerProvider } from './context/SpendTrackerContext';
import { LadysCategoryProvider, useLadysCategory } from './context/LadysCategoryContext';
import { CardId, CardData } from './types';
import './styles/index.css';
import './styles/app.css';
import './styles/deck.css';

const MainApp: React.FC = () => {
  const [isDeckMode, setIsDeckMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'finder' | 'cheatsheet' | 'wallet' | 'heymax'>('finder');
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const { cardsData } = useLadysCategory();

  const handleSelectCard = (cardId: CardId) => {
    const found = cardsData.find((c) => c.id === cardId);
    if (found) {
      setSelectedCard(found);
    }
  };

  if (isDeckMode) {
    return (
      <>
        <CuteParticles />
        <PresentationView onExit={() => setIsDeckMode(false)} />
      </>
    );
  }

  return (
    <>
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
          {activeTab === 'heymax' && <HeyMaxGuide />}
        </main>

        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

        <CardDetailModal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
        />
      </div>
    </>
  );
};

export const App: React.FC = () => {
  return (
    <LadysCategoryProvider>
      <SpendTrackerProvider>
        <MainApp />
      </SpendTrackerProvider>
    </LadysCategoryProvider>
  );
};

export default App;
