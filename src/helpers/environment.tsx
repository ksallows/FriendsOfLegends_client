let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:3000';
        break;
    case 'ks-friendsoflegends-client.herokuapp.com':
        APIURL = 'ks-friendsoflegends-server.herokuapp.com'
}

export default APIURL