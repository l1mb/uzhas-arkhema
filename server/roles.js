const ROLE = {
    CUSTOMER: 'customer',
    ADMIN: 'admin',
}

module.exports = {
    ROLE: ROLE,
    users: [
        { id: 1, name: 'yan', role: ROLE.ADMIN },
        { id: 2, name: 'korzun', role: ROLE.CUSTOMER },
        { id: 3, name: 'userok', role: ROLE.CUSTOMER },
    ],
    products: [
        { id: 1, name: 'server dimasa', userId: 1 },
        { id: 2, name: 'uzhas arkhema', userId: 2 },
        { id: 3, name: 'pasasal kok(', userId: 3 },
    ],
}
