console.log('Service Worker Loaded..');

self.addEventListener('push', e => {
    const data =  e.data.json();
    console.log('Push Recieved...');
    self.registration.showNotification(data.title,
        {
            body: 'Hi Mosum',
            icon: 'https://www.efilingbihar.com/wp-content/uploads/2019/04/sign-check-icon.png'
        });
})