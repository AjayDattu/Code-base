let imageZoom = document.getElementById('zoom');
console.log(imageZoom)
imageZoom.addEventListener('mousemove',(event)=>{
 imageZoom.style.setProperty('--display','block')
 let points = {
    x: (event.offsetX * 100) / imageZoom.offsetWidth,
    y: (event.offsetY * 100) / imageZoom.offsetHeight
 }
 console.log(points)
 imageZoom.style.setProperty('--x',points.x + '%');
 imageZoom.style.setProperty('--y',points.y + '%');
})

imageZoom.addEventListener('mouseout',()=>{
    imageZoom.style.setProperty('--display','none');
})