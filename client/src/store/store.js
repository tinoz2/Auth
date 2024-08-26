import { profileRequest, usersRequest } from '@/api/fetchData'
import { create } from 'zustand'

export const useUsers = create((set) => ({
    user: {},
    users: [],
    isAuthenticated: false,
    fetchUser: async () => {
        try {
            const res = await profileRequest()
            set({ user: res.data.user, isAuthenticated: true })
        } catch (error) {
            console.error(error)
        }
    },
    fetchUsers: async () => {
        try {
            const res = await usersRequest()
            set({ users: res.data })
        } catch (error) {
            console.error(error)
        }
    }
}))