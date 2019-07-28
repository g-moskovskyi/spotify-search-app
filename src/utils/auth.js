function Auth () {

    var client_id = '6b1ee17bdc7643e7a99a095bd321dbb2'; // Your client id
    var querystring = require( 'querystring' );
    var redirect_uri = 'http://localhost:3000/callback'; // Your redirect uri
    var stateKey = 'spotify_auth_state';
    // var state = localStorage.getItem( stateKey );
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
        openLogin( url );
    }

    function openLogin ( url ) {
        const width = 450,
            height = 730,
            left = 0,
            top = 0;
        var loginWindow = window.open( url,
            'Spotify',
            'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
        );
        setTimeout( init( loginWindow ), 3000 );
    };

    function init ( loginWindow ) {
        var hash = {};
        loginWindow.location.hash.replace( /^#\/?/, '' ).split( '&' ).forEach( function ( kv ) {
            var spl = kv.indexOf( '=' );
            if ( spl !== -1 ) {
                hash[ kv.substring( 0, spl ) ] = decodeURIComponent( kv.substring( spl + 1 ) );
            }
        } );
        if ( hash.access_token ) {
            localStorage.setItem( 'hash', JSON.stringify( hash ) );
            loginWindow.close();
        }

    }
}




export default Auth;