import { useNavigate} from 'react-router'
import { useAuth } from './context/AuthContext'
import { FunctionComponent, useEffect } from 'react'

export function AuthGuarded<T extends object>(Component: FunctionComponent<T>) {
    return function AuthGuardedComponent(props: T) {
        const { token, loading } = useAuth()
        const nav = useNavigate()
        useEffect(() => {
        if(!token && !loading) {
            nav('/login')
        }
        } , [token,loading,nav])
        if (!token) {
            return null
        }
      
        return <Component {...props} />
    }
}