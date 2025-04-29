import { useEffect, useState } from "react"
import { Link } from "react-router"
import { useGames } from "../../contexts/GamePageContext"
import styles from './GamesPage.module.scss'
import api from "../../api"
import { useAuth } from "../../contexts/AuthContext"

type Genre = {
    _id: string;
    title: string;
};

type Game = {
    _id: string;
    title: string;
    cover: string;
    studio: { name: string };
    genres: Genre[]; 
    release: number;
    description: string;
    video: string;
};

const GamesPage = () => {
    const { games, loading, error, fetchAllGames } = useGames() as { games: Game[]; loading: boolean; error: string; fetchAllGames: () => void }
    const { user, isAdmin } = useAuth()
    const [genres, setGenres] = useState<Genre[]>([])
    const [selectedGenre, setSelectedGenre] = useState<string | null>(null)

    useEffect(() => {
        fetchAllGames()
    }, [fetchAllGames])

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const { data } = await api.get('/genres'); 
                setGenres(data);
            } catch (error) {
                console.error("Failed to fetch genres:", error);
            }
        };
        fetchGenres();
    }, []);

    const filteredGames = selectedGenre
    ? games.filter(game => game.genres.some(genre => genre._id === selectedGenre))
    : games;

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div className={styles['page-container']}>
            <div className={styles['sidebar']}>
                <h2>Browse by Genre</h2>
                <ul>
                    <li
                        className={!selectedGenre ? styles['active-genre'] : ''}
                        onClick={() => setSelectedGenre(null)}
                    >
                        All
                    </li>
                    {genres.map(genre => (
                        <li
                            key={genre._id}
                            className={selectedGenre === genre._id ? styles['active-genre'] : ''}
                            onClick={() => setSelectedGenre(genre._id)}
                        >
                            {genre.title}
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles['main-content']}>
                <h1 className={styles.h1}>Games</h1>
                <div className={styles['game-list']}>
                    {filteredGames.map(game => (
                        <div key={game._id} className={styles["game-card"]}>
                            <img src={game.cover} alt={game.title} className={styles["game-image"]} />
                            <div className={styles["game-info"]}>
                                <Link to={`/games/${game._id}`} className={styles["game-title"]}>{game.title}</Link>
                                <div className={styles['game-info-text']}>
                                    <p>
                                        <span className={styles['game-info-text-label']}>Studio:</span> {game.studio?.name}
                                    </p>
                                    <p>
                                        <span className={styles['game-info-text-label']}>Genre:</span> {game.genres.map(genre => genre.title).join(', ')}
                                    </p>
                                    <p>
                                        <span className={styles['game-info-text-label']}>Release date:</span> {game.release}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {user && isAdmin && (
                    <Link to='/games/create' className={styles["add-game-button"]}>
                        Add new game
                    </Link>
                )}
            </div>
        </div>
    );
}

export default GamesPage