document.addEventListener('DOMContentLoaded', function() {

  var bioElements = document.getElementsByClassName('employee-about'),
      alumnusElements = document.getElementsByClassName('employee-info'),
      openBioElements = document.getElementsByClassName('open-about');

  setAriaBioTrue();

  for(var i= 0; i < openBioElements.length; i++) {
    openBioElements[i].removeAttribute('tabIndex');
  }

  for(var i = 0; i < openBioElements.length; i++) {
    openBioElements[i].addEventListener('click', function(e) {
      var thiseElement = e.target.parentNode,
          bioHeight = thiseElement.parentNode.getElementsByClassName('employee-about')[0].clientHeight;

      e.preventDefault();
      if(thiseElement.parentNode.classList.contains('is-active')) {
        var activeElement = thiseElement.parentNode;
        activeElement.removeAttribute('style');
        activeElement.classList.remove('is-active')
        setAriaBioTrue();
      } else {
        for(var i = 0; i < alumnusElements.length; i++) {
          if(alumnusElements[i].classList.contains('is-active')) {
            alumnusElements[i].removeAttribute('style');
            alumnusElements[i].classList.remove('is-active');
            setAriaBioTrue();
          }
      }

        var addActive = thiseElement.parentNode;
        addActive.classList.add('is-active');
        addActive.style.marginBottom = (bioHeight+73) + 'px';

        addActive.getElementsByClassName('employee-about')[0].setAttribute('aria-hidden', 'false');
      }
    });
  }

  window.addEventListener('resize', function() {

    for(var i = 0; i < alumnusElements.length; i++) {
      if(alumnusElements[i].classList.contains('is-active')) {
       var newBioHeight = alumnusElements[i].getElementsByClassName('employee-about')[0].clientHeight;

       alumnusElements[i].style.marginBottom = (newBioHeight+74) + 'px';
      }
    }
  });

  var closeBioElements = document.getElementsByClassName('close-about');
  for(var i = 0; i < closeBioElements.length; i++) {
    closeBioElements[i].addEventListener('click', function(e) {
      e.preventDefault();

      var thiseElement = e.target.parentNode;
      thiseElement.parentNode.removeAttribute('style');
      thiseElement.parentNode.classList.remove('is-active');
      setAriaBioTrue();
    });
  }

  document.addEventListener('keyup', function(e) {
    if(e.keyCode == 27) {
      for(var i = 0; i < alumnusElements.length; i++) {
        if(alumnusElements[i].classList.contains('is-active')) {
          alumnusElements[i].removeAttribute('style');
          alumnusElements[i].classList.remove('is-active');
          setAriaBioTrue();
        }
      }
  }});

  function setAriaBioTrue() {
    for(var i = 0; i < bioElements.length; i++) {
      bioElements[i].setAttribute('aria-hidden', 'true');
    }
  }
});
