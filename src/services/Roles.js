export const getRole = (role) => {
    switch(role){
        case "1":
            return "Director"
        case "2":
            return "Admin"
        case "3":
            return "Moderator"
        case "4":
            return "O'qituvchi"
        case "5":
            return "Student"
        case "777":
            return "Superadmin"
        default:
            return null;
    }
}