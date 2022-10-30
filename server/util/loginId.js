import crypto from 'crypto'

function randomLoginId(){
    const MAX = 10;
    let loginId = '';
    for(let i = 0 ; i < 8 ; i++){
        loginId += String(crypto.randomInt(MAX));
    }
    return loginId;
}

export default randomLoginId;