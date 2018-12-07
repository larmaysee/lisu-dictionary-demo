angular.module('dictionary').controller('dictCtrl', [
  '$scope',
  'dictService',
  '$http',
  function($scope, dictService, $http) {
    console.log('You are loading dict Controller');
    const storage = require('electron-storage');
    console.log(storage);
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

    $scope.initFun();
    console.log('Dict Controller end.');
  }
]);
