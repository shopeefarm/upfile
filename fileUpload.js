// firebase bucket name
      // REPLACE WITH THE ONE YOU CREATE
      // ALSO CHECK STORAGE RULES IN FIREBASE CONSOLE
      var fbBucketName = 'images';
      // get elements
      var uploader = document.getElementById('uploader');
      var name = document.getElementById('ol_name');
      var fileButton = document.getElementById('fileButton');
      var totalsize = 0;
      var login = "o_7256h5g276";
      var api_key = "15a5a57d93bed61e19ee1b20ec773557b41b428f";
      var long_url = "http://www.kozlenko.info";
      // listen for file selection
      fileButton.addEventListener('change', function(e) {
        // what happened
        console.log('file upload event', e);
        // get file
        var file = e.target.files[0];
        // create a storage ref
        var storageRef = firebase.storage().ref(`${fbBucketName}/${file.name}`);
        // upload file
        var uploadTask = storageRef.put(file);
        // The part below is largely copy-pasted from the 'Full Example' section from
        // https://firebase.google.com/docs/storage/web/upload-files
        // update progress bar
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
          function(snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            totalsize = snapshot.totalBytes;
            uploader.value = progress
            ol_name.value = "Upload Progress: " + progress.toFixed(2) + "%";
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
          },
          function(error) {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;
              case 'storage/canceled':
                // User canceled the upload
                break;
              case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
          },
          function() {
            // Upload completed successfully, now we can get the download URL
            // save this link somewhere, e.g. put it in an input field
            var downloadURL = uploadTask.snapshot.downloadURL;
            console.log('downloadURL', downloadURL);
            Hlinkr.value = "Download Link: " + (totalsize / 1024).toFixed(2) + "kB";
            linkr.value = downloadURL;
          });
      });