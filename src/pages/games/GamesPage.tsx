import { useEffect } from "react"
import { Link } from "react-router"
import { useGames } from "../../contexts/GamePageContext"
import styles from './GamesPage.module.scss'


const GamesPage = () => {
    const { games, loading, error, fetchAllGames } = useGames()

    useEffect(() => {
        fetchAllGames()
    }, [fetchAllGames])
    

    const renderStars = (rating: number) => {
        const maxStars = 5 
        const filledStars = Math.round(rating)
        const emptyStars = maxStars - filledStars
    
        return (
            <>
                {Array(filledStars).fill("★").map((star, index) => (
                    <span key={`filled-${index}`} className={styles["filled-star"]}>{star}</span>
                ))}
                {Array(emptyStars).fill("☆").map((star, index) => (
                    <span key={`empty-${index}`} className={styles["empty-star"]}>{star}</span>
                ))}
            </>
        );
    };

    const calculateAverageRating = (reviews: { rating: number }[]) => {
        if (reviews.length === 0) return 0; 
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        return totalRating / reviews.length; 
    };


    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div className={styles['page-container']}>
            <h1 className={styles.h1}>Games</h1>
            <div className={styles['game-list']}>
                {games.map(game => {
                    return (
                        <div key={game._id} className={styles["game-card"]}>
                            <img src={game.cover} alt={game.title} className={styles["game-image"]} />
                            <div className={styles["game-info"]}>
                                <Link to={`/games/${game._id}`} className={styles["game-title"]}>{game.title}</Link>
                                <div>
                                    <p className={styles["rating-stars"]}>{renderStars(calculateAverageRating(game.reviews || []))}</p>
                                    <p>Studio: {game.studio?.name}</p>
                                    <p>Genre: {game.genres.map(genre => genre.title).join(', ')}</p>
                                    <span>Release date: {game.release}</span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <Link to='/games/create'>Add new game</Link>
        </div>
    )
}

export default GamesPage