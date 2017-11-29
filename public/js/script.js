window.addEventListener('load',function(){
    var welcome = document.querySelector('.greet'),
        subtext = document.querySelector('.subTexts'),
        form    = document.querySelector('.sub'),
        container=document.querySelector('.social'),
        follow  = document.querySelector('.followUs'),
        social  = document.querySelectorAll('.socialIcon'),
        // Not using delayed animations anymore
        delay = 0; 
    
    
    setTimeout(function(){welcome.style.top='0';},delay);
    setTimeout(function(){subtext.style.bottom = '0%';},delay*2);
    setTimeout(function(){subtext.style.bottom = '-100%';},delay*4);
    setTimeout(function(){container.style.display = 'block';},delay*5);
    setTimeout(function(){form.style.opacity='1';},delay*5);
    setTimeout(function(){follow.style.bottom='0%';},delay*6);
    setTimeout(
      function(){
        social[0].style.marginTop='0px';
        //social[1].style.marginTop='0px';
        //social[2].style.marginTop='0px';
      },delay*7
    ); 
     
  });
    
  $(document).ready(function() {
    var email = $('.email')
    $('.button').click(function(){
      $.ajax({
        url: '/email/add',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({email: email.val()})
      })
    });
  });
  
  