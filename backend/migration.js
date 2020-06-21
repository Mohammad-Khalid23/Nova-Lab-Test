
//run this is your mongodb to create a sellet with password abc123
db.getCollection('users').insert({
    "role" : "seller",
    "email" : "s2@s2.com",
    "firstName" : "Seller",
    "lastName" : "Khan",
    "password" : "$2b$16$EQEggd2bkwMuXsVnw4Ft9Oj8xzz.h9mo1KmlAV0/KndBJ0.n9xSUG",
    "created_at" : new Date(),
    "updated_at" : new Date()
})