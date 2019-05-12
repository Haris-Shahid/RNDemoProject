app link

https://exp.host/@harisshahid01/blood-bank

Checking if this build already exists...

Building...
Build started, it may take a few minutes to complete.
You can check the queue length at
 https://expo.io/turtle-status

You can monitor the build at

 https://expo.io/builds/2ccf2b1e-5304-4394-9afe-fbab775afbc8

Successfully built standalone app: https://expo.io/artifacts/a6191dc0-52e8-40dc-b65e-dcce55c75e7f



generateUID(){
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 15; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    localStorage.setItem('uid', text);
    return text;
}
