$(document).ready(function() {
  $('#submit-btn').on('click', function(event) {
    event.preventDefault();
    var canvas = document.getElementById('main-canvas');
    var mime = 'image/jpeg';
    var imgURL = canvas.toDataURL(mime);
    var answer;
    var inputOptions = new Promise(function (resolve) {
      setTimeout(function () {
        resolve({
          0: '0',
          1: '1',
          2: '2',
          3: '3',
          4: '4',
          5: '5',
          6: '6',
          7: '7',
          8: '8',
          9: '9',
        })
      }, 1000)
    })
    swal({
      title: 'Select the Answer of the Image',
      background: '#66e3b2',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      confirmButtonColor: '#23bf82',
      cancelButtonColor: '#db3a79',
      allowOutsideClick: false,
      allowEscapeKey: false,
      input: 'radio',
      inputOptions: inputOptions,
      inputValidator: function(result) {
        return new Promise(function (resolve, reject) {
          if (result) {
            answer = result;
            resolve();
          } else reject('You need to select an answer!');
        });
      }
    }).then(function(result) {
      swal({
        title: 'Processing ...',
        timer: 2000,
        showConfirmButton: false,
        background: '#23bf82'
      })
      /* Send AJAX POST */
      $.ajax({
        type: 'post',
        url:  './submit',
        data: { imgURL: imgURL, target: answer },
        dataType: 'json',
        cache: false,
        success: function(data) {
          console.log(data);
        }
      });
    })
  });
});