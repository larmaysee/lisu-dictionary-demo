dictionary.service('settingSrv', [
  '$http',
  function($http) {
    var vm = this;
    var db = new PouchDB('lisu-bible');
    db.info().then(function(info) {
      console.log(info);
    });

    vm.createUser = function(data, onSuccess, onError) {
      var doc = {
        email: data.Email,
        username: data.username,
        address: data.address
      };

      db.post(doc, function(err, res) {
        if (err) {
          console.log('error');
          onError(err);
        } else {
          console.log('success');
          onSuccess(res);
        }
      });
    };

    vm.getUsers = function(onSuccess, onError) {
      db.allDocs(
        {
          include_docs: true
        },
        function(err, res) {
          if (err) {
            console.log('you have error');
            onError(err);
          } else {
            console.log('you are success');
            var docs = res.rows.map(function(row) {
              return row.doc;
            });

            // console.log(docs);
            onSuccess(docs);
          }
        }
      );
    };
  }
]);
