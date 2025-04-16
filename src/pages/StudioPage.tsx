import { useParams } from 'react-router-dom';
import { StudioProvider } from '../context/StudioContext';
import StudioHeader from '../components/Studio/StudioHeader';
import StudioInfo from '../components/Studio/StudioInfo';
import StudioGamesGrid from '../components/Studio/StudioGamesGrid';
import { useStudio } from '../hooks/useStudio';

const StudioPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) return <div>Invalid studio ID.</div>;

  return (
    <StudioProvider id={id}>
      <StudioContent />
    </StudioProvider>
  );
};

const StudioContent = () => {
  const { studio, loading, error } = useStudio();

  if (loading) return <div>Loading...</div>;
  if (error || !studio) return <div>Error loading studio.</div>;

  return (
    <>
      <StudioHeader studio={studio} />
      <StudioInfo studio={studio} />
      <StudioGamesGrid games={studio.games} />
    </>
  );
};

export default StudioPage;
