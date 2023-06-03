document.addEventListener('DOMContentLoaded', function(){

  // Start Sidebar by the atual status
  if (localStorage.getItem('status') === 'closed'){
    document.querySelector('aside').classList.add('aside-close');
  }else{
    document.querySelector('aside').classList.add('aside-open');
  }
  
  // Change the status of the Sidebar
  document.getElementById('icon-more').onclick = function(){
    if (localStorage.getItem('status') === 'closed'){

      document.querySelector('aside').classList.remove('aside-close-animation');
      document.querySelector('aside').classList.add('aside-open-animation');
      document.querySelectorAll('.component-sidebar').forEach(function(component){
        component.classList.remove('component-close-animation');
        component.classList.add('component-open-animation');
      })

      document.querySelector('aside').classList.add('aside-open');
      document.querySelector('aside').classList.remove('aside-close');
      localStorage.setItem('status','opened');

    }else{
      document.querySelector('aside').classList.remove('aside-open-animation');
      document.querySelector('aside').classList.add('aside-close-animation');

      document.querySelectorAll('.component-sidebar').forEach(function(component){
        component.classList.add('component-close-animation');
        component.classList.remove('component-open-animation');
      })
      
      document.querySelector('aside').classList.add('aside-close');
      document.querySelector('aside').classList.remove('aside-open');
      localStorage.setItem('status','closed');
    }
  }

  // Hit Point
  if(document.getElementById('entry') !=undefined){
    document.getElementById('entry').onclick = function(e){
      hitPoint(type='E',text='Entry');
    }
  }
  if(document.getElementById('pause') !=undefined){
    document.getElementById('pause').onclick = function(e){
      hitPoint(type='P',text='Pause');
    }
  }
  if(document.getElementById('return') !=undefined){
    document.getElementById('return').onclick = function(e){
      hitPoint(type='R',text='Return');
    }
  }
  if(document.getElementById('exit') !=undefined){
    document.getElementById('exit').onclick = function(e){
      hitPoint(type='Q',text='Exit');
    }
  }

  // Registers
  if(document.getElementById('registers') !=undefined){
    document.getElementById('registers').onclick = function(e){
      document.querySelector('.point-page ').style.display = 'none';
      document.getElementById('registers-points').style.display = 'flex';
    }
  }
  
  // Close Registers
  if(document.getElementById('close-registers') !=undefined){
    document.getElementById('close-registers').onclick = function(e){
      document.getElementById('registers-points').style.display = 'none';
      document.querySelector('.point-page ').style.display = 'flex';
      
    }
  }

  

  document.querySelector('aside').dataset.status = localStorage.getItem('status');

});

function hitPoint(type, text){
  Swal.fire({
    title: 'Are you sure?',
    text: `You're about to hit the ${text} point`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, hit it!'
  }).then((result) => {
    if (result.isConfirmed) {
      fetch('', {
        method: 'POST',
        body: JSON.stringify({ type: type }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data =>{
        if (data.status == 'successful'){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your hited the point!',
            showConfirmButton: false,
            timer: 2000
          })
          let timer = setTimeout(function(){
            window.open('/','_self')
          }, 1500)
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.msg,
          })
        }
      })
      .catch(error => console.error(error))
    }
  })
  
}

window.addEventListener('load', () =>{
  document.querySelector('body').style.display = 'block';
});