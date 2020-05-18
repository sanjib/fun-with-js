// to
var tl1 = gsap.timeline();

tl1.to('#demo1 .logo', {
    duration: 3,
    x: 250,
    backgroundColor: 'purple',
    borderRadius: '20%',
    border: '5px solid white',
    // ease: 'back'
    // ease: 'elastic'
    ease: 'bounce'
});

// rotation
var tl2 = gsap.timeline();

tl2.set('#demo2 .logo, .astronaut', {
    transformOrigin: '50% 50%'
});

tl2.to('#demo2 .logo, .astronaut', {
    duration: 8,
    rotation: 360
})

var myObject = {rotation: 0}

tl2.to(myObject, {
    duration: 1,
    rotation: 360,
    onUpdate: function () {
        console.log(myObject.rotation);
    }
})

// from
var tl3 = gsap.timeline({
    repeat: 1,
    yoyo: true
});

tl3.from('#demo3 .logo', {
    duration: 1,
    opacity: 0,
    scale: 0.3,
    ease: 'back'
});

tl3.from('.circle', {
    duration: 1,
    opacity: 0,
    // delay: 1.5,
    // y: 150,
    // y: () => Math.random() * 400 - 200,
    y: 'random(-200, 200)',
    stagger: 0.25
});

