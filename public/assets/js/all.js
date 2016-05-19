angular.module('orthoApp', ['ui.router', 'ngAnimate']);

angular.module('orthoApp')
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    // home route
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/components/main/home/homeTmpl.html',
        controller: 'homeCtrl'
      })

      // patient information routes and subviews
      .state('patientinformation', {
        url: '/patientinformation',
        templateUrl: 'app/components/main/patientinformationviews/patientinformation.html',
        // controller: 'patientInformationController'
      })
      .state('patientinformation.introduction', {
        url: '/introduction',
        templateUrl: 'app/components/main/patientinformationviews/patientinformation.introduction.html'
      })
      .state('patientinformation.whychooseourpractice', {
        url: '/whychooseourpractice',
        templateUrl: 'app/components/main/patientinformationviews/patientinformation.whychooseourpractice.html'
      })
      .state('patientinformation.patientregistration', {
        url: '/patientregistration',
        templateUrl: 'app/components/main/patientinformationviews/patientinformation.patientregistration.html'
      })
      .state('patientinformation.paymentandinsurance', {
        url: '/paymentandinsurance',
        templateUrl: 'app/components/main/patientinformationviews/patientinformation.paymentandinsurance.html'
      })

      // about orthodontics routes and subviews
      .state('aboutorthodontics', {
        url: '/aboutorthodontics',
        templateUrl: 'app/components/main/aboutorthodonticsviews/aboutorthodontics.html',
        // controller: 'aboutOrthodonticsController'
      })
      .state('aboutorthodontics.orthodontictreatment', {
        url: '/orthodontictreatment',
        templateUrl: 'app/components/main/aboutorthodonticsviews/aboutorthodontics.orthodontictreatment.html'
      })
      .state('aboutorthodontics.childrenandbraces', {
        url: '/childrenandbraces',
        templateUrl: 'app/components/main/aboutorthodonticsviews/aboutorthodontics.childrenandbraces.html'
      })
      .state('aboutorthodontics.adultsandbraces', {
        url: '/adultsandbraces',
        templateUrl: 'app/components/main/aboutorthodonticsviews/aboutorthodontics.adultsandbraces.html'
      })

      // services routes and subviews
      .state('services', {
        url: '/services',
        templateUrl: 'app/components/main/servicesViews/services.html'
        // controller: 'patientInformationController'
      })
      .state('services.braces', {
        url: '/braces',
        templateUrl: 'app/components/main/servicesViews/services.braces.html'
      })
      .state('services.clearbraces', {
        url: '/clearbraces',
        templateUrl: 'app/components/main/servicesViews/services.clearbraces.html'
      })
      .state('services.appliances', {
        url: '/appliances',
        templateUrl: 'app/components/main/servicesViews/services.appliances.html'
      })
      .state('services.invisalign', {
        url: '/invisalign',
        templateUrl: 'app/components/main/servicesViews/services.invisalign.html'
      })

      // meetus route
      .state('meetus', {
        url: '/meetus',
        templateUrl: 'app/components/main/meetus/meetus.html'
      })

      // account routes and subviews
      .state('account', {
        url: '/account',
        templateUrl: 'app/components/account/account.html'
      })
      .state('account.signin', {
        url: '/signin',
        templateUrl: 'app/components/account/account.signin.html',
        controller: 'signInCtrl'
      })
      .state('account.patientdashboard', {
        url: '/dashboard/patient',
        templateUrl: 'app/components/account/patientDashboard/account.patientdashboard.html',
        controller: 'dashboardCtrl',
      })
      .state('account.doctordashboard', {
        url: '/dashboard/doctor',
        templateUrl: 'app/components/account/doctorDashboard/account.doctordashboard.html',
        controller: 'dashboardCtrl',
      });

  });

angular.module('orthoApp')
  .service('accountService', function($http) {

    var sitePath = 'http://localhost:9001';

    this.login = function(user) {
      return $http ({
        method: 'POST',
        url: '/login',
        data: user
      }).then(function(response) {
        return response;
      });
    };

    this.register = function(newUser) {
      return $http ({
        method: 'POST',
        url: '/users',
        data: newUser
      }).then(function(response) {
        return response;
      });
    };

    this.getUsers = function () {
      return $http ({
        method: 'GET',
        url: '/users'
      }).then(function(response) {
        return response;
      });
    };

    this.getCurrentUser = function() {
      return $http ({
        method: 'GET',
        url: '/me'
      }).then(function(response) {
        return response;
      });
    };

    this.updateCurrentUser = function(userId, newUserInfo) {
      return $http ({
        method: 'PUT',
        url: '/users/' + userId,
        data: newUserInfo
      }).then(function(response) {
        return response;
      });
    };

  });

angular.module('orthoApp')
    .controller('dashboardCtrl', function($scope, accountService) {

        // tab views
        $scope.homeTab = true;
        $scope.paymentTab = false;
        $scope.settingsTab = false;
        // dr only
        $scope.patientTab = false;
        $scope.patientTabTab = false;

        $scope.showHome = function() {
            $scope.homeTab = true;
            $scope.paymentTab = false;
            $scope.settingsTab = false;
        };
        $scope.showPatient = function() {
            $scope.homeTab = false;
            $scope.patientTab = true;
            $scope.patientTabTab = true;
        };
        $scope.closePatient = function() {
            $scope.homeTab = true;
            $scope.patientTab = false;
            $scope.patientTabTab = false;
        };
        $scope.showPayment = function() {
            $scope.homeTab = false;
            $scope.paymentTab = true;
            $scope.settingsTab = false;
        };
        $scope.showSettings = function() {
            $scope.homeTab = false;
            $scope.paymentTab = false;
            $scope.settingsTab = true;
        };

        $scope.getUsers = function() {

        };

        $scope.userStatus = true;
        $scope.getCurrentUser = function() {
            accountService.getCurrentUser()
                .then(function(response) {
                    $scope.user = response.data;
                    $scope.pendingEmailChange = $scope.user.email;
                    $scope.pendingPhoneNumberChange = $scope.user.phoneNumber;

                    var status = $scope.user.status;
                    if(status === 'pending' || status === 'prospect') {
                      $scope.userStatus = false;
                      $scope.showPaperwork = true;
                    }
                    if(status === 'active' || status === 'graduated') {
                      $scope.userStatus = true;
                      $scope.showPaperwork = false;
                    }
                });
        };
        $scope.getCurrentUser();

        $scope.updateEmailBool = false;
        $scope.updateNumberBool = false;
        $scope.editEmail = function() {
            $scope.updateEmailBool = true;
            $scope.updateNumberBool = false;
            $('#email-update').css({
                width: $('#email-info').width() + 'px'
            });
        };
        $scope.editPhoneNumber = function() {
            $scope.updateNumberBool = true;
            $scope.updateEmailBool = false;
            $('#phone-update').css({
                width: $('#phone-info').width() + 'px',
                maxWidth: '200px'
            });
        };

        // $scope.pendingEmailChange = $scope.user.email;
        // $scope.pendingPhoneNumberChange = $scope.user.phoneNumber;

        $scope.updateUser = function(field, info) {
          console.log($scope.user);
            if(info === $scope.user.phoneNumber || info === $scope.user.email) {
              $scope.updateEmailBool = false;
              $scope.updateNumberBool = false;
              return null;
            }
            if (field === 'email') {
                $scope.user.email = info;
            }
            if (field === 'phone') {
                $scope.user.phoneNumber = info;
            }
            accountService.updateCurrentUser($scope.user._id, $scope.user)
                .then(function(response) {
                    $scope.getCurrentUser();
                    $scope.updateEmailBool = false;
                    $scope.updateNumberBool = false;
                });
        };

        /*** Dashbaord Jquery ***/

        var tab = $('.dashboard-tab');

        tab.click(function() {
            if (tab.hasClass('selected')) {
                tab.removeClass('selected').addClass('blurred');
            }
            if (!$(this).hasClass('selected')) {
                $(this).addClass('selected').removeClass('blurred');
            }
        });

    });

angular.module('orthoApp')
  .controller('signInCtrl', function($scope, accountService, $state) {

    String.prototype.capitalizeFirstLetter = function() {
      return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
    };

    $scope.userLogin = function() {
      var userLoginInfo = {
        email: $scope.user.email,
        password: $scope.user.password
      };
      accountService.login(userLoginInfo)
        .then(function(response) {
          $state.go('account.patientdashboard');
        }).catch(function(error) {
          console.log(error, 'user could not login signinctrl23');
        });
    };

    $scope.register = function(userInfo) {
      if($scope.user.password !== $scope.user.confirmPassword) {
        //alert password don't match
        console.log('passwords do not match');
        return null;
      }
      if($scope.user.email !== $scope.user.confirmEmail) {
        // show error box that says email does not match
        console.log('email does not match');
        return null;
      }
      else {
        var newUserInfo = {
          name: {
            firstname: $scope.user.name.firstname,
            lastname: $scope.user.name.lastname
          },
          email: $scope.user.email,
          password: $scope.user.password
        };
        var userLoginInfo = {
          email: $scope.user.email,
          password: $scope.user.password
        };
        accountService.register(newUserInfo)
          .then(function(response) {
            console.log(response.data);
            accountService.login(userLoginInfo)
              .then(function(response) {
                $state.go('account.patientdashboard');
              }).catch(function(error) {
                console.log(error, 'user could not login signinctrl23');
              });
          });
      }
    };


    /***** signin jquery start *****/

    //declare variables

    var selectorButton = $('.selector-button');
    var signupField = $('.signup-field');
    var forgotPassword = $('.forgot-password');

    signupField.hide();

    // change selector button text color

    selectorButton.click(function() {
      $(this).addClass('active');
      $(this).removeClass('inactive');
      selectorButton.not($(this)).removeClass('active');
      selectorButton.not($(this)).addClass('inactive');
    });

    // animate form on sign in or sign up button click

    $('#signinbtn').click(function() {

      // animate underline

      $('.btn-underline-half').
        animate({marginLeft: '0'}, 800);

      //animate fields

      setTimeout(function() {
        $('.firstname-field').
          slideUp(500);
        $('.name-field').
          animate({opacity: '0'}, 300);
      }, 200);
      setTimeout(function() {
        $('.lastname-field').
          slideUp(500);
        $('.lastname-field').
          animate({opacity: '0'}, 300);
      }, 200);
      setTimeout(function() {
        $('.confirm-email-field').
        slideUp(500);
        $('.confirm-email-field').
        animate({opacity: '0'}, 300);
      }, 200);
      setTimeout(function() {
        $('.confirm-field').
          slideUp(500);
        $('.confirm-field').
          animate({opacity: '0'}, 300);
      }, 200);

      // show forgot password

      setTimeout(function() {
        forgotPassword
          .animate({opacity: '1'}, 300)
          .delay(250)
          .slideDown(300);
      }, 100);
    });


    $('#signupbtn').click(function() {

      // animate underline

      $('.btn-underline-half').
        animate({marginLeft: '50%'}, 800);

      // hide forgot password

      forgotPassword.
        animate({opacity: '0'}, 300)
        // .delay(250)
        .slideUp(300);

      // animate fields

      setTimeout(function() {
        $('.firstname-field')
        .slideDown(500)
        .css({ opacity: 1, transition: 'opacity .30s' });
      }, 600);
      setTimeout(function() {
        $('.lastname-field')
        .slideDown(500)
        .css({ opacity: 1, transition: 'opacity .30s' });
      }, 600);
      setTimeout(function() {
        $('.confirm-email-field')
        .slideDown(500)
        .css({ opacity: 1, transition: 'opacity .30s' });
      }, 600);
      setTimeout(function() {
        $('.confirm-field')
        .slideDown(500)
        .css({ opacity: 1, transition: 'opacity .30s' });
      }, 600);
    });

    // highlight underline of selected field
    $('.input').on('focus', function() {
      $(this).siblings('.underline').addClass('field-active');
    });
    $('.input').on('blur', function() {
      $(this).siblings('.underline').removeClass('field-active');
    });


  });

angular.module('orthoApp')
  .directive('footerdir', function() {

    return {
      restrict: 'AE',
      templateUrl: 'app/shared/footer/footerdir.html'
    };
    
  });

angular.module('orthoApp')
  .directive('navbardir', function() {

    return {
      restrict: 'AE',
      templateUrl: 'app/shared/navbar/navbardir.html',
      controller: function($scope, $state) {

        $scope.menuBool = false;
        $scope.menuToggle = function() {
          if($scope.menuBool === false) {
            return $scope.menuBool = true;
          }
          if($scope.menuBool === true) {
            return $scope.menuBool = false;
          }
        };

      },
      link: function(scope, elements, attributes) {

          var mobileMenu = $('.mobile-menu');
          var menuLink = $('.mobile-menu-link');
          var subLink = $('.mobile-menu-sublink-list');
          var main = $('.main');

          mobileMenu.hide();
          subLink.hide();

          // $scope.scrollLock = '{position: fixed}';

          $('.mobile-menu-button').click(function() {
            mobileMenu.toggle('slide');
            $('.mobile-call-button').toggleClass('hidden');
          });

          main.click(function() {
            mobileMenu.hide('slide');
            if($('.mobile-call-button').hasClass('hidden')) {
              $('.mobile-call-button').removeClass('hidden');
            }
          });

          menuLink.click(function() {
            $(this).siblings('.mobile-menu-sublink-list').slideToggle();
            $(this).children().children('.list-arrow').toggleClass('list-arrow-toggle');
            subLink.not($(this).siblings()).slideUp();
            $('.list-arrow').not($(this).children('div').children('.list-arrow')).removeClass('list-arrow-toggle');
          });

          subLink.click(function() {
            $('body').removeClass('fixed');
            mobileMenu.toggle('slide');
            $(this).slideToggle();
            $('.list-arrow').removeClass('list-arrow-toggle');
          });
      }
    };
  });

angular.module('orthoApp')
  .controller('mainCtrl', function($scope, mainService, $state) {

    $scope.sociallinks = mainService.sociallinks;
    $scope.homesectionlinks = mainService.homesectionlinks;
    $scope.patientinfosectionlinks = mainService.patientinfosectionlinks;
    $scope.aboutorthosectionlinks = mainService.aboutorthosectionlinks;
    $scope.servicessectionlinks = mainService.servicessectionlinks;

    // $scope.verifyAuth() {
    //
    // }

  });

angular.module('orthoApp')
  .service('mainService', function() {

    this.sociallinks = [
    {
      name: 'facebook',
      id: 'fb',
      path: './assets/img/icons/facebook.png',
      alt: 'facebook link'
    },
    {
      name: 'instagram',
      id: 'ig',
      path: './assets/img/icons/instagram.png',
      alt: 'instagram link'
    },
    {
      name: 'twitter',
      id: 'tt',
      path: './assets/img/icons/twitter.png',
      alt: 'twitter link'
    },
    {
      name: 'googleplus',
      id: 'gp',
      path: './assets/img/icons/googleplus.png',
      alt: 'google plus link'
    },
    {
      name: 'linkedin',
      id: 'li',
      path: './assets/img/icons/linkedin.png',
      alt: 'linked in link'
    }];

    this.homesectionlinks = [{
      title: 'New Patients',
      route: 'patientinformation.introduction'
    },
    {
      title: 'Patient Registration',
      route: 'patientinformation.patientregistration'
    }
    ];
    this.patientinfosectionlinks = [
      {
        title: 'Introduction',
        route: 'patientinformation.introduction'
      },
      {
        title: 'Why Choose Our Practice',
        route: 'patientinformation.whychooseourpractice'
      },
      {
        title: 'Patient Registration',
        route: 'patientinformation.patientregistration'
      },
      {
        title: 'Payment and Insurance',
        route: 'patientinformation.paymentandinsurance'
      }
    ];
    this.aboutorthosectionlinks = [
      {
        title: 'Orthodontic Treatment',
        route: 'aboutorthodontics.orthodontictreatment'
      },
      {
        title: 'Children and Braces',
        route: 'aboutorthodontics.childrenandbraces'
      },
      {
        title: 'Adults and Braces',
        route: 'aboutorthodontics.adultsandbraces'
      }
    ];
    this.servicessectionlinks = [
      {
        title: 'Traditional Braces',
        route: 'services.braces'
      },
      {
        title: 'Clear Braces',
        route: 'services.clearbraces'
      },
      {
        title: 'Invisalign',
        route: 'services.invisalign'
      }
    ];


  });

angular.module('orthoApp')
  .directive('dbDrHomeDir', function() {

    return {
      restrict: 'AE',
      templateUrl: 'app/components/account/doctorDashboard/dbDrHome.html',
      controller: function() {
        
      }
    };

  });

angular.module('orthoApp')
  .directive('dbDrPatientDir', function() {

    return {
      restrict: 'AE',
      templateUrl: 'app/components/account/doctorDashboard/dbDrPatient.html'
    };
    
  });

angular.module('orthoApp')
  .directive('dbMainDir', function(accountService) {

    return {
      restrict: 'AE',
      templateUrl: 'app/components/account/patientdashboard/dbMainDir.html',
      // controller: 
      link: function($scope) {

        /*** Chart JS ***/
        accountService.getCurrentUser()
          .then(function(response) {
            var treatmentTime = response.data.ett;
            var daysLeft = treatmentTime;
            var daysPassed = 0;

            var ctx = $('#ett-graph');
            var ettChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ["Days Left", "Days Passed"],
                    datasets: [{
                        label: 'days',
                        data: [daysLeft, daysPassed],
                        backgroundColor: ['#98de25','#A8C9DE'],
                        borderWidth: '10px',
                        borderColor: ['#98de25','#A8C9DE']
                    }]
                },
                options: {
                    defaultFontColor: 'white',
                    cutoutPercentage: 60
                }
            });
            Chart.defaults.global.title.display = true;
            Chart.defaults.global.title.text = 'Test Text';
            Chart.defaults.global.title.fontColor = 'white';
            Chart.defaults.global.title.fontSize = 16;
            Chart.defaults.global.title.position = 'bottom';
            Chart.defaults.global.defaultFontColor = 'white';
            Chart.defaults.global.defaultFontFamily = 'sans-serif';
            Chart.defaults.global.defaultFontSize = 14;

            setTimeout(function() {
              var updateChart = setInterval(function() {
                if(daysPassed >= treatmentTime) {
                  clearInterval(updateChart);
                }
                else {
                  ettChart.data.datasets[0].data[0] -= 1;
                  daysLeft -= 1;
                  ettChart.data.datasets[0].data[1] += 1;
                  daysPassed += 1;
                  ettChart.update();
                }
              }, 200);
            }, 1000);
          });



      }
    };

  });

angular.module('orthoApp')
  .directive('dbPaymentDir', function() {

    return {
      restrict: 'AE',
      templateUrl: 'app/components/account/patientdashboard/dbPaymentDir.html',

    };

  });

angular.module('orthoApp')
  .directive('dbSettingsDir', function() {

    return {
      restrict: 'AE',
      templateUrl: 'app/components/account/patientdashboard/dbSettingsDir.html'
    };

  });

angular.module('orthoApp')
  .controller('homeCtrl', function($scope, mainService, $state) {


  });