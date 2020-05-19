$(document).ready(function(){

	// 1. init scrollmagic
    var controller = new ScrollMagic.Controller();

    // 2. build scene
    var ourScene = new ScrollMagic.Scene({
        triggerElement: '#project01 img',
        // duration: 300, // 300 pixels
        duration: '90%', // responsive, 100% of view port height
        triggerHook: 0.9
    })
        .setClassToggle('#project01', 'fade-in') // add class to project01
        .addIndicators({
            name: 'fade scene',
            colorTrigger: 'black',
            // indent: 200,
            colorStart: 'lightgreen',
            colorEnd: 'pink'
        }) // requires debug.addIndicators.min.js plugin
        .addTo(controller);

});


















