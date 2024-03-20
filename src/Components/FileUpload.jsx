import React, { useState, ChangeEvent } from 'react';

function FileUploadSingle() {
    function uploadFile(files) {
  
        var formData = new FormData();
        
        files.map((file, index) => {
          formData.append(`file${index}`, file);
        });
        
        fetch('http://localhost:4800/ItemData', {
          // content-type header should not be specified!
          method: 'POST',
          body: formData,
        })
          .then(response => response.json())
          .then(success => {
            // Do something with the successful response
          })
          .catch(error => console.log(error)
        );
      }
}

export default FileUploadSingle;
