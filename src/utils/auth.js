function Auth () {

    var client_id = '6b1ee17bdc7643e7a99a095bd321dbb2'; // Your client id
    var querystring = require( 'querystring' );
    // var client_secret = 'cb274f971da1420183ac57deb1cc56f4';
    // Your secret
    var redirect_uri = 'http://localhost/callback'; // Your redirect uri
    var stateKey = 'spotify_auth_state';
    let state = localStorage.getItem( stateKey );
    console.log( state );
    login();

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
        let scope = 'user-top-read user-library-modify user-read-private user-library-read';

        var url = ( 'https://accounts.spotify.com/authorize?' +
            querystring.stringify( {
                response_type: 'token',
                client_id: client_id,
                scope: scope,
                redirect_uri: redirect_uri,
                state: state
            } ) );
        console.log( 'url', url );
        openLogin( url );
        getAccessToken();

    }


    function openLogin ( url ) {
        var width = 450,
            height = 730,
            left = 0,
            top = 0;

        window.open( url,
            'Spotify',
            'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
        );
    };

    function getAccessToken () {
        var expires = 0 + localStorage.getItem( 'pa_expires', '0' );
        if ( ( new Date() ).getTime() > expires ) {
            return '';
        }
        var token = localStorage.getItem( 'pa_token', '' );
        return token;
    };
    function setAccessToken ( token, expires_in ) {
        localStorage.setItem( 'pa_token', token );
        localStorage.setItem( 'pa_expires', ( new Date() ).getTime() + expires_in );
        // _token = token;
        // _expires = expires_in;
    };
}




export default Auth;