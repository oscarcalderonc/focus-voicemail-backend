# focus-voicemail-backend
Dummy backend to expose methods for retrieving a list of voicemail boxes and their messages.

To set up the backend, use the following scripts;

    git clone https://github.com/ocalde/focus-voicemail-backend.git
    cd focus-voicemail-backend
    npm install
    PORT=8080 npx nodemon index.js  // By default the port is 8888 unless specified


It follows the same URL pattern as the real Kazoo app:

[http://localhost:8888/v2/accounts/ACCOUNT_ID/vmboxes](http://localhost:8888/v2/accounts/ACCOUNT_ID/vmboxes)

 - **GET** `/accounts/ACCOUNT_ID/vmboxes` returns a list of voicemail boxes
 - **GET** `/accounts/ACCOUNT_ID/vmboxes/VMBOX_ID/messages` returns a list of voicemail messages belonging to the specified voicemail box. There could be voicemail boxes without messages

