import { createContext, ReactNode, useCallback, useContext, useState } from "react"
import Game from "../types/game"
import api from "../api"

interface GamesContextType {
    games: Game[]
    game: Game | null
    loading: boolean
    error: string | null
    fetchGameById: (id: string) => Promise<void>
    fetchAllGames: () => Promise<void>
}

const GamesContext = createContext<GamesContextType | undefined>(undefined)

type GamesPageContextProviderProps = {
    children: ReactNode
}

export const GamesProvider: React.FC<GamesPageContextProviderProps> = ({ children }) => {
    const [games, setGames] = useState<Game[]>([])
    const [game, setGame] = useState<Game | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const fetchAllGames = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const { data } = await api.get('/games')
            setGames(data)
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message)
            } else {
                setError("An unexpected error occurred.")
            }
        } finally {
            setLoading(false)
        }
    }, [])

    const fetchGameById = useCallback(async (id: string) => {
        setLoading(true)
        setError(null)
        try {
            const { data } = await api.get(`/games/${id}`)
            setGame(data)
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message)
            } else {
                setError("An unexpected error occurred.")
            }
        } finally {
            setLoading(false)
        }
    }, [])

    const ctxValue = {
        fetchAllGames,
        fetchGameById,
        game,
        games,
        loading,
        error
    }

    return (
        <GamesContext.Provider value={ctxValue}>
            {children}
        </GamesContext.Provider>
    )
    
}

export const useGames = () => {
    const ctx = useContext(GamesContext)

    if (!ctx) {
        throw new Error('useGames cannot be used outside the GamesPageContextProvider')
    }


    return ctx
}