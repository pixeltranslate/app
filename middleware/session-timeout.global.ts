
export default defineNuxtRouteMiddleware(() => {
    if(process.client) {
        const {data, signOut} = useAuth()
        const date = new Date(data.value?.expires as string)
        if(new Date() >= date) {
            console.log("Expired")
            signOut()
        } else {
            console.log("Not expired")
        }
     }
})