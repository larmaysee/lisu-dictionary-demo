angular.module('dictionary').controller('dictCtrl', [
  '$scope',
  'dictService',
  '$http',
  function($scope, dictService, $http) {
    console.log('You are loading dict Controller');
    const storage = require('electron-storage');
    const fs = require('fs');

    $scope.newWord = {
      engType: ''
    };
    $scope.key_words = '';
    $scope.eng_word = '';
    $scope.unvalid = false;
    $scope.eng = [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z'
    ];
    $scope.mm = [
      'က',
      'ခ',
      'ဂ',
      'ဃ',
      'င',
      'စ',
      'ဆ',
      'ဇ',
      'ဈ',
      'ည',
      'ဋ',
      'ဌ',
      'ဍ',
      'ဎ',
      'ဏ',
      'တ',
      'ထ',
      'ဒ',
      'ဓ',
      'န',
      'ပ',
      'ဖ',
      'ဗ',
      'ဘ',
      'မ',
      'ယ',
      'ရ',
      'လ',
      'ဝ',
      'သ',
      'ဟ',
      'ဠ',
      'အ',
      'ဣ',
      'ဤ',
      'ဥ',
      'ဦ',
      'ဧ',
      'သြ',
      'ဪ'
    ];
    $scope.lisu = [
      'ꓐ',
      'ꓑ',
      'ꓒ',
      'ꓓ',
      'ꓔ',
      'ꓕ',
      'ꓖ',
      'ꓗ',
      'ꓘ',
      'ꓙ',
      'ꓚ',
      'ꓛ',
      'ꓜ',
      'ꓝ',
      'ꓞ',
      'ꓟ',
      'ꓠ',
      'ꓡ',
      'ꓢ',
      'ꓣ',
      'ꓤ',
      'ꓥ',
      'ꓦ',
      'ꓧ',
      'ꓨ',
      'ꓩ',
      'ꓪ',
      'ꓫ',
      'ꓬ',
      'ꓭ',
      'ꓮ',
      'ꓯ',
      'ꓰ',
      'ꓱ',
      'ꓲ',
      'ꓳ',
      'ꓴ',
      'ꓵ',
      'ꓶ',
      'ꓷ'
    ];

    /** check internet */
    $scope.check_online_status = function() {
      if (navigator.onLine) {
        $scope.internet = true;
      } else {
        $scope.internet = false;
      }
    };

    $scope.initFun = function() {
      //check internet
      $scope.check_online_status();

      $scope.activeClass = '';
      $http.get('data.json').success(function(response) {
        $scope.key_words = response.data;
        $scope.eng_word = $scope.key_words;
      });
    };

    /** search data with keypress */
    $scope.searchData = function(data) {
      $scope.activeClass = '';
      $http.get('data.json').success(function(response) {
        $scope.eng_word = response.data.filter(function(word) {
          return word.eng.indexOf(data) > -1;
        });

        $scope.key_words = $scope.eng_word;
        console.log($scope.eng_word);
      });
    };

    /** click data */
    $scope.clickData = function(data) {
      $scope.activeClass = data;
      $http.get('data.json').success(function(response) {
        $scope.eng_word = response.data.filter(function(word) {
          return word.eng === data;
        });
        console.log($scope.eng_word);
      });
    };

    /** mail setting click */
    $scope.mailBox = function() {
      Metro.dialog.open('#mailDialog');
    };

    $scope.sendMail = function(data) {
      console.log(data);
      if (data === undefined || (!data.email && !data.name && !data.message)) {
        $scope.unvalid = true;
      } else {
        $scope.unvalid = false;
      }
    };

    $scope.settingDialog = function() {
      Metro.dialog.open('#settingDialog');
    };

    // @addform
    $scope.addForm = function() {
      Metro.dialog.open('#addFormDialog');
    };

    // @saveData
    $scope.saveData = function(data) {
      var engType = data.engType.split(',');
      var engTypeObj = [];
      engType.forEach(type => {
        console.log(type);
        var obj = {
          type: type
        };
        engTypeObj.push(obj);
      });

      var syntaxs = [];
      if (data.engSyntax1) {
        var synObj1 = {
          eng: data.engSyntax1 ? data.engSyntax1 : '',
          lisu: data.lisuSyntax1 ? data.lisuSyntax1 : '',
          mm: data.mmSyntax1 ? data.mmSyntax1 : ''
        };
        syntaxs.push(synObj1);
      }

      if (data.engSyntax) {
        var synObj = {
          eng: data.engSyntax ? data.engSyntax : '',
          lisu: data.lisuSyntax ? data.lisuSyntax : '',
          mm: data.mmSyntax ? data.mmSyntax : ''
        };
        syntaxs.push(synObj);
      }

      var obj = {
        data: []
      };
      var pushData = {
        eng: data.engWord,
        eng_type: engTypeObj,
        lisu: data.lisuWord,
        mm: data.mmWord ? data.mmWord : '',
        syntax: syntaxs
      };
      console.log(pushData);

      if (data.engWord) {
        fs.readFile('test.json', 'utf8', function(err, data) {
          if (err) {
            console.log(err);
          } else {
            if (data) {
              obj = JSON.parse(data);
            }
            obj.data.push(pushData);
            var saveData = JSON.stringify(obj);
            fs.writeFile('test.json', saveData, 'utf8', data => {
              Metro.dialog.close('#addFormDialog');

              $scope.newWord = {
                engType: '',
                engWord: '',
                lisuWord: '',
                mmWord: '',
                engSyntax: '',
                engSyntax1: '',
                lisuSyntax: '',
                lisuSyntax1: '',
                mmSyntax: '',
                mmSyntax1: ''
              };
            }); // write it back
          }
        });
      }
    };

    $scope.initFun();
    console.log('Dict Controller end.');
  }
]);
