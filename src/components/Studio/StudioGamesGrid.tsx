import { Game } from '../../types/studio';

interface StudioGamesGridProps {
  games: Game[];
}

const StudioGamesGrid = ({ games }: StudioGamesGridProps) => {
  if (!games || games.length === 0) {
    return (
      <div>
        <h2>Games</h2>
        <p>No games available for this studio.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Games</h2>
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            {game.coverImageUrl && (
              <img
                src={game.coverImageUrl}
                alt={`${game.title} cover`}
              />
            )}
            <div>
              <strong>{game.title}</strong>
              {game.releaseYear && <span> ({game.releaseYear})</span>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudioGamesGrid;
