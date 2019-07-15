function authorization() {

    var client_id = '6b1ee17bdc7643e7a99a095bd321dbb2'; // Your client id
    var querystring = require( 'querystring' );
    // var client_secret = 'cb274f971da1420183ac57deb1cc56f4';
    // Your secret
    var redirect_uri = 'http://localhost:3000/callback'; // Your redirect uri
    var stateKey = 'spotify_auth_state';
    let state = localStorage.getItem( stateKey );
    console.log( state );
    // if ( !state ) {
    login()
    // };


    function login() {
        /**
         * Generates a random string containing numbers and letters
         * @param  {number} length The length of the string
         * @return {string} The generated string
         */
        const generateRandomString = ( length ) => {
            let text = '';
            let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

            for ( let i = 0; i < length; i++ ) {
                text += possible.charAt( Math.floor( Math.random() * possible.length ) );
            }
            return text;
        };

        let state = generateRandomString( 16 );
        localStorage.setItem( stateKey, state );

        // your application requests authorization
        let scope = 'user-read-private user-read-email';
        const xhr = new XMLHttpRequest();

        let res = ( 'https://accounts.spotify.com/authorize?' +
            querystring.stringify( {
                response_type: 'code',
                client_id: client_id,
                scope: scope,
                redirect_uri: redirect_uri,
                state: state
            } ) );
        console.log( res );

        xhr.open( 'GET', res, true );
        // xhr.setRequestHeader( 'Access-Control-Allow-Origin', '*' );
        xhr.send();

    }
}

export default authorization;


// app.get( '/callback', function ( req, res ) {

//     // your application requests refresh and access tokens
//     // after checking the state parameter

//     var code = req.query.code || null;
//     var state = req.query.state || null;
//     var storedState = req.cookies ? req.cookies[ stateKey ] : null;

//     if ( state === null || state !== storedState ) {
//         res.redirect( '/#' +
//             querystring.stringify( {
//                 error: 'state_mismatch'
//             } ) );
//     } else {
//         res.clearCookie( stateKey );
//         var authOptions = {
//             url: 'https://accounts.spotify.com/api/token',
//             form: {
//                 code: code,
//                 redirect_uri: redirect_uri,
//                 grant_type: 'authorization_code'
//             },
//             headers: {
//                 'Authorization': 'Basic ' + ( new Buffer( client_id + ':' + client_secret ).toString( 'base64' ) )
//             },
//             json: true
//         };

//         request.post( authOptions, function ( error, response, body ) {
//             if ( !error && response.statusCode === 200 ) {

//                 var access_token = body.access_token,
//                     refresh_token = body.refresh_token;

//                 var options = {
//                     url: 'https://api.spotify.com/v1/me',
//                     headers: {
//                         'Authorization': 'Bearer ' + access_token
//                     },
//                     json: true
//                 };

//                 // use the access token to access the Spotify Web API
//                 request.get( options, function ( error, response, body ) {
//                     console.log( body );
//                 } );

//                 // we can also pass the token to the browser to make requests from there
//                 res.redirect( '/#' +
//                     querystring.stringify( {
//                         access_token: access_token,
//                         refresh_token: refresh_token
//                     } ) );
//             } else {
//                 res.redirect( '/#' +
//                     querystring.stringify( {
//                         error: 'invalid_token'
//                     } ) );
//             }
//         } );
//     }
// } );