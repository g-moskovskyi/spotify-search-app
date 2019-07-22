function auth_old () {

    var client_id = '6b1ee17bdc7643e7a99a095bd321dbb2'; // Your client id
    var querystring = require( 'querystring' );
    // var client_secret = 'cb274f971da1420183ac57deb1cc56f4';
    // Your secret
    var redirect_uri = 'http://localhost/callback'; // Your redirect uri
    var stateKey = 'spotify_auth_state';
    let state = localStorage.getItem( stateKey );
    console.log( state );
    // if ( !state ) {
    login()
    // };

    function generateRandomString ( length ) {
        let text = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for ( let i = 0; i < length; i++ ) {
            text += possible.charAt( Math.floor( Math.random() * possible.length ) );
        }
        return text;
    };

    function login () {
        /**
         * Generates a random string containing numbers and letters
         * @param  {number} length The length of the string
         * @return {string} The generated string
         */


        let state = generateRandomString( 16 );
        localStorage.setItem( stateKey, state );

        // your application requests authorization
        let scope = 'user-library-modify user-read-private';
        let xhr = new XMLHttpRequest();

        var resp = ( 'https://accounts.spotify.com/authorize?' +
            querystring.stringify( {
                response_type: 'code',
                client_id: client_id,
                scope: scope,
                redirect_uri: redirect_uri,
                state: state
            } ) );
        console.log( resp );

        xhr.open( 'GET', resp, true );
        // xhr.setRequestHeader( 'Access-Control-Allow-Origin', '*' );
        xhr.send();

    }
}

export default auth_old;