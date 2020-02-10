const publicVapidKey = 'BJ6V4eliz4-DkWQaqK5GtGrzh5cQHbFqZ4sH-tAA_sJedS1U3QdcN-VP6ugjXofCEJ5ikfkQNlUi3mwNiOrYdvQ';
var subscription 

//check for serevice worker

if('serviceWorker' in navigator){

    send().catch(err => {
        console.log(err);
    })
}

//register SW, Register Push, Send Push
async function send(){
//Register Service Worker    
console.log('Registering Service worker');
const register = await navigator.serviceWorker.register('/worker.js',{
    scopr:'/'
});


//Register Push

subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
});


//send push notification

// await fetch('/subscribe', {method: 'POST',
// body: JSON.stringify(subscription),
// headers: {
//     'content-type': 'application/json'
// }});
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  async function sendPushNotification(){
    await fetch('/subscribe', {method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
        'content-type': 'application/json'
    }});
  }
  