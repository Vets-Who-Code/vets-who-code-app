var kindfulWidget = kindfulWidget || {};
kindfulWidget['donate'] = { id: 'donate' };
var childKindfulWindow;

function include(filename, onload) {
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.src = filename;
  script.type = 'text/javascript';
  script.onload = script.onreadystatechange = function() {
    if (script.readyState) {
      if (script.readyState === 'complete' || script.readyState === 'loaded') {
        script.onreadystatechange = null;
        onload();
      }
    } else {
      onload();
    }
  };
  head.appendChild(script);
}

window.onmessage = function(event) {
  if (event.data === 'kclosed') {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      )
    ) {
      childKindfulWindow.close();
      $('body').css({ position: 'relative', height: 'auto', overflow: 'auto' });
    } else {
      var donateframe = document.getElementById('kindful-iframe');
      donateframe.parentNode.removeChild(donateframe);
      $('body').css({
        position: 'relative',
        height: 'auto',
        overflow: 'auto',
        width: '100%',
      });
    }
  } else if (
    typeof event.data == 'string' &&
    event.data.substr(0, 10) == 'kredirect|'
  ) {
    var redirectUrl = event.data.replace('kredirect|', '');
    window.location = redirectUrl;
  }
};

include('https://vetswhocode.kindful.com//javascripts/jquery.js', function() {
  $.fn.xpathEvaluate = function(xpathExpression) {
    $this = this.first();
    xpathResult = this[0].evaluate(
      xpathExpression,
      this[0],
      null,
      XPathResult.ORDERED_NODE_ITERATOR_TYPE,
      null,
    );

    result = [];
    while ((elem = xpathResult.iterateNext())) {
      result.push(elem);
    }

    $result = jQuery([]).pushStack(result);
    return $result;
  };

  $(document).ready(function() {
    var lookupType = $('script[data-embed-id="donate"]').data('lookup-type');
    var lookupValue = $('script[data-embed-id="donate"]').data('lookup-value');
    var noStyles = $('script[data-embed-id="donate"]').data('styles-off');

    if (lookupType == 'xpath') {
      var xpathValues = lookupValue.split('  ');

      $.each(xpathValues, function(index, value) {
        var $xpathElement = $(document).xpathEvaluate(value);

        if (noStyles != 'true' && noStyles != true) {
          $xpathElement
            .attr('style', kindfulWidget['donate']['embedded_button_styles'])
            .text(kindfulWidget['donate']['button_text']);
        }

        $xpathElement.addClass('donate').css('cursor', 'pointer');

        $xpathElement.click(function(e) {
          e.preventDefault();
          executeiFrame();
        });
      });
    } else {
      $(lookupValue)
        .attr('href', '#!')
        .click(function(e) {
          e.preventDefault();
          executeiFrame();
        });

      if (noStyles != 'true' && noStyles != true) {
        $(lookupValue)
          .attr('style', kindfulWidget['donate']['embedded_button_styles'])
          .text(kindfulWidget['donate']['button_text']);
      }
      $(lookupValue)
        .css('cursor', 'pointer')
        .addClass('donate')
        .show();
    }

    function executeiFrame() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        )
      ) {
        childKindfulWindow = window.open(
          'https://vetswhocode.kindful.com/embeds/7298AEAEB01A4EC0873D658B88FD8431?p=https%3A',
        );
      } else {
        var additionalParams = '';

        if (window.location.protocol != 'https:') {
          additionalParams = '&ref=' + window.location.href;
        }

        $('body')
          .css('height', '100%')
          .append(
            '<iframe src="https://vetswhocode.kindful.com/embeds/7298AEAEB01A4EC0873D658B88FD8431?p=' +
              window.location.protocol +
              additionalParams +
              '" scrolling="no" id="kindful-iframe" style="z-index: 99999; overflow: hidden; margin: 0px; padding: 0px; width: 100%; height: 100%; position: fixed; top: 0; left: 0; display:none; border:none;"></iframe>',
          );
        $('#kindful-iframe').fadeIn(1200);

        $('body').css({
          position: 'absolute',
          overflow: 'hidden',
          width: '100%',
        });
      }
      return false;
    }
  });
});
