import { User } from './types/User'
export const users: User[] = []

const firstNames = ['Jim', 'Josh', 'John', 'Jenny']
const lastNames = ['Williams', 'Smith', 'Timmons', 'Huntington']
const minimumAge = 18
for (let i = 0; i < 100; i++) {
    const firstName = firstNames[Math.floor(Math.random() * 100) % firstNames.length]
    const lastName = lastNames[Math.floor(Math.random() * 100) % lastNames.length]
    const name = `${firstName} ${lastName}`
    const bio = `My name is ${name}. I am from the United States.`
    const image = `https://picsum.photos/id/${i}/400/400`
    const age = (Math.floor(Math.random() * 100) % 50) + minimumAge
    users.push({
        id: i,
        name,
        age,
        firstName,
        lastName,
        bio,
        image,
        friends: [],
        family: []
    })
}
for (let i = 0; i < users.length; i++) {
    const user: User = users[i]
    for (let z = 0; z < users.length; z++) {
        const other = users[z]
        if (other.id === user.id) {
            continue
        }
        if (other.firstName !== user.firstName && other.lastName !== user.lastName) {
            user.friends.push(other.id)
        }
        if (other.lastName === user.lastName) {
            user.family.push(other.id)
        }
    }
}

export default users