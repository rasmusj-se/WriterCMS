var module = angular.module('writer.directives');

module.directive('imageLazyLoad', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
        var image = element[0];
        var index = scope.$eval(attrs.imageIndex);
        var src = attrs.imageLazyLoad;

        function isVisible(element) {
            var rect = image.getBoundingClientRect();
            return rect.top >= 0 && rect.left >= 0 &&
                rect.bottom <= $(window).height();
        }

        function lazyLoad() {
            if (isVisible(image)) {
                image.src = src;    
                document.removeEventListener('scroll', lazyLoad);
            }
        }

        if (!isVisible(image)) {
            document.addEventListener('scroll', lazyLoad);
        } else {
            if (index == 0) {
                image.src = src;
            } else {
                document.addEventListener('scroll', lazyLoad);
            }
        }

        // document.addEventListener('scroll', function() {
        //     if ((rect.top >= 0 && rect.left >= 0) && 
        //         (rect.bottom <= $(window).height()
        //          && rect.right <= $(window).height())) {
        //         if (!image.src) {
        //             console.log('set');
        //             image.src = src;
        //         }
        //     }
        // });
    }
  };
});