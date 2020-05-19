$(document).ready(function(){

	// 1. init scrollmagic
    var controller = new ScrollMagic.Controller();

    // 2. build scene
    var ourScene = new ScrollMagic.Scene({
        triggerElement: '#project01'
    })
        .setClassToggle('#project01', 'fade-in') // add class to project01
        .addIndicators({
            name: 'fade scene',
            colorTrigger: 'black',
            indent: 200,
            colorStart: 'lightgreen'
        }) // requires debug.addIndicators.min.js plugin
        .addTo(controller);

});


















