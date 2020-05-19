$(document).ready(function(){

	// 1. init scrollmagic
    var controller = new ScrollMagic.Controller();

    // // 2. build scene
    // var ourScene = new ScrollMagic.Scene({
    //     triggerElement: '#project01 img',
    //     // duration: 300, // 300 pixels
    //     // duration: '90%', // responsive, 100% of view port height
    //     triggerHook: 0.9,
    //     // reverse: false
    // })
    //     .setClassToggle('#project01', 'fade-in') // add class to project01
    //     .addIndicators({
    //         name: 'fade scene',
    //         colorTrigger: 'black',
    //         // indent: 200,
    //         colorStart: 'lightgreen',
    //         colorEnd: 'pink'
    //     }) // requires debug.addIndicators.min.js plugin
    //     .addTo(controller);

    // loop through each .project element
    $('.project').each(function () {
        // 2. build scene
        var ourScene = new ScrollMagic.Scene({
            triggerElement: this.children[0],
            // duration: 300, // 300 pixels
            // duration: '90%', // responsive, 100% of view port height
            triggerHook: 0.9,
            // reverse: false
        })
            .setClassToggle(this, 'fade-in') // add class to project01
            .addIndicators({
                name: 'fade scene',
                colorTrigger: 'black',
                // indent: 200,
                colorStart: 'lightgreen',
                colorEnd: 'pink'
            }) // requires debug.addIndicators.min.js plugin
            .addTo(controller);
    });

});


















