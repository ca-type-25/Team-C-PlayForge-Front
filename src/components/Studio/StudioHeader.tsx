import { GameStudio } from '../../types/studio';

interface StudioHeaderProps {
  studio: GameStudio;
}

const StudioHeader = ({ studio }: StudioHeaderProps) => {
  return (
    <div>
      {studio.logoUrl && (
        <img
          src={studio.logoUrl}
          alt={`${studio.name} logo`}
        />
      )}

      <div>
        <h1>{studio.name}</h1>

        <p>
          {studio.foundedYear && `Founded ${studio.foundedYear}`}
          {studio.foundedYear && studio.headquarters && ' • '}
          {studio.headquarters}
        </p>

        {studio.website && (
          <a
            href={studio.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Website
          </a>
        )}
      </div>
    </div>
  );
};

export default StudioHeader;
