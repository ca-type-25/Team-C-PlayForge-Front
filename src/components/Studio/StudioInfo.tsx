import { GameStudio } from '../../types/studio';

interface StudioInfoProps {
  studio: GameStudio;
}

const StudioInfo = ({ studio }: StudioInfoProps) => {
  return (
    <div>
      <h2>About</h2>
      {studio.description ? (
        <p>{studio.description}</p>
      ) : (
        <p>No description available for this studio.</p>
      )}
    </div>
  );
};

export default StudioInfo;
