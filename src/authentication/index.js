/* eslint-disable react-hooks/rules-of-hooks */

function checkUser(email, password) {
    if (email === 'admin@admin.com' && password === 'admin') {
        const token = 'TOKENDOUSUARIO';
        return token;
    }

    return null;
}
export default checkUser;
