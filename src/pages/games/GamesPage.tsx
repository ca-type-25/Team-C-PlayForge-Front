import { useEffect } from "react"
import { Link } from "react-router"
import { useGames } from "../../contexts/GamePageContext"
import styles from './GamesPage.module.scss'


const GamesPage = () => {
    const { games, loading, error, fetchAllGames } = useGames()

    useEffect(() => {
        fetchAllGames()
    }, [fetchAllGames])


    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div >
            <h1 className={styles.h1}>Games</h1>
            {games.map(game => {
                return (
                    <div key={game._id} className={styles["game-card"]}>
                        <img src={game.cover} alt={game.title} className={styles["game-image"]} />
                        <div className={styles["game-info"]}>
                            <Link to={`/games/${game._id}`} className={styles["game-title"]}>{game.title}</Link>
                            <p className={styles["game-rating"]}>Rating: {game.rating}</p>
                            <p>Studio: {game.studio?.name}</p>
                            <p>Genre: {game.genres.map(genre => genre.title).join(', ')}</p>
                            <span>Release date: {game.release}</span>
                        </div>
                    </div>
                )
            })}
            <Link to='/games/create'>Add new game</Link>
        </div>
    )
}

export default GamesPage